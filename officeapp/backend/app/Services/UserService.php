<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    /**
     * Auth0 の user.sub (auth0_user_id) からユーザーを取得
     */
    public function findByAuth0UserId(string $auth0UserId): User
    {
        return User::where('auth0_user_id', $auth0UserId)->firstOrFail();
    }

    /**
     * プロフィール更新（自分自身）
     */
    public function updateByAuth0UserId(string $auth0UserId, array $data): User
    {
        $user = $this->findByAuth0UserId($auth0UserId);

        $user->update([
            'display_name' => $data['display_name'] ?? $user->display_name,
            'email'        => $data['email'] ?? $user->email,
            'role'         => $data['role'] ?? $user->role,
        ]);

        return $user;
    }
}
