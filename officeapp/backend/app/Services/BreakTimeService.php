<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\BreakTime;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class BreakTimeService
{
    private const TZ_UTC = 'UTC';

    /**
     * 休憩開始
     * - attendance は呼び出し側で確定済み（今日の勤怠など）
     * - break_start_at はサーバで now を採用（UTC保存）
     */
    public function startBreak(Attendance $attendance, Carbon $now): BreakTime
    {
        $nowUtc = $now->copy()->setTimezone(self::TZ_UTC);

        return DB::transaction(function () use ($attendance, $nowUtc) {
            $lockedAttendance = Attendance::where('id', $attendance->id)
                ->lockForUpdate()
                ->first();

            if (!$lockedAttendance) {
                throw new InvalidArgumentException('Attendance not found.');
            }

            if ($lockedAttendance->check_out_at !== null) {
                throw new InvalidArgumentException('Already checked out.');
            }

            $existsActiveBreak = BreakTime::where('attendance_id', $lockedAttendance->id)
                ->whereNull('break_end_at')
                ->exists();

            if ($existsActiveBreak) {
                throw new InvalidArgumentException('Break already started.');
            }

            if ($nowUtc->lt(Carbon::parse($lockedAttendance->check_in_at))) {
                throw new InvalidArgumentException('Break start is before check-in.');
            }

            return BreakTime::create([
                'attendance_id'  => $lockedAttendance->id,
                'break_start_at' => $nowUtc,
                'break_end_at'   => null,
            ]);
        });
    }

    /**
     * 休憩終了
     * - break_end_at はサーバで now を採用（UTC保存）
     */
    public function endBreak(int $id, Carbon $now): BreakTime
    {
        $nowUtc = $now->copy()->setTimezone(self::TZ_UTC);

        return DB::transaction(function () use ($id, $nowUtc) {
            $break = BreakTime::where('id', $id)
                ->lockForUpdate()
                ->first();

            if (!$break) {
                throw new InvalidArgumentException('Break not found.');
            }

            if ($break->break_end_at !== null) {
                throw new InvalidArgumentException('Break already ended.');
            }

            if ($nowUtc->lt(Carbon::parse($break->break_start_at))) {
                throw new InvalidArgumentException('Break end is before break start.');
            }

            $break->update([
                'break_end_at' => $nowUtc,
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
