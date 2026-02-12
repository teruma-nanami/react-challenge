<?php
// app/Http/Controllers/Api/AdminController.php

namespace App\Http\Controllers\Api;

use App\Services\AdminService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;

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
            abort(403, 'Forbidden');
        }
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
            abort(404, 'Not found');
        } catch (InvalidArgumentException $e) {
            abort(422, $e->getMessage());
        }
    }

    /**
     * POST /api/admin/date-requests/{id}/reject
     */
    public function rejectDateRequest(Request $request, int $id): JsonResponse
    {
        $this->ensureAdmin($request);

        $validated = $request->validate([
            'reject_reason' => ['required', 'string'],
        ]);

        try {
            $updated = $this->adminService->rejectDateRequest($id, $validated['reject_reason']);
            return $this->ok($updated, 'Rejected');
        } catch (ModelNotFoundException $e) {
            abort(404, 'Not found');
        } catch (InvalidArgumentException $e) {
            abort(422, $e->getMessage());
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
            abort(404, 'Not found');
        } catch (InvalidArgumentException $e) {
            abort(422, $e->getMessage());
        }
    }

    /**
     * POST /api/admin/time-requests/{id}/reject
     */
    public function rejectTimeRequest(Request $request, int $id): JsonResponse
    {
        $this->ensureAdmin($request);

        $validated = $request->validate([
            'reject_reason' => ['required', 'string'],
        ]);

        try {
            $updated = $this->adminService->rejectTimeRequest($id, $validated['reject_reason']);
            return $this->ok($updated, 'Rejected');
        } catch (ModelNotFoundException $e) {
            abort(404, 'Not found');
        } catch (InvalidArgumentException $e) {
            abort(422, $e->getMessage());
        }
    }
}
