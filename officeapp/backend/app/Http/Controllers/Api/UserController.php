<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\UpdateUserRequest;
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
     * 自分のプロフィール取得
     */
    public function me(Request $request): JsonResponse
    {
        // ApiController に集約済み
        $user = $this->currentUser($request);

        return $this->ok($user);
    }

    /**
     * PUT /api/profile
     * 自分のプロフィール更新
     */
    public function update(UpdateUserRequest $request): JsonResponse
    {
        // ApiController に集約済み
        $user = $this->currentUser($request);

        $updated = $this->userService->update(
            $user,
            $request->validated()
        );

        return $this->ok($updated);
    }
}
