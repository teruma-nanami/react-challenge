<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Models\InventoryItem;
use App\Services\InventoryService;
use Illuminate\Http\JsonResponse;
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
        // activeだけ表示したい場合に使える
        // ?is_active=1 or 0
        $isActive = $request->query('is_active');

        $items = $this->inventoryService->getItems(
            is_null($isActive) ? null : (bool) $isActive
        );

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
    public function store(Request $request): JsonResponse
    {
        // 今回はRequestクラスは作らず、最低限でいく
        $data = $request->validate([
            'sku' => ['nullable', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'quantity' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $item = $this->inventoryService->createItem($data);

        return $this->created($item);
    }

    /**
     * PUT /api/items/{id}
     * 更新
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'sku' => ['nullable', 'string', 'max:255'],
            'name' => ['sometimes', 'string', 'max:255'],
            'quantity' => ['sometimes', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $item = $this->inventoryService->updateItem($id, $data);

        return $this->ok($item);
    }

    /**
     * DELETE /api/items/{id}
     * 本当は削除より is_active=false を推奨だが、一応用意
     */
    public function destroy(int $id): JsonResponse
    {
        $item = InventoryItem::findOrFail($id);
        $item->delete();

        return $this->noContent();
    }
}