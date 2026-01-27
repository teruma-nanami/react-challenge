<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\AttendanceCheckInRequest;
use App\Http\Requests\AttendanceCheckOutRequest;
use App\Http\Requests\AttendanceTodayRequest;
use App\Services\AttendanceService;
use Illuminate\Http\JsonResponse;
use InvalidArgumentException;
use Carbon\Carbon;

class AttendanceController extends ApiController
{
    public function __construct(
        private AttendanceService $attendanceService
    ) {}

    /**
     * POST /api/attendances/check-in
     * 出勤打刻
     */
    public function checkIn(AttendanceCheckInRequest $request): JsonResponse
    {
        try {
            $attendance = $this->attendanceService->checkIn(
                $request->userId(),
                now()
            );

            return $this->created($attendance, 'checked in');
        } catch (InvalidArgumentException $e) {
            // 業務的に想定された失敗（2重打刻など）
            return $this->badRequest($e->getMessage());
        }
    }

    /**
     * POST /api/attendances/check-out
     * 退勤打刻
     */
    public function checkOut(AttendanceCheckOutRequest $request): JsonResponse
    {
        try {
            $attendance = $this->attendanceService->checkOut(
                $request->userId(),
                now()
            );

            return $this->ok($attendance, 'checked out');
        } catch (InvalidArgumentException $e) {
            return $this->badRequest($e->getMessage());
        }
    }

    /**
     * GET /api/attendances/today
     * 本日の勤怠取得
     */
    public function today(AttendanceTodayRequest $request): JsonResponse
    {
        $attendance = $this->attendanceService->getTodayAttendance(
            $request->userId(),
            Carbon::now()
        );

        return $this->ok($attendance);
    }
}
