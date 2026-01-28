<?php

namespace App\Services;

use App\Enums\InventoryTransactionType;
use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class InventoryService
{

    /**
     * 在庫商品を作成
     */
    public function createItem(array $data): InventoryItem
    {
        return InventoryItem::create([
            'sku' => $data['sku'] ?? null,
            'name' => $data['name'],
            'quantity' => $data['quantity'] ?? 0,
            'is_active' => $data['is_active'] ?? true,
        ]);
    }

    /**
     * 在庫商品を更新
     */
    public function updateItem(int $itemId, array $data): InventoryItem
    {
        $item = InventoryItem::findOrFail($itemId);

        $item->update([
            'sku' => $data['sku'] ?? $item->sku,
            'name' => $data['name'] ?? $item->name,
            'quantity' => $data['quantity'] ?? $item->quantity,
            'is_active' => $data['is_active'] ?? $item->is_active,
        ]);

        return $item;
    }

    /**
     * 入庫 / 出庫処理
     */
    public function createTransaction(array $data): InventoryTransaction
    {
        $type = InventoryTransactionType::from($data['type']);
        $qty  = (int) $data['quantity'];

        if ($qty <= 0) {
            throw new InvalidArgumentException('Quantity must be greater than 0.');
        }

        return DB::transaction(function () use ($data, $type, $qty) {
            $item = InventoryItem::lockForUpdate()
                ->findOrFail($data['inventory_item_id']);

            if (
                $type === InventoryTransactionType::OUT &&
                $item->quantity < $qty
            ) {
                throw new InvalidArgumentException('Not enough stock.');
            }

            $item->quantity += match ($type) {
                InventoryTransactionType::IN  => $qty,
                InventoryTransactionType::OUT => -$qty,
            };

            $item->save();

            return InventoryTransaction::create([
                'inventory_item_id' => $item->id,
                'user_id' => $data['user_id'] ?? null,
                'type' => $type->value,
                'quantity' => $qty,
                'note' => $data['note'] ?? null,
            ]);
        });
    }
    /**
     * 取引履歴の共通クエリ（Controller が order/paginate する前提）
     */
    public function transactionBaseQuery(): Builder
    {
        return InventoryTransaction::query()
            ->with(['item', 'user']);
    }
}
