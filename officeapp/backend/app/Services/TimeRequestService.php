<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\TimeRequest;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class TimeRequestService
{
    private AttendanceService $attendanceService;

    public function __construct(AttendanceService $attendanceService)
    {
        $this->attendanceService = $attendanceService;
    }

    /**
     * staff: 勤怠時刻修正申請作成（pending）
     * - 対象attendanceに対して pending が既にあれば弾く
     * - requested_check_in_at < requested_check_out_at
     * - requested_* の日付は attendance.work_date と一致必須
     */
    public function create(
        int $userId,
        Attendance $attendance,
        string $requestedCheckInAt,  // ISO8601 or 'Y-m-d H:i:s'
        string $requestedCheckOutAt, // ISO8601 or 'Y-m-d H:i:s'
        string $reason
    ): TimeRequest {
        // 自分の勤怠しか申請できない（最小の安全）
        if ((int)$attendance->user_id !== (int)$userId) {
            abort(403, 'You can only request edits for your own attendance');
        }

        if (trim($reason) === '') {
            abort(422, 'reason is required');
        }

        // 同一attendanceに pending があるなら弾く
        $alreadyPending = TimeRequest::query()
            ->where('attendance_id', $attendance->id)
            ->where('status', 'pending')
            ->exists();

        if ($alreadyPending) {
            abort(409, 'A pending time request already exists for this attendance');
        }

        $in  = CarbonImmutable::parse($requestedCheckInAt);
        $out = CarbonImmutable::parse($requestedCheckOutAt);

        if ($in->gte($out)) {
            abort(422, 'requested_check_in_at must be before requested_check_out_at');
        }

        // 日付整合（attendance.work_date と一致させる）
        $workDate = CarbonImmutable::parse($attendance->work_date)->toDateString();
        if ($in->toDateString() !== $workDate || $out->toDateString() !== $workDate) {
            abort(422, 'Requested times must be on the same work_date as the attendance');
        }

        return TimeRequest::create([
            'user_id'               => $userId,
            'attendance_id'         => $attendance->id,
            'requested_check_in_at' => $in,
            'requested_check_out_at' => $out,
            'reason'                => $reason,
            'status'                => 'pending',
            'rejected_reason'       => null,
        ]);
    }

    /**
     * staff: 自分の申請一覧
     */
    public function listMine(int $userId): Collection
    {
        return TimeRequest::query()
            ->where('user_id', $userId)
            ->orderByDesc('created_at')
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

    /**
     * admin: 承認
     * - attendance を申請内容で更新
     * - request を approved に更新
     */
    public function approve(TimeRequest $req): TimeRequest
    {
        if ($req->status !== 'pending') {
            abort(409, 'Only pending requests can be approved');
        }

        return DB::transaction(function () use ($req) {
            $attendance = $req->attendance()->lockForUpdate()->first();
            if (!$attendance) {
                abort(404, 'Attendance not found');
            }

            // Attendance を更新（実績反映）
            $this->attendanceService->updateTimes(
                $attendance,
                $req->requested_check_in_at,
                $req->requested_check_out_at
            );

            $req->status = 'approved';
            $req->rejected_reason = null;
            $req->save();

            return $req;
        });
    }

    /**
     * admin: 却下
     */
    public function reject(TimeRequest $req, string $rejectedReason): TimeRequest
    {
        if ($req->status !== 'pending') {
            abort(409, 'Only pending requests can be rejected');
        }

        if (trim($rejectedReason) === '') {
            abort(422, 'rejected_reason is required');
        }

        $req->status = 'rejected';
        $req->rejected_reason = $rejectedReason;
        $req->save();

        return $req;
    }
}
