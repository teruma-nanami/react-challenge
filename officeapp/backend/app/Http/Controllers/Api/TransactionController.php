<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreInventoryTransactionRequest;
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
     * 履歴一覧（最新順）
     */
    public function index(Request $request): JsonResponse
    {
        $query = $this->inventoryService->transactionBaseQuery();

        $transactions = $query
            ->orderByDesc('id')   // order は Controller の責務
            ->paginate(20); // paginate も Controller の責務

        return $this->ok($transactions);
    }

    /**
     * GET /api/transactions/{id}
     * 履歴詳細
     */
    public function show(int $id): JsonResponse
    {
        $transaction = $this->inventoryService
            ->transactionBaseQuery()
            ->findOrFail($id);

        return $this->ok($transaction);
    }

    /**
     * POST /api/transactions
     * 入庫/出庫（在庫数も更新する）
     */
    public function store(StoreInventoryTransactionRequest $request): JsonResponse
    {
        $transaction = $this->inventoryService->createTransaction(
            $request->validated()
        );

        return $this->created($transaction);
    }
}
