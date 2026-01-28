<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\StoreBillingRequest;
use App\Services\BillingRequestService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class BillingRequestController extends ApiController
{
    public function __construct(
        private BillingRequestService $billingRequestService
    ) {}

    /**
     * GET /api/billings
     * 稟議一覧（ログインユーザー自身）
     */
    public function index(Request $request): JsonResponse
    {
        $userId = $this->auth0UserId($request);

        $query = $this->billingRequestService
            ->baseQueryByUser($userId);

        // 並び順・ページングは Controller の責務
        $billings = $query
            ->orderByDesc('id')
            ->paginate(20);

        return $this->ok($billings);
    }

    /**
     * POST /api/billings
     * 稟議作成
     */
    public function store(StoreBillingRequest $request): JsonResponse
    {
        $userId = $this->auth0UserId($request);

        $data = $request->validated();
        $data['user_id'] = $userId;

        $billing = $this->billingRequestService->create($data);

        return $this->created($billing, 'billing created');
    }

    /**
     * GET /api/billings/{id}
     * 稟議詳細
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $userId = $this->auth0UserId($request);

        $billing = $this->billingRequestService
            ->findByUser($id, $userId);

        return $this->ok($billing);
    }

    /**
     * DELETE /api/billings/{id}
     * 稟議削除（提出前想定）
     */
    public function destroy(Request $request, int $id): Response
    {
        $userId = $this->auth0UserId($request);

        $this->billingRequestService
            ->deleteByUser($id, $userId);

        return $this->deletedResponse();
    }
}
