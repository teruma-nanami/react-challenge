<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use App\Services\UserService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(UserService $userService): void
    {
        // ユーザーがログイン済みなら毎回チェック
        if (Auth::check()) {
            $userService->ensureLedgerExists(Auth::user());
        }
    }
}