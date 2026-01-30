<?php

namespace App\Http\Controllers\Api;

use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends ApiController
{
    public function __construct(
        private UserService $userService
    ) {}

    /**
     * POST /api/auth/create
     * 初回ログイン時に呼ばれる想定。
     * Token を検証し、userinfo から User を作成（既にあれば取得）
     */
    public function create(Request $request): JsonResponse
    {
        $user = $this->currentUser($request);
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
