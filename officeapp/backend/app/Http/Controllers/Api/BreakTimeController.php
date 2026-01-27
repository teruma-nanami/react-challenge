<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Services\BreakTimeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BreakTimeController extends ApiController
{
    public function __construct(
        private BreakTimeService $breakTimeService
    ) {}

    /**
     * POST /api/break-times/start
     * 休憩開始
     */
    public function start(Request $request): JsonResponse
    {
        $data = $request->validate([
            'attendance_id' => ['required', 'integer', 'exists:attendances,id'],
            'break_start_at' => ['required', 'date'],
        ]);

        $breakTime = $this->breakTimeService->startBreak($data);

        return $this->created($breakTime);
    }

    /**
     * PUT /api/break-times/{id}/end
     * 休憩終了
     */
    public function end(int $id, Request $request): JsonResponse
    {
        $data = $request->validate([
            'break_end_at' => ['required', 'date'],
        ]);

        $breakTime = $this->breakTimeService->endBreak($id, $data);

        return $this->ok($breakTime);
    }

    /**
     * GET /api/attendances/{attendanceId}/break-times
     * 勤怠に紐づく休憩一覧
     */
    public function indexByAttendance(int $attendanceId): JsonResponse
    {
        $breakTimes = $this->breakTimeService->getByAttendance($attendanceId);

        return $this->ok($breakTimes);
    }
}
