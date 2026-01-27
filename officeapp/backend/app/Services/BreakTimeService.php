<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\BreakTime;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class BreakTimeService
{
    /**
     * 休憩開始
     */
    public function startBreak(array $data): BreakTime
    {
        return DB::transaction(function () use ($data) {
            $attendance = Attendance::lockForUpdate()->find($data['attendance_id']);

            if (!$attendance) {
                throw new InvalidArgumentException('Attendance not found.');
            }

            if ($attendance->check_out_at !== null) {
                throw new InvalidArgumentException('Already checked out.');
            }

            $existsActiveBreak = BreakTime::where('attendance_id', $attendance->id)
                ->whereNull('break_end_at')
                ->exists();

            if ($existsActiveBreak) {
                throw new InvalidArgumentException('Break already started.');
            }

            $breakStartAt = Carbon::parse($data['break_start_at']);

            if ($breakStartAt->lt($attendance->check_in_at)) {
                throw new InvalidArgumentException('Break start is before check-in.');
            }

            return BreakTime::create([
                'attendance_id'  => $attendance->id,
                'break_start_at' => $breakStartAt,
            ]);
        });
    }

    /**
     * 休憩終了
     */
    public function endBreak(int $id, array $data): BreakTime
    {
        return DB::transaction(function () use ($id, $data) {
            $break = BreakTime::where('id', $id)
                ->lockForUpdate()
                ->first();

            if (!$break) {
                throw new InvalidArgumentException('Break not found.');
            }

            if ($break->break_end_at !== null) {
                throw new InvalidArgumentException('Break already ended.');
            }

            $breakEndAt = Carbon::parse($data['break_end_at']);

            if ($breakEndAt->lt($break->break_start_at)) {
                throw new InvalidArgumentException('Break end is before break start.');
            }

            $break->update([
                'break_end_at' => $breakEndAt,
            ]);

            return $break;
        });
    }

    /**
     * 勤怠に紐づく休憩一覧
     */
    public function getByAttendance(int $attendanceId)
    {
        return BreakTime::where('attendance_id', $attendanceId)
            ->orderBy('break_start_at')
            ->get();
    }
}
