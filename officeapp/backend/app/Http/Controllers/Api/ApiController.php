<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\User;

class ApiController extends Controller
{
    /**
     * Authorization: Bearer xxx から Auth0 の sub を取得する
     * ※ まだ JWT 検証はしない（decodeのみ）
     */
    protected function auth0UserId(Request $request): string
    {
        $authorization = $request->header('Authorization');

        if (!$authorization || !str_starts_with($authorization, 'Bearer ')) {
            abort(401, 'Unauthenticated');
        }

        $token = substr($authorization, 7);

        // JWT を分解（header.payload.signature）
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            abort(401, 'Invalid token');
        }

        // payload を decode
        $payload = json_decode(base64_decode(strtr($parts[1], '-_', '+/')), true);

        if (!is_array($payload) || empty($payload['sub'])) {
            abort(401, 'Invalid token payload');
        }

        return $payload['sub'];
    }

    /**
     * ログイン中ユーザーを取得する
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
        return response()->noContent(); // 204
    }

    protected function badRequest(string $message): JsonResponse
    {
        return response()->json([
            'message' => $message,
        ], 400);
    }
}
