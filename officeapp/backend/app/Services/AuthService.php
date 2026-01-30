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
        $this->issuer = rtrim((string) config('auth0.issuer'), '/') . '/';
        $this->audience = (string) config('auth0.audience');
    }

    public function getBearerToken(Request $request): string
    {
        $authorization = $request->header('Authorization');

        if (!$authorization || !str_starts_with($authorization, 'Bearer ')) {
            abort(401, 'Authentication token is missing');
        }

        return substr($authorization, 7);
    }

    public function verifyAccessToken(string $token): object
    {
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

        if (($decoded->iss ?? null) !== $this->issuer) {
            abort(401, 'Invalid token issuer');
        }

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

        if (empty($decoded->sub)) {
            abort(401, 'Invalid token subject');
        }

        return $decoded;
    }

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
