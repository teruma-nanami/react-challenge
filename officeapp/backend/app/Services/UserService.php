<?php

namespace App\Services;

use App\Models\User;

class UserService
{
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
