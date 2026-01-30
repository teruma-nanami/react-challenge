<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApiController extends Controller
{
    /**
     * Authorization: Bearer <JWT> を検証して Auth0 の sub を取得
     * さらに /userinfo から email/name も取得して Request attributes に積む
     */
    protected function auth0UserId(Request $request): string
    {
        $authorization = $request->header('Authorization');

        if (!$authorization || !str_starts_with($authorization, 'Bearer ')) {
            abort(401, 'Authentication token is missing');
        }

        $token = substr($authorization, 7);

        try {
            /** @var AuthService $authService */
            $authService = app(AuthService::class);

            $result = $authService->authenticateAccessToken($token);

            $request->attributes->set('auth0_user_id', $result['sub']);
            $request->attributes->set('auth0_userinfo', $result['userinfo']);

            return $result['sub'];
        } catch (\Throwable $e) {
            abort(401, 'Invalid token');
        }
    }

    /**
     * ログイン中ユーザーを取得（なければ作成）
     */
    protected function currentUser(Request $request): User
    {
        $auth0UserId = $this->auth0UserId($request);

        $userinfo = $request->attributes->get('auth0_userinfo');
        if (!is_array($userinfo)) {
            abort(401, 'Invalid authentication payload');
        }

        /** @var UserService $userService */
        $userService = app(UserService::class);

        return $userService->findOrCreateFromAuth0Payload($auth0UserId, $userinfo);
    }

    /**
     * ログイン中ユーザーの id だけ欲しい場合
     */
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
