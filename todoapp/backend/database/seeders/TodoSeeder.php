<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Todo;

class TodoSeeder extends Seeder
{
    public function run(): void
    {
        $auth0UserId = 'auth0|test-user';

        Todo::create([
            'auth0_user_id' => $auth0UserId,
            'title' => 'First Todo',
            'is_completed' => false,
        ]);

        Todo::create([
            'auth0_user_id' => $auth0UserId,
            'title' => 'Second Todo',
            'is_completed' => true,
        ]);

        Todo::create([
            'auth0_user_id' => $auth0UserId,
            'title' => 'Third Todo',
            'is_completed' => false,
        ]);
    }
}