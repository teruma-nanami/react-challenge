<?php
// app/Http/Controllers/Api/AdminController.php

namespace App\Http\Controllers\Api;

use App\Services\AdminService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends ApiController
{
    public function __construct(
        private AdminService $adminService
    ) {}

    /**
     * Admin判定（ApiControllerは触らない）
     */
    private function ensureAdmin(Request $request): void
    {
        $user = $this->currentUser($request);

        // role: admin / staff を想定
        if (($user->role ?? null) !== 'admin') {
            abort(Response::HTTP_FORBIDDEN, 'Forbidden');
        }
    }

    /**
     * InvalidArgumentException を「409」と「422」に分ける。
     * - 状態不整合（pending以外でapprove/reject）: 409
     * - 入力不正（rejected_reason空など）: 422
     *
     * ※ abort() で止めるのではなく、ここで JsonResponse を返して
     *   「全経路が戻り値を返す」状態にする。
     */
    private function invalidArgumentToResponse(InvalidArgumentException $e): JsonResponse
    {
        $msg = $e->getMessage();

        if (str_contains($msg, 'Only pending requests can be')) {
            return response()->json([
                'message' => $msg,
            ], Response::HTTP_CONFLICT);
        }

        if (str_contains($msg, 'rejected_reason is required')) {
            return response()->json([
                'message' => $msg,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json([
            'message' => $msg,
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * POST /api/admin/date-requests/{id}/approve
     */
    public function approveDateRequest(Request $request, int $id): JsonResponse
    {
        $this->ensureAdmin($request);

        try {
            $updated = $this->adminService->approveDateRequest($id);
            return $this->ok($updated, 'Approved');
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        } catch (InvalidArgumentException $e) {
            return $this->invalidArgumentToResponse($e);
        }
    }

    /**
     * POST /api/admin/date-requests/{id}/reject
     */
    public function rejectDateRequest(Request $request, int $id): JsonResponse
    {
        $this->ensureAdmin($request);

        $validated = $request->validate([
            'rejected_reason' => ['required', 'string'],
        ]);

        try {
            $updated = $this->adminService->rejectDateRequest($id, $validated['rejected_reason']);
            return $this->ok($updated, 'Rejected');
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        } catch (InvalidArgumentException $e) {
            return $this->invalidArgumentToResponse($e);
        }
    }

    /**
     * POST /api/admin/time-requests/{id}/approve
     */
    public function approveTimeRequest(Request $request, int $id): JsonResponse
    {
        $this->ensureAdmin($request);

        try {
            $updated = $this->adminService->approveTimeRequest($id);
            return $this->ok($updated, 'Approved');
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        } catch (InvalidArgumentException $e) {
            return $this->invalidArgumentToResponse($e);
        }
    }

    /**
     * POST /api/admin/time-requests/{id}/reject
     */
    public function rejectTimeRequest(Request $request, int $id): JsonResponse
    {
        $this->ensureAdmin($request);

        $validated = $request->validate([
            'rejected_reason' => ['required', 'string'],
        ]);

        try {
            $updated = $this->adminService->rejectTimeRequest($id, $validated['rejected_reason']);
            return $this->ok($updated, 'Rejected');
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        } catch (InvalidArgumentException $e) {
            return $this->invalidArgumentToResponse($e);
        }
    }
}
