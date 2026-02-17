<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\TimeRequestStoreRequest;
use App\Models\Attendance;
use App\Services\TimeRequestService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TimeRequestController extends ApiController
{
    private TimeRequestService $timeRequestService;

    public function __construct(TimeRequestService $timeRequestService)
    {
        $this->timeRequestService = $timeRequestService;
    }

    /**
     * GET /api/time-requests
     * 自分の時刻修正申請一覧
     */
    public function index(Request $request)
    {
        $user = $this->currentUser($request);

        $items = $this->timeRequestService->listMine((int) $user->id);

        return response()->json($items);
    }

    /**
     * POST /api/attendances/{attendanceId}/time-requests
     * 勤怠時刻の修正申請（申請＝レコード作成）
     */
    public function store(TimeRequestStoreRequest $request, int $attendanceId)
    {
        $user = $this->currentUser($request);
        $validated = $request->validated();

        // 存在確認
        $attendance = Attendance::query()->findOrFail($attendanceId);

        // 所有者確認（Serviceの前提を満たす）
        if ((int) $attendance->user_id !== (int) $user->id) {
            abort(Response::HTTP_FORBIDDEN, 'You can only request edits for your own attendance');
        }

        try {
            $created = $this->timeRequestService->create(
                (int) $user->id,
                $attendance,
                (string) $validated['requested_check_in_at'],
                $validated['requested_check_out_at'] ?? null,
                (string) $validated['reason']
            );

            return response()->json($created, Response::HTTP_CREATED);
        } catch (\RuntimeException $e) {
            // Service側が投げるのは「同一attendanceにpendingが既にある」= 競合扱い
            abort(Response::HTTP_CONFLICT, $e->getMessage());
        }
    }
}
