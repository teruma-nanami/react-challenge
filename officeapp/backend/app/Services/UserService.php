<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    /**
     * Auth0 userinfo から User を取得 or 作成
     */
    public function findOrCreateFromAuth0UserInfo(string $auth0UserId, array $userInfo): User
    {
        $email = $userInfo['email'] ?? null;
        $name  = $userInfo['name'] ?? null;

        if (!$email) {
            abort(401, 'Email not provided by token');
        }

        return User::firstOrCreate(
            ['auth0_user_id' => $auth0UserId],
            [
                'email'        => $email,
                'display_name' => $name,
                // role は DB default(admin)
            ]
        );
    }

    /**
     * プロフィール更新（自分自身）
     */
    public function update(User $user, array $data): User
    {
        $user->update([
            'display_name' => $data['display_name'] ?? $user->display_name,
            'email'        => $data['email'] ?? $user->email,
            'role'         => $data['role'] ?? $user->role,
        ]);

        return $user->refresh();
    }
}
