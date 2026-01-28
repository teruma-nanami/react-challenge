<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\BillingRequestStatus;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BillingRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'amount',
        'reason',
        'status',
        'approved_by',
    ];

    protected $casts = [
        'amount' => 'integer',
        'user_id' => 'integer',
        'approved_by' => 'integer',
        'status' => BillingRequestStatus::class,
    ];

    /**
     * 申請者
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 承認者（Admin）
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
