<?php

namespace App\Services;

use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use InvalidArgumentException;

class AttendanceService
{
    /**
     * 出勤打刻
     * ・同一日1レコード制約あり（DB制約前提）
     */
    public function checkIn(int $userId, Carbon $now): Attendance
    {
        $workDate = $now->toDateString();

        try {
            return DB::transaction(function () use ($userId, $workDate, $now) {
                return Attendance::create([
                    'user_id'      => $userId,
                    'work_date'    => $workDate,
                    'check_in_at'  => $now,
                    'check_out_at' => null,
                ]);
            });
        } catch (QueryException $e) {
            // UNIQUE(user_id, work_date) 想定
            throw new InvalidArgumentException('Already checked in today.');
        }
    }

    /**
     * 退勤打刻
     */
    public function checkOut(int $userId, Carbon $now): Attendance
    {
        $workDate = $now->toDateString();

        return DB::transaction(function () use ($userId, $workDate, $now) {
            $attendance = Attendance::where('user_id', $userId)
                ->where('work_date', $workDate)
                ->lockForUpdate()
                ->first();

            if (!$attendance) {
                throw new InvalidArgumentException('Attendance not found.');
            }

            if ($attendance->check_out_at !== null) {
                throw new InvalidArgumentException('Already checked out.');
            }

            $attendance->update([
                'check_out_at' => $now,
            ]);

            return $attendance;
        });
    }

    /**
     * 今日の勤怠取得
     */
    public function getTodayAttendance(int $userId, Carbon $now): ?Attendance
    {
        return Attendance::where('user_id', $userId)
            ->where('work_date', $now->toDateString())
            ->first();
    }
}
