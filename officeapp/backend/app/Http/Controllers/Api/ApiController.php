<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Models\User;
use App\Services\AuthService;

class ApiController extends Controller
{
    /**
     * Authorization: Bearer <JWT> を検証して Auth0 の sub を取得
     */
    protected function auth0UserId(Request $request): string
    {
        $authService = app(AuthService::class);

        $token = $authService->getBearerToken($request);
        $decoded = $authService->verifyAccessToken($token);

        return $decoded->sub;
    }

    /**
     * ログイン中ユーザーを取得する（存在しなければ 401）
     */
    protected function currentUser(Request $request): User
    {
        $auth0UserId = $this->auth0UserId($request);

        $user = User::where('auth0_user_id', $auth0UserId)->first();

        if (!$user) {
            abort(401, 'Unauthenticated');
        }

        return $user;
    }

    protected function currentUserId(Request $request): int
    {
        return $this->currentUser($request)->id;
    }

    protected function ok(mixed $data = null, string $message = 'OK'): JsonResponse
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
        ]);
    }

    protected function created(mixed $data = null, string $message = 'Created'): JsonResponse
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
        ], 201);
    }

    protected function deletedResponse(): Response
    {
        return response()->noContent();
    }
}
