<?php

return [
    // 末尾スラッシュ無しでOK（内部で整形）
    'issuer' => env('AUTH0_ISSUER', 'https://dev-ir7ur0o4kc8jonw3.us.auth0.com/'),

    // あなたの API Identifier（audience）
    'audience' => env('AUTH0_AUDIENCE', 'http://localhost:8080'),
];
