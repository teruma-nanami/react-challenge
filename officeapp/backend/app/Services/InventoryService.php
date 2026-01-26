<?php

namespace App\Services;

use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class InventoryService
{
    /**
     * 在庫一覧を取得（activeのみ、などの条件は必要になったら追加）
     */
    public function getItems(?bool $isActive = null): Collection
    {
        $query = InventoryItem::query()->orderBy('id', 'desc');

        if (!is_null($isActive)) {
            $query->where('is_active', $isActive);
        }

        return $query->get();
    }

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
     * 入庫 / 出庫 / 調整（履歴を残しつつ在庫数も更新する）
     *
     * type: in / out / adjust
     * quantity: 正の整数
     */
    public function createTransaction(array $data): InventoryTransaction
    {
        $type = $data['type'];
        $qty = (int) $data['quantity'];

        if (!in_array($type, ['in', 'out', 'adjust'], true)) {
            throw new InvalidArgumentException('Invalid transaction type.');
        }

        if ($qty <= 0) {
            throw new InvalidArgumentException('Quantity must be greater than 0.');
        }

        return DB::transaction(function () use ($data, $type, $qty) {
            $item = InventoryItem::lockForUpdate()->findOrFail($data['inventory_item_id']);

            // 在庫数を更新
            if ($type === 'in') {
                $item->quantity += $qty;
            }

            if ($type === 'out') {
                $next = $item->quantity - $qty;
                if ($next < 0) {
                    throw new InvalidArgumentException('Not enough stock.');
                }
                $item->quantity = $next;
            }

            if ($type === 'adjust') {
                // adjustは「指定数に合わせる」じゃなく「増減」にするならここを変更
                $item->quantity += $qty;
            }

            $item->save();

            // 履歴を作成
            return InventoryTransaction::create([
                'inventory_item_id' => $item->id,
                'user_id' => $data['user_id'] ?? null,
                'type' => $type,
                'quantity' => $qty,
                'note' => $data['note'] ?? null,
            ]);
        });
    }

    public function getTransactions(int $perPage = 20): LengthAwarePaginator
    {
        return InventoryTransaction::query()
            ->with(['item', 'user'])
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }
}