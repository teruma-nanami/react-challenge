<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    /**
     * Auth0の user sub(auth0_user_id) からユーザーを取得
     */
    public function findByAuth0UserId(string $auth0UserId): User
    {
        return User::where('auth0_user_id', $auth0UserId)->firstOrFail();
    }
}
