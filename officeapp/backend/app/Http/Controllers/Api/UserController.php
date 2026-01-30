<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends ApiController
{
    public function __construct(
        private UserService $userService,
        private AuthService $authService,
    ) {}

    /**
     * POST /api/auth/create
     * 初回ログイン時に呼ばれる：存在しなければ User を作成
     */
    public function create(Request $request): JsonResponse
    {
        $token = $this->authService->getBearerToken($request);
        $decoded = $this->authService->verifyAccessToken($token);

        $userInfo = $this->authService->fetchUserInfo($token);

        $user = $this->userService->findOrCreateFromAuth0UserInfo(
            $decoded->sub,
            $userInfo
        );

        return $this->ok($user);
    }

    /**
     * GET /api/profile
     */
    public function me(Request $request): JsonResponse
    {
        $user = $this->currentUser($request);
        return $this->ok($user);
    }

    /**
     * PUT /api/profile
     */
    public function update(Request $request): JsonResponse
    {
        $user = $this->currentUser($request);

        $updated = $this->userService->update(
            $user,
            $request->all()
        );

        return $this->ok($updated);
    }
}
