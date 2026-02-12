<?php

namespace App\Services;

use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use InvalidArgumentException;

class AttendanceService
{
    private const TZ_JST = 'Asia/Tokyo';
    private const TZ_UTC = 'UTC';

    /**
     * 出勤打刻
     * ・同一日1レコード制約あり（DB制約前提）
     * ・work_date は JST の日付で確定
     * ・check_in_at は UTC で保存
     */
    public function checkIn(int $userId, Carbon $now): Attendance
    {
        $workDateJst = $now->copy()->setTimezone(self::TZ_JST)->toDateString();
        $nowUtc      = $now->copy()->setTimezone(self::TZ_UTC);

        try {
            return DB::transaction(function () use ($userId, $workDateJst, $nowUtc) {
                return Attendance::create([
                    'user_id'      => $userId,
                    'work_date'    => $workDateJst,
                    'check_in_at'  => $nowUtc,
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
     * ・work_date は JST の日付で確定
     * ・check_out_at は UTC で保存
     */
    public function checkOut(int $userId, Carbon $now): Attendance
    {
        $workDateJst = $now->copy()->setTimezone(self::TZ_JST)->toDateString();
        $nowUtc      = $now->copy()->setTimezone(self::TZ_UTC);

        return DB::transaction(function () use ($userId, $workDateJst, $nowUtc) {
            $attendance = Attendance::where('user_id', $userId)
                ->where('work_date', $workDateJst)
                ->lockForUpdate()
                ->first();

            if (!$attendance) {
                throw new InvalidArgumentException('Attendance not found.');
            }

            if ($attendance->check_out_at !== null) {
                throw new InvalidArgumentException('Already checked out.');
            }

            $attendance->update([
                'check_out_at' => $nowUtc,
            ]);

            return $attendance;
        });
    }

    /**
     * 今日の勤怠取得
     * ・work_date は JST の日付で確定
     */
    public function getTodayAttendance(int $userId, Carbon $now): ?Attendance
    {
        $workDateJst = $now->copy()->setTimezone(self::TZ_JST)->toDateString();

        return Attendance::where('user_id', $userId)
            ->where('work_date', $workDateJst)
            ->first();
    }

    /**
     * 勤怠時刻の更新（修正申請の承認時に使用）
     * - “業務日” は JST の work_date を基準に一致判定する
     * - check_in_at < check_out_at
     * - 保存は UTC
     *
     * 期待する入力:
     * - フロントが ISO(+09:00) でも Z でも送ってくる可能性があるので parse して UTC に寄せる
     */
    public function updateTimes(Attendance $attendance, $checkInAt, $checkOutAt): Attendance
    {
        if (!$checkInAt || !$checkOutAt) {
            throw new InvalidArgumentException('check_in_at and check_out_at are required.');
        }

        // 受け取った値を一旦パース
        $in  = Carbon::parse($checkInAt);
        $out = Carbon::parse($checkOutAt);

        if ($in->gte($out)) {
            throw new InvalidArgumentException('check_in_at must be before check_out_at.');
        }

        // work_date（YYYY-MM-DD）は “JST の業務日”
        $workDateJst = Carbon::parse($attendance->work_date, self::TZ_JST)->toDateString();

        // 入力時刻を JST に寄せて「日付一致」チェック
        $inJst  = $in->copy()->setTimezone(self::TZ_JST);
        $outJst = $out->copy()->setTimezone(self::TZ_JST);

        if ($inJst->toDateString() !== $workDateJst || $outJst->toDateString() !== $workDateJst) {
            throw new InvalidArgumentException('Requested times must be on the same work_date (JST) as the attendance.');
        }

        // 保存は UTC に統一
        $inUtc  = $in->copy()->setTimezone(self::TZ_UTC);
        $outUtc = $out->copy()->setTimezone(self::TZ_UTC);

        return DB::transaction(function () use ($attendance, $inUtc, $outUtc) {
            $locked = Attendance::where('id', $attendance->id)
                ->lockForUpdate()
                ->first();

            if (!$locked) {
                throw new InvalidArgumentException('Attendance not found.');
            }

            $locked->update([
                'check_in_at'  => $inUtc,
                'check_out_at' => $outUtc,
            ]);

            return $locked;
        });
    }
}
