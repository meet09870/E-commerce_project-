<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    */

    // Paths that should allow CORS requests
    'paths' => ['api/*'],

    // HTTP methods allowed for CORS
    'allowed_methods' => ['*'], // Allows GET, POST, PUT, DELETE, OPTIONS, etc.

    // Origins allowed to make requests
    'allowed_origins' => [
        'http://localhost:5173', // Your React dev server
        'http://localhost:3000', // Optional: other React port
    ],

    // Patterns for allowed origins (leave empty if not needed)
    'allowed_origins_patterns' => [],

    // Allowed headers in the request
    'allowed_headers' => ['*'], // Accept all headers

    // Headers exposed to the browser
    'exposed_headers' => [],

    // How long (in seconds) the results of a preflight request can be cached
    'max_age' => 0,

    // Whether cookies and credentials are supported
    'supports_credentials' => true,
];
