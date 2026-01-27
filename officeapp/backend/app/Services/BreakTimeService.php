<?php

namespace App\Services;

use App\Models\BreakTime;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class BreakTimeService
{
    public function startBreak(array $data): BreakTime
    {
        return DB::transaction(function () use ($data) {
            return BreakTime::create([
                'attendance_id'  => $data['attendance_id'],
                'break_start_at' => Carbon::parse($data['break_start_at']),
            ]);
        });
    }

    public function endBreak(int $id, array $data): BreakTime
    {
        return DB::transaction(function () use ($id, $data) {
            $break = BreakTime::lockForUpdate()->find($id);

            if (!$break) {
                throw new InvalidArgumentException('Break not found.');
            }

            if ($break->break_end_at !== null) {
                throw new InvalidArgumentException('Break already ended.');
            }

            $break->update([
                'break_end_at' => Carbon::parse($data['break_end_at']),
            ]);

            return $break;
        });
    }

    public function getByAttendance(int $attendanceId)
    {
        return BreakTime::where('attendance_id', $attendanceId)
            ->orderBy('break_start_at')
            ->get();
    }
}
