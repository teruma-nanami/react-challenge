<?php

namespace App\Http\Controllers\Api;

use App\Services\AttendanceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
    public function checkIn(Request $request): JsonResponse
    {
        try {
            // ※ Auth0導入前なので一旦 request から
            $userId = (int) $request->input('user_id');

            if ($userId <= 0) {
                return $this->badRequest('Invalid user id.');
            }

            $attendance = $this->attendanceService->checkIn(
                $userId,
                now()
            );

            return $this->created($attendance, 'checked in');
        } catch (InvalidArgumentException $e) {
            // 業務的に想定された失敗
            return $this->badRequest($e->getMessage());
        }
    }

    /**
     * POST /api/attendances/check-out
     * 退勤打刻
     */
    public function checkOut(Request $request): JsonResponse
    {
        try {
            $userId = (int) $request->input('user_id');

            if ($userId <= 0) {
                return $this->badRequest('Invalid user id.');
            }

            $attendance = $this->attendanceService->checkOut(
                $userId,
                now()
            );

            return $this->ok($attendance, 'checked out');
        } catch (InvalidArgumentException $e) {
            return $this->badRequest($e->getMessage());
        }
    }


    public function today(Request $request): JsonResponse
    {
        $userId = (int) $request->query('user_id');

        $attendance = $this->attendanceService->getTodayAttendance(
            $userId,
            Carbon::now()
        );

        return $this->ok($attendance);
    }
}
