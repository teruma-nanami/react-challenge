<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Firebase\JWT\JWT;
use Firebase\JWT\JWK;

class AuthService
{
    private string $issuer;
    private string $audience;

    public function __construct()
    {
        // まずは直書き（あとで config/services.php や env に逃がす）
        $this->issuer   = 'https://dev-ir7ur0o4kc8jonw3.us.auth0.com/';
        $this->audience = 'http://localhost:8080';
    }

    public function getBearerToken(Request $request): string
    {
        $authorization = $request->header('Authorization');

        if (!$authorization || !str_starts_with($authorization, 'Bearer ')) {
            abort(401, 'Authentication token is missing');
        }

        return substr($authorization, 7);
    }

    /**
     * Access Token(JWT) を検証して decoded を返す
     */
    public function verifyAccessToken(string $token): object
    {
        // JWKS 取得
        $jwksJson = @file_get_contents($this->issuer . '.well-known/jwks.json');
        if ($jwksJson === false) {
            abort(401, 'Failed to fetch JWKS');
        }

        $jwks = json_decode($jwksJson, true);
        if (!is_array($jwks) || !isset($jwks['keys']) || !is_array($jwks['keys'])) {
            abort(401, 'Invalid JWKS');
        }

        $keySet = JWK::parseKeySet($jwks);

        try {
            $decoded = JWT::decode($token, $keySet);
        } catch (\Throwable $e) {
            abort(401, 'Invalid token');
        }

        // iss 検証
        if (($decoded->iss ?? null) !== $this->issuer) {
            abort(401, 'Invalid token issuer');
        }

        // aud 検証（string / array 両対応）
        $aud = $decoded->aud ?? null;
        if (is_array($aud)) {
            if (!in_array($this->audience, $aud, true)) {
                abort(401, 'Invalid token audience');
            }
        } else {
            if ($aud !== $this->audience) {
                abort(401, 'Invalid token audience');
            }
        }

        // sub 必須
        if (empty($decoded->sub)) {
            abort(401, 'Invalid token subject');
        }

        return $decoded;
    }

    /**
     * Auth0 /userinfo から email/name を取る（Access Tokenにemailが入らない問題の対策）
     */
    public function fetchUserInfo(string $accessToken): array
    {
        $res = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken,
            'Accept'        => 'application/json',
        ])->get($this->issuer . 'userinfo');

        if (!$res->ok()) {
            abort(401, 'Failed to fetch userinfo');
        }

        $json = $res->json();
        if (!is_array($json)) {
            abort(401, 'Invalid userinfo response');
        }

        return $json;
    }
}
