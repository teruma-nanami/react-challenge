<?php
// app/Services/AdminService.php

namespace App\Services;

use App\Models\DateRequest;
use App\Models\TimeRequest;
use App\Models\Attendance;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class AdminService
{
    public function __construct(
        private AttendanceService $attendanceService
    ) {}

    /**
     * 休日申請：承認
     */
    public function approveDateRequest(int $dateRequestId): DateRequest
    {
        return DB::transaction(function () use ($dateRequestId) {
            $req = DateRequest::where('id', $dateRequestId)
                ->lockForUpdate()
                ->firstOrFail();

            if ($req->status !== 'pending') {
                throw new InvalidArgumentException('Only pending requests can be approved.');
            }

            $req->update([
                'status' => 'approved',
                // 却下理由は承認時に消す
                'rejected_reason' => null,
            ]);

            return $req;
        });
    }

    /**
     * 休日申請：却下
     */
    public function rejectDateRequest(int $dateRequestId, string $rejectedReason): DateRequest
    {
        $rejectedReason = trim($rejectedReason);
        if ($rejectedReason === '') {
            throw new InvalidArgumentException('rejected_reason is required.');
        }

        return DB::transaction(function () use ($dateRequestId, $rejectedReason) {
            $req = DateRequest::where('id', $dateRequestId)
                ->lockForUpdate()
                ->firstOrFail();

            if ($req->status !== 'pending') {
                throw new InvalidArgumentException('Only pending requests can be rejected.');
            }

            $req->update([
                'status' => 'rejected',
                'rejected_reason' => $rejectedReason,
            ]);

            return $req;
        });
    }

    /**
     * 時刻修正申請：承認（勤怠の更新も同トランザクションでやる）
     */
    public function approveTimeRequest(int $timeRequestId): TimeRequest
    {
        return DB::transaction(function () use ($timeRequestId) {
            $req = TimeRequest::where('id', $timeRequestId)
                ->lockForUpdate()
                ->firstOrFail();

            if ($req->status !== 'pending') {
                throw new InvalidArgumentException('Only pending requests can be approved.');
            }

            $attendance = Attendance::where('id', $req->attendance_id)
                ->lockForUpdate()
                ->first();

            if (!$attendance) {
                throw new InvalidArgumentException('Attendance not found.');
            }

            // requested_check_out_at が null のケースは「未退勤修正」なので許容
            // AttendanceService側が out必須だと落ちるので、ここで分岐
            if ($req->requested_check_out_at === null) {
                // 出勤だけ更新（退勤は触らない）
                $this->attendanceService->updateTimes(
                    $attendance,
                    $req->requested_check_in_at,
                    // 退勤は現在値を維持
                    $attendance->check_out_at
                );
            } else {
                $this->attendanceService->updateTimes(
                    $attendance,
                    $req->requested_check_in_at,
                    $req->requested_check_out_at
                );
            }

            $req->update([
                'status' => 'approved',
                'rejected_reason' => null,
            ]);

            return $req;
        });
    }

    /**
     * 時刻修正申請：却下
     */
    public function rejectTimeRequest(int $timeRequestId, string $rejectedReason): TimeRequest
    {
        $rejectedReason = trim($rejectedReason);
        if ($rejectedReason === '') {
            throw new InvalidArgumentException('rejected_reason is required.');
        }

        return DB::transaction(function () use ($timeRequestId, $rejectedReason) {
            $req = TimeRequest::where('id', $timeRequestId)
                ->lockForUpdate()
                ->firstOrFail();

            if ($req->status !== 'pending') {
                throw new InvalidArgumentException('Only pending requests can be rejected.');
            }

            $req->update([
                'status' => 'rejected',
                'rejected_reason' => $rejectedReason,
            ]);

            return $req;
        });
    }
}
