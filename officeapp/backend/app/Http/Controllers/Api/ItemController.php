<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\StoreInventoryItemRequest;
use App\Http\Requests\UpdateInventoryItemRequest;
use App\Http\Requests\StoreInventoryTransactionRequest;
use App\Models\InventoryItem;
use App\Services\InventoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class ItemController extends ApiController
{
    public function __construct(
        private InventoryService $inventoryService
    ) {}

    /**
     * GET /api/items
     * 一覧取得
     */
    public function index(Request $request): JsonResponse
    {
        // is_active は boolean に正規化
        $isActive = $request->query('is_active');
        if (!is_null($isActive)) {
            $isActive = filter_var($isActive, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        }

        $query = InventoryItem::query();

        if (!is_null($isActive)) {
            $query->where('is_active', $isActive);
        }

        // 一覧の並びは Controller が責任を持つ
        $items = $query
            ->orderByDesc('id')
            ->paginate(20);

        return $this->ok($items);
    }

    /**
     * GET /api/items/{id}
     * 詳細取得
     */
    public function show(int $id): JsonResponse
    {
        $item = InventoryItem::findOrFail($id);

        return $this->ok($item);
    }

    /**
     * POST /api/items
     * 作成
     */
    public function store(StoreInventoryItemRequest $request): JsonResponse
    {
        $item = $this->inventoryService->createItem(
            $request->validated()
        );

        return $this->created($item);
    }

    /**
     * PUT /api/items/{id}
     * 更新
     */
    public function update(
        UpdateInventoryItemRequest $request,
        int $id
    ): JsonResponse {
        $item = $this->inventoryService->updateItem(
            $id,
            $request->validated()
        );

        return $this->ok($item);
    }

    /**
     * POST /api/items/transactions
     * 入庫 / 出庫
     */
    public function storeTransaction(
        StoreInventoryTransactionRequest $request
    ): JsonResponse {
        $transaction = $this->inventoryService->createTransaction(
            $request->validated()
        );

        return $this->created($transaction);
    }

    /**
     * DELETE /api/items/{id}
     * 論理削除推奨だが一応用意
     */
    public function destroy(int $id): Response
    {
        InventoryItem::findOrFail($id)->delete();

        return $this->deletedResponse();
    }
}
