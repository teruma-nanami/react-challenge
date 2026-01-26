<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InventoryTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'inventory_item_id',
        'user_id',
        'type',
        'quantity',
        'note',
    ];

    /**
     * 対象の商品
     */
    public function item(): BelongsTo
    {
        return $this->belongsTo(InventoryItem::class, 'inventory_item_id');
    }

    /**
     * 操作したユーザー（nullable）
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}