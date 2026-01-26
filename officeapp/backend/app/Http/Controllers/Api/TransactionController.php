<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Models\InventoryTransaction;
use App\Services\InventoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransactionController extends ApiController
{
    public function __construct(
        private InventoryService $inventoryService
    ) {}

    /**
     * GET /api/transactions
     * 履歴一覧（とりあえず最新順）
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 20);

        $transactions = $this->inventoryService->getTransactions($perPage);

        return $this->ok($transactions);
    }

    /**
     * GET /api/transactions/{id}
     * 履歴詳細
     */
    public function show(int $id): JsonResponse
    {
        $transaction = InventoryTransaction::with(['item', 'user'])->findOrFail($id);

        return $this->ok($transaction);
    }

    /**
     * POST /api/transactions
     * 入庫/出庫/調整（在庫数も更新する）
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'inventory_item_id' => ['required', 'integer', 'exists:inventory_items,id'],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'type' => ['required', 'string', 'in:in,out,adjust'],
            'quantity' => ['required', 'integer', 'min:1'],
            'note' => ['nullable', 'string'],
        ]);

        $transaction = $this->inventoryService->createTransaction($data);

        return $this->created($transaction);
    }
}