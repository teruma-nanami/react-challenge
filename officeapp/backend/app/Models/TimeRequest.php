<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TimeRequest extends Model
{

    use HasFactory;
    protected $fillable = [
        'user_id',
        'attendance_id',
        'requested_check_in_at',
        'requested_check_out_at',
        'reason',
        'status',
        'rejected_reason',
    ];

    protected $casts = [
        'requested_check_in_at'  => 'datetime',
        'requested_check_out_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function attendance(): BelongsTo
    {
        return $this->belongsTo(Attendance::class);
    }
}
