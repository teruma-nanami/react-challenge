<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DateRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'start_date',
        'end_date',
        'session',
        'reason',
        'status',
        'rejected_reason',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date'   => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
