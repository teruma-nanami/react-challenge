<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BreakTime extends Model
{
    protected $fillable = [
        'attendance_id',
        'break_start_at',
        'break_end_at',
    ];

    public function attendance()
    {
        return $this->belongsTo(Attendance::class);
    }
}
