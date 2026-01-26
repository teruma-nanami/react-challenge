<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['auth0_user_id' => 'auth0|admin-user'],
            [
                'email' => 'admin@example.com',
                'display_name' => 'Admin User',
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['auth0_user_id' => 'auth0|staff-user'],
            [
                'email' => 'staff@example.com',
                'display_name' => 'Staff User',
                'role' => 'staff',
            ]
        );
    }
}