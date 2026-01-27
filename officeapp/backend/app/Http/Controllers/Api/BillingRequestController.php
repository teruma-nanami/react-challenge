<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\StoreBillingRequest;
use App\Models\BillingRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class BillingRequestController extends ApiController
{
    /**
     * GET /api/billings
     * 稟議一覧（自分が出したもの）
     */
    public function index(): JsonResponse
    {
        // Auth0導入前：一旦 user_id = 1 仮固定
        $userId = 1;

        $billings = BillingRequest::query()
            ->where('user_id', $userId)
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
        $userId = 1; // 仮（あとで Auth0 に置き換える）
        $data = $request->validated();
        $data['user_id'] = $userId;
        $billing = BillingRequest::create($data);

        return $this->created($billing, 'billing created');
    }

    /**
     * GET /api/billings/{id}
     * 稟議詳細
     */
    public function show(int $id): JsonResponse
    {
        // Auth0導入前：一旦 user_id = 1 仮固定
        $userId = 1;

        $billing = BillingRequest::where('id', $id)
            ->where('user_id', $userId)
            ->firstOrFail();

        return $this->ok($billing);
    }

    /**
     * DELETE /api/billings/{id}
     * 稟議削除（提出前想定）
     */
    public function destroy(int $id): Response
    {
        // Auth0導入前：一旦 user_id = 1 仮固定
        $userId = 1;

        $billing = BillingRequest::where('id', $id)
            ->where('user_id', $userId)
            ->firstOrFail();

        $billing->delete();

        return $this->deletedResponse();
    }
}
