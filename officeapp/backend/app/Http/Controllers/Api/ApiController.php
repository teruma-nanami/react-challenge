<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    protected function auth0UserId(Request $request): string
    {
        return (string) $request->header('X-Auth0-User-Id');
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

    protected function noContent(): JsonResponse
    {
        return response()->json(null, 204);
    }

    // 明日これに変更する
    protected function deletedResponse(): \Illuminate\Http\Response
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
