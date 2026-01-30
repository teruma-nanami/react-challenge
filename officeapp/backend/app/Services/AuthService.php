<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\JWK;
use Illuminate\Support\Facades\Http;

class AuthService
{
    public function issuer(): string
    {
        $issuer = (string) config('auth0.issuer');
        $issuer = rtrim($issuer, '/') . '/';
        return $issuer;
    }

    public function audience(): string
    {
        return (string) config('auth0.audience');
    }

    /**
     * Access Token を検証し、sub と userinfo を返す
     *
     * @return array{sub:string,userinfo:array,decoded:object}
     */
    public function authenticateAccessToken(string $accessToken): array
    {
        $decoded = $this->decodeAndVerify($accessToken);
        $this->validateClaims($decoded);

        $sub = (string) ($decoded->sub ?? '');
        if ($sub === '') {
            abort(401, 'Invalid token subject');
        }

        $userinfo = $this->fetchUserInfo($accessToken);

        return [
            'sub' => $sub,
            'userinfo' => $userinfo,
            'decoded' => $decoded,
        ];
    }

    /**
     * JWKS から署名検証して decode
     */
    private function decodeAndVerify(string $jwt): object
    {
        $jwks = $this->fetchJwks();

        if (!is_array($jwks) || !isset($jwks['keys']) || !is_array($jwks['keys'])) {
            abort(401, 'Invalid JWKS');
        }

        $keySet = JWK::parseKeySet($jwks);

        return JWT::decode($jwt, $keySet);
    }

    /**
     * iss / aud を検証
     */
    private function validateClaims(object $decoded): void
    {
        $issuer = $this->issuer();
        $audience = $this->audience();

        if (($decoded->iss ?? null) !== $issuer) {
            abort(401, 'Invalid token issuer');
        }

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
    }

    /**
     * JWKS を取得
     */
    private function fetchJwks(): array
    {
        $url = $this->issuer() . '.well-known/jwks.json';

        $res = Http::timeout(5)->get($url);

        if (!$res->ok()) {
            abort(401, 'Failed to fetch JWKS');
        }

        $json = $res->json();
        return is_array($json) ? $json : [];
    }

    /**
     * Auth0 /userinfo から email/name を取る（Access Token を使う）
     */
    private function fetchUserInfo(string $accessToken): array
    {
        $url = $this->issuer() . 'userinfo';

        $res = Http::timeout(5)
            ->withHeaders([
                'Authorization' => 'Bearer ' . $accessToken,
                'Accept' => 'application/json',
            ])
            ->get($url);

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
