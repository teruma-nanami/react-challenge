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
        $auth0UserId = $this->auth0UserId($request);

        $user = $this->userService->findByAuth0UserId($auth0UserId);

        return $this->ok($user);
    }

    /**
     * PUT /api/profile
     * 自分のプロフィール更新
     */
    public function update(
        UpdateUserRequest $request
    ): JsonResponse {
        $auth0UserId = $this->auth0UserId($request);

        $user = $this->userService->updateByAuth0UserId(
            $auth0UserId,
            $request->validated()
        );

        return $this->ok($user);
    }
}
