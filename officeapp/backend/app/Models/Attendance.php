<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'work_date',
        'check_in_at',
        'check_out_at',
    ];

    protected $casts = [
        'work_date'    => 'date',
        'check_in_at'  => 'datetime',
        'check_out_at' => 'datetime',
    ];

    /**
     * 勤怠の持ち主（ユーザー）
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * この勤怠に紐づく休憩一覧
     */
    public function breakTimes(): HasMany
    {
        return $this->hasMany(BreakTime::class);
    }
}
