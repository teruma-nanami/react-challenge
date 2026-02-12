<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\BreakIndexRequest;
use App\Http\Requests\BreakStartRequest;
use App\Http\Requests\BreakEndRequest;
use App\Models\Attendance;
use App\Services\BreakTimeService;
use Carbon\Carbon;
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
        $validated = $request->validated();

        $attendanceId = (int)($validated['attendance_id'] ?? 0);
        $attendance = Attendance::find($attendanceId);

        if (!$attendance) {
            abort(404, 'Attendance not found.');
        }

        $now = Carbon::parse((string)$validated['break_start_at']);

        $breakTime = $this->breakTimeService->startBreak($attendance, $now);

        return $this->created($breakTime);
    }

    /**
     * PUT /api/break-times/{id}/end
     * 休憩終了
     */
    public function end(int $id, BreakEndRequest $request): JsonResponse
    {
        $validated = $request->validated();

        // ★ 第2引数は Carbon が必須
        $now = Carbon::parse((string)$validated['break_end_at']);

        $breakTime = $this->breakTimeService->endBreak($id, $now);

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
