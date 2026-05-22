<?php
/**
 * Plugin Name: Motherly Dev REST Preview
 * Description: Lets the Next.js development site read draft + published posts using a shared secret key (no WordPress login in Next.js).
 * Version: 1.0.0
 *
 * Install: copy this file to wp-content/mu-plugins/motherly-preview-rest.php
 * Set MOTHERLY_PREVIEW_KEY below to match WORDPRESS_PREVIEW_KEY in Next.js .env.local
 */

if (!defined('ABSPATH')) {
    exit;
}

/** Must match WORDPRESS_PREVIEW_KEY in Motherly/.env.local */
define('MOTHERLY_PREVIEW_KEY', 'change-me-to-a-long-random-secret');

/**
 * When the preview key is valid, act as an editor for this REST request only
 * so draft posts are included in /wp/v2/posts responses.
 */
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
