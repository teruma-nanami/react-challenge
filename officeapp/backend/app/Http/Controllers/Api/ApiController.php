<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use App\Models\User;


use Firebase\JWT\JWT;
use Firebase\JWT\JWK;

class ApiController extends Controller
{
    /**
     * Authorization: Bearer <JWT> を検証して Auth0 の sub を取得
     */
    protected function auth0UserId(Request $request): string
    {
        $authorization = $request->header('Authorization');

        if (!$authorization || !str_starts_with($authorization, 'Bearer ')) {
            abort(401, 'Authentication token is missing');
        }

        $token = substr($authorization, 7);

        try {
            // Auth0 設定
            $issuer   = 'https://dev-ir7ur0o4kc8jonw3.us.auth0.com/';
            $audience = 'http://localhost:8080';

            // JWKS 取得
            $jwksJson = @file_get_contents($issuer . '.well-known/jwks.json');
            if ($jwksJson === false) {
                abort(401, 'Failed to fetch JWKS');
            }

            $jwks = json_decode($jwksJson, true);
            if (!is_array($jwks) || !isset($jwks['keys']) || !is_array($jwks['keys'])) {
                abort(401, 'Invalid JWKS');
            }

            // kid / alg を見て公開鍵セットを作る（複数鍵にも対応）
            $keySet = JWK::parseKeySet($jwks);

            // 署名・exp 等の検証（alg はトークンheaderに従って検証される）
            $decoded = JWT::decode($token, $keySet);

            // iss 検証
            if (($decoded->iss ?? null) !== $issuer) {
                abort(401, 'Invalid token issuer');
            }

            // aud 検証（string / array 両対応）
            $aud = $decoded->aud ?? null;
            if (is_array($aud)) {
                if (!in_array($audience, $aud, true)) {
                    abort(401, 'Invalid token audience');
                }
            } else {
                if ($aud !== $audience) {
                    abort(401, 'Invalid token audience');
                }
            }

            // sub 必須
            if (empty($decoded->sub)) {
                abort(401, 'Invalid token subject');
            }

            return $decoded->sub;
        } catch (\Throwable $e) {
            abort(401, 'Invalid token');
        }
    }

    /**
     * ログイン中ユーザー
     */
    protected function currentUser(Request $request): User
    {

        Log::debug('currentUser CALLED');
        // auth0UserId() の中で JWT 検証はすでに完了している
        $auth0UserId = $this->auth0UserId($request);

        /**
         * auth0UserId() で decode 済み payload を
         * Request attribute に積んでおく想定
         *
         * （※ auth0UserId 側を少しだけ拡張する）
         */
        $payload = $request->attributes->get('auth0_payload');

        if (!is_array($payload)) {
            abort(401, 'Invalid token payload');
        }

        $email = $payload['email'] ?? null;
        $displayName = $payload['name'] ?? null;

        if (!$email) {
            abort(401, 'Email not provided by token');
        }

        // User を「取得 or 作成」
        return User::updateOrCreate(
            ['auth0_user_id' => $auth0UserId],
            [
                'email' => $email,
                'display_name' => $displayName,
                // role は DB default(admin) に任せる
            ]
        );
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
