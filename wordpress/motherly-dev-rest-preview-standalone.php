<?php
/**
 * Plugin Name: Motherly Dev REST Preview
 * Description: Lets the Next.js dev site (localhost) load draft + published posts via a shared secret.
 * Version: 1.0.0
 * Author: Motherly
 *
 * MU-PLUGIN INSTALL (if Upload Plugin fails):
 * Hostinger File Manager → wp-content/mu-plugins/
 * Upload THIS file as: motherly-dev-rest-preview.php
 * (mu-plugins load automatically — no Activate button needed)
 */

if (!defined('ABSPATH')) {
    exit;
}

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

/**
 * Expose Rank Math SEO to Next.js (meta title, description, focus keywords).
 */
/**
 * Elementor drafts often have empty post_content; expose rendered HTML for Next.js.
 */
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

register_rest_field(
    'post',
    'rank_math_seo',
    array(
        'get_callback' => function ($post_arr) {
            $id = (int) $post_arr['id'];
            return array(
                'title'       => (string) get_post_meta($id, 'rank_math_title', true),
                'description' => (string) get_post_meta($id, 'rank_math_description', true),
                'keywords'    => (string) get_post_meta($id, 'rank_math_focus_keyword', true),
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
