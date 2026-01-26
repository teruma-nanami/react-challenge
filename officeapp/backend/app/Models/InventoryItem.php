<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InventoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'sku',
        'name',
        'quantity',
        'is_active',
    ];

    /**
     * この商品に紐づく入出庫履歴
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(InventoryTransaction::class);
    }
}