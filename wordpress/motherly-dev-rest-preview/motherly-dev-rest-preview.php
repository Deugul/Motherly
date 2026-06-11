<?php
/**
 * Plugin Name: Motherly Dev REST Preview
 * Plugin URI: https://mothrly.com
 * Description: Lets the Next.js dev site (localhost) load draft + published posts via a shared secret — no WordPress password in Next.js.
 * Version: 1.0.0
 * Author: Motherly
 * Requires at least: 5.8
 * Requires PHP: 7.4
 *
 * Install: WordPress → Plugins → Add New → Upload Plugin → choose motherly-dev-rest-preview.zip → Activate
 * Then edit MOTHERLY_PREVIEW_KEY below (Plugins → Plugin File Editor) to match Motherly/.env.local
 */

if (!defined('ABSPATH')) {
    exit;
}

/** Must match WORDPRESS_PREVIEW_KEY in Motherly/.env.local */
define('MOTHERLY_PREVIEW_KEY', 'motherly-dev-preview-change-this-to-a-long-random-string');

add_filter('determine_current_user', function ($user_id) {
    if (!motherly_preview_key_is_valid()) {
        return $user_id;
    }

    $users = get_users(
        array(
            'role__in' => array('administrator', 'editor', 'author'),
            'number'   => 1,
            'orderby'  => 'ID',
            'order'    => 'ASC',
        )
    );

    if (!empty($users[0]->ID)) {
        return (int) $users[0]->ID;
    }

    return $user_id;
}, 20);

/**
 * @param WP_REST_Request|null $request
 */
function motherly_preview_key_is_valid($request = null): bool
{
    if (!defined('MOTHERLY_PREVIEW_KEY') || MOTHERLY_PREVIEW_KEY === 'change-me-to-a-long-random-secret') {
        return false;
    }

    if ($request instanceof WP_REST_Request) {
        $key = $request->get_param('motherly_preview_key');
    } else {
        $key = isset($_GET['motherly_preview_key']) ? wp_unslash($_GET['motherly_preview_key']) : '';
    }

    return is_string($key) && $key !== '' && hash_equals(MOTHERLY_PREVIEW_KEY, $key);
}

add_filter('rest_post_query', function ($args, $request) {
    if (!motherly_preview_key_is_valid($request)) {
        return $args;
    }

    $args['post_status'] = array('publish', 'draft');

    return $args;
}, 10, 2);

function motherly_get_post_html_for_rest(int $post_id): string
{
    $post = get_post($post_id);
    if (!$post instanceof WP_Post) {
        return '';
    }

    $raw = trim((string) $post->post_content);
    if ($raw !== '') {
        return (string) apply_filters('the_content', $raw);
    }

    if (class_exists('\Elementor\Plugin')) {
        $plugin = \Elementor\Plugin::$instance;
        if ($plugin && isset($plugin->frontend)) {
            $html = (string) $plugin->frontend->get_builder_content_for_display($post_id);
            if (trim($html) !== '') {
                return $html;
            }
        }
    }

    $elementor_raw = get_post_meta($post_id, '_elementor_data', true);
    if (!is_string($elementor_raw) || $elementor_raw === '') {
        return '';
    }

    $tree = json_decode($elementor_raw, true);
    if (!is_array($tree)) {
        return '';
    }

    $html_parts = array();
    $walk = function ($nodes) use (&$walk, &$html_parts) {
        foreach ($nodes as $node) {
            if (!is_array($node)) {
                continue;
            }
            if (isset($node['settings']['editor']) && is_string($node['settings']['editor'])) {
                $html_parts[] = $node['settings']['editor'];
            }
            if (!empty($node['elements']) && is_array($node['elements'])) {
                $walk($node['elements']);
            }
        }
    };
    $walk($tree);

    return implode("\n", $html_parts);
}

register_rest_field(
    'post',
    'motherly_featured_image_url',
    array(
        'get_callback' => function ($post_arr) {
            $id = (int) $post_arr['id'];
            $url = get_the_post_thumbnail_url($id, 'full');
            return is_string($url) && $url !== '' ? $url : '';
        },
        'schema' => array(
            'type'    => 'string',
            'context' => array('view', 'edit'),
        ),
    )
);

register_rest_field(
    'post',
    'motherly_content_html',
    array(
        'get_callback' => function ($post_arr) {
            return motherly_get_post_html_for_rest((int) $post_arr['id']);
        },
        'schema' => array(
            'type'    => 'string',
            'context' => array('view', 'edit'),
        ),
    )
);

/**
 * Meta keywords for Next.js: WordPress post tags first, then Rank Math focus keyword(s).
 */
function motherly_rest_seo_keywords(int $post_id): string
{
    $parts = array();

    $tags = wp_get_post_tags($post_id, array('fields' => 'names'));
    if (is_array($tags)) {
        foreach ($tags as $name) {
            $name = trim((string) $name);
            if ($name !== '') {
                $parts[] = $name;
            }
        }
    }

    if (empty($parts)) {
        $focus = trim((string) get_post_meta($post_id, 'rank_math_focus_keyword', true));
        if ($focus !== '') {
            foreach (preg_split('/[,;]/', $focus) as $kw) {
                $kw = trim($kw);
                if ($kw !== '') {
                    $parts[] = $kw;
                }
            }
        }
    }

    return implode(', ', array_unique($parts));
}

register_rest_field(
    'post',
    'rank_math_seo',
    array(
        'get_callback' => function ($post_arr) {
            $id = (int) $post_arr['id'];
            return array(
                'title'       => (string) get_post_meta($id, 'rank_math_title', true),
                'description' => (string) get_post_meta($id, 'rank_math_description', true),
                'keywords'    => motherly_rest_seo_keywords($id),
            );
        },
        'schema' => array(
            'type'       => 'object',
            'properties' => array(
                'title'       => array('type' => 'string'),
                'description' => array('type' => 'string'),
                'keywords'    => array('type' => 'string'),
            ),
            'context'    => array('view', 'edit'),
        ),
    )
);

add_action('admin_notices', function () {
    if (!current_user_can('manage_options')) {
        return;
    }
    if (motherly_preview_key_is_valid() || MOTHERLY_PREVIEW_KEY !== 'change-me-to-a-long-random-secret') {
        return;
    }
    echo '<div class="notice notice-warning"><p><strong>Motherly Dev REST Preview:</strong> Set <code>MOTHERLY_PREVIEW_KEY</code> in the plugin file to match <code>WORDPRESS_PREVIEW_KEY</code> in Next.js <code>.env.local</code>.</p></div>';
});
