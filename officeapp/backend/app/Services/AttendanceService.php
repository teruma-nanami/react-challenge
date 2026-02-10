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


    /**
     * 勤怠時刻の更新（修正申請の承認時に使用）
     * - work_date と check_in/out の日付が一致していること
     * - check_in_at < check_out_at
     */
    public function updateTimes(Attendance $attendance, $checkInAt, $checkOutAt): Attendance
    {
        $in  = Carbon::parse($checkInAt);
        $out = Carbon::parse($checkOutAt);

        if ($in->gte($out)) {
            throw new InvalidArgumentException('check_in_at must be before check_out_at.');
        }

        $workDate = Carbon::parse($attendance->work_date)->toDateString();
        if ($in->toDateString() !== $workDate || $out->toDateString() !== $workDate) {
            throw new InvalidArgumentException('Requested times must be on the same work_date as the attendance.');
        }

        return DB::transaction(function () use ($attendance, $in, $out) {
            $locked = Attendance::where('id', $attendance->id)
                ->lockForUpdate()
                ->first();

            if (!$locked) {
                throw new InvalidArgumentException('Attendance not found.');
            }

            $locked->update([
                'check_in_at'  => $in,
                'check_out_at' => $out,
            ]);

            return $locked;
        });
    }
}
