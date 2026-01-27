<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends ApiController
{
    public function __construct(
        private UserService $userService
    ) {}

    /**
     * GET /api/profile
     * 自分のプロフィールを返す（暫定：X-Auth0-User-Id でユーザー特定）
     */
    public function me(Request $request): JsonResponse
    {
        $auth0UserId = $request->header('X-Auth0-User-Id');

        if (!$auth0UserId) {
            return $this->badRequest('Auth0 user id が見つかりません。');
        }

        $user = $this->userService->findByAuth0UserId($auth0UserId);

        return $this->ok($user);
    }
}
