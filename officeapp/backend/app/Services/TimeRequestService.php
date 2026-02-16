<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\TimeRequest;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class TimeRequestService
{
    /**
     * staff: 勤怠時刻修正申請作成（pending）
     *
     * 前提：
     * - attendance は Controller 側で「存在確認」「所有者確認」済み
     * - requested_* は Controller/FormRequest 側で「日付整合」「in<out」等を保証済み
     *
     * この Service が担うこと：
     * - 同一 attendance に pending が既にあるか（DB状態）を競合込みで判定する
     * - TimeRequest レコードを作成する
     */
    public function create(
        int $userId,
        Attendance $attendance,
        string $requestedCheckInAt,
        ?string $requestedCheckOutAt,
        string $reason
    ): TimeRequest {
        return DB::transaction(function () use (
            $userId,
            $attendance,
            $requestedCheckInAt,
            $requestedCheckOutAt,
            $reason
        ) {
            $attendanceId = (int) $attendance->id;

            $alreadyPending = TimeRequest::query()
                ->where('attendance_id', $attendanceId)
                ->where('status', 'pending')
                ->lockForUpdate()
                ->exists();

            if ($alreadyPending) {
                // ここは「入力値のバリデーション」ではなく「DBの状態」なので Service に残す価値がある。
                // ただし HTTP にするなら Controller 側で catch して 409 に変換すること。
                throw new \RuntimeException('A pending time request already exists for this attendance');
            }

            $in  = CarbonImmutable::parse($requestedCheckInAt);

            $out = ($requestedCheckOutAt !== null && trim($requestedCheckOutAt) !== '')
                ? CarbonImmutable::parse($requestedCheckOutAt)
                : null;

            return TimeRequest::create([
                'user_id'                => $userId,
                'attendance_id'          => $attendanceId,
                'requested_check_in_at'  => $in,
                'requested_check_out_at' => $out,
                'reason'                 => $reason,
                'status'                 => 'pending',
                'rejected_reason'        => null,
            ]);
        });
    }

    /**
     * staff: 自分の申請一覧
     */
    public function listMine(int $userId): Collection
    {
        return TimeRequest::query()
            ->where('user_id', (int) $userId)
            ->orderByDesc('id')
            ->limit(200)
            ->get();
    }

    /**
     * admin: pending一覧
     */
    public function listPending(): Collection
    {
        return TimeRequest::query()
            ->where('status', 'pending')
            ->orderBy('created_at')
            ->get();
    }
}
