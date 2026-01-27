<?php

namespace App\Services;

use App\Models\BreakTime;
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
            // 同一勤怠で「終了していない休憩」が存在しないかチェック
            $exists = BreakTime::where('attendance_id', $data['attendance_id'])
                ->whereNull('break_end_at')
                ->exists();

            if ($exists) {
                throw new InvalidArgumentException('Break already started.');
            }

            return BreakTime::create([
                'attendance_id'  => $data['attendance_id'],
                'break_start_at' => $data['break_start_at'],
            ]);
        });
    }

    /**
     * 休憩終了
     */
    public function endBreak(int $breakTimeId, array $data): BreakTime
    {
        return DB::transaction(function () use ($breakTimeId, $data) {
            $breakTime = BreakTime::findOrFail($breakTimeId);

            if ($breakTime->break_end_at !== null) {
                throw new InvalidArgumentException('Break already ended.');
            }

            // 開始より前の終了は禁止
            if ($data['break_end_at'] < $breakTime->break_start_at) {
                throw new InvalidArgumentException('Invalid break end time.');
            }

            $breakTime->update([
                'break_end_at' => $data['break_end_at'],
            ]);

            return $breakTime->fresh();
        });
    }

    /**
     * 勤怠に紐づく休憩一覧取得
     */
    public function getByAttendance(int $attendanceId)
    {
        return BreakTime::where('attendance_id', $attendanceId)
            ->orderBy('break_start_at')
            ->get();
    }
}
