<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\BreakIndexRequest;
use App\Http\Requests\BreakStartRequest;
use App\Http\Requests\BreakEndRequest;
use App\Services\BreakTimeService;
use Illuminate\Http\JsonResponse;

class BreakTimeController extends ApiController
{
    public function __construct(
        private BreakTimeService $breakTimeService
    ) {}

    /**
     * POST /api/break-times/start
     * 休憩開始
     */
    public function start(BreakStartRequest $request): JsonResponse
    {
        $breakTime = $this->breakTimeService->startBreak(
            $request->validated()
        );

        return $this->created($breakTime);
    }

    /**
     * PUT /api/break-times/{id}/end
     * 休憩終了
     */
    public function end(int $id, BreakEndRequest $request): JsonResponse
    {
        $breakTime = $this->breakTimeService->endBreak(
            $id,
            $request->validated()
        );

        return $this->ok($breakTime);
    }

    /**
     * GET /api/attendances/{attendanceId}/break-times
     * 勤怠に紐づく休憩一覧
     */
    public function indexByAttendance(
        BreakIndexRequest $request,
        int $attendanceId
    ): JsonResponse {
        $breakTimes = $this->breakTimeService->getByAttendance($attendanceId);

        return $this->ok($breakTimes);
    }
}
