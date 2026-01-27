<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Attendance;

class BreakTime extends Model
{
    protected $fillable = [
        'attendance_id',
        'break_start_at',
        'break_end_at',
    ];

    protected $casts = [
        'break_start_at' => 'datetime',
        'break_end_at'   => 'datetime',
    ];

    public function attendance()
    {
        return $this->belongsTo(Attendance::class);
    }
}
