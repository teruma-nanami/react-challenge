<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Firebase\JWT\JWT;
use Firebase\JWT\JWK;

class Auth0Authenticate
{
    /**
     * Auth0 Access Token を検証して、Request attributes に以下を積む
     * - auth0_user_id (sub)
     * - auth0_payload (array)
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authorization = $request->header('Authorization');

        if (!$authorization || !str_starts_with($authorization, 'Bearer ')) {
            return response()->json([
                'message' => 'Authentication token is missing',
            ], 401);
        }

        $token = substr($authorization, 7);

        try {
            // Auth0 設定（env があればそれを優先）
            $issuer = env('AUTH0_ISSUER', 'https://dev-ir7ur0o4kc8jonw3.us.auth0.com/');
            $issuer = rtrim($issuer, '/') . '/';

            $audience = env('AUTH0_AUDIENCE', 'http://localhost:8080');

            // JWKS 取得
            $jwksJson = @file_get_contents($issuer . '.well-known/jwks.json');
            if ($jwksJson === false) {
                return response()->json([
                    'message' => 'Failed to fetch JWKS',
                ], 401);
            }

            $jwks = json_decode($jwksJson, true);
            if (!is_array($jwks) || !isset($jwks['keys']) || !is_array($jwks['keys'])) {
                return response()->json([
                    'message' => 'Invalid JWKS',
                ], 401);
            }

            // 署名検証用 KeySet（kid 複数対応）
            $keySet = JWK::parseKeySet($jwks);

            // JWT 検証（署名・exp など）
            $decoded = JWT::decode($token, $keySet);

            // iss 検証
            if (($decoded->iss ?? null) !== $issuer) {
                return response()->json([
                    'message' => 'Invalid token issuer',
                ], 401);
            }

            // aud 検証（string / array 両対応）
            $aud = $decoded->aud ?? null;
            if (is_array($aud)) {
                if (!in_array($audience, $aud, true)) {
                    return response()->json([
                        'message' => 'Invalid token audience',
                    ], 401);
                }
            } else {
                if ($aud !== $audience) {
                    return response()->json([
                        'message' => 'Invalid token audience',
                    ], 401);
                }
            }

            // sub 必須
            $sub = $decoded->sub ?? null;
            if (!$sub) {
                return response()->json([
                    'message' => 'Invalid token subject',
                ], 401);
            }

            // payload（email/name 等）を array として取り出す
            $parts = explode('.', $token);
            if (count($parts) !== 3) {
                return response()->json([
                    'message' => 'Invalid token',
                ], 401);
            }

            $payload = json_decode(base64_decode(strtr($parts[1], '-_', '+/')), true);
            if (!is_array($payload)) {
                return response()->json([
                    'message' => 'Invalid token payload',
                ], 401);
            }

            // request に積む
            $request->attributes->set('auth0_user_id', $sub);
            $request->attributes->set('auth0_payload', $payload);

            return $next($request);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Invalid token',
            ], 401);
        }
    }
}
