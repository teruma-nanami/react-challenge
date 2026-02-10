<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\TimeRequest;
use App\Services\TimeRequestService;
use Illuminate\Http\Request;

class TimeRequestController extends Controller
{
    private TimeRequestService $timeRequestService;

    public function __construct(TimeRequestService $timeRequestService)
    {
        $this->timeRequestService = $timeRequestService;
    }

    /**
     * GET /api/time-requests
     * staff: 自分の時刻修正申請一覧
     */
    public function index(Request $request)
    {
        $userId = (int) $request->user()->id;

        $items = $this->timeRequestService->listMine($userId);

        return response()->json($items);
    }

    /**
     * POST /api/attendances/{attendance}/time-requests
     * staff: 勤怠詳細から時刻修正申請作成（pending）
     */
    public function storeForAttendance(Request $request, Attendance $attendance)
    {
        $userId = (int) $request->user()->id;

        $validated = $request->validate([
            'requested_check_in_at'  => ['required', 'date'],
            'requested_check_out_at' => ['required', 'date'],
            'reason'                 => ['required', 'string'],
        ]);

        $item = $this->timeRequestService->create(
            $userId,
            $attendance,
            $validated['requested_check_in_at'],
            $validated['requested_check_out_at'],
            $validated['reason']
        );

        return response()->json($item, 201);
    }

    /**
     * GET /api/time-requests/{timeRequest}
     * staff: 自分の申請詳細
     */
    public function show(Request $request, TimeRequest $timeRequest)
    {
        $userId = (int) $request->user()->id;

        if ((int)$timeRequest->user_id !== $userId) {
            abort(403, 'Forbidden');
        }

        return response()->json($timeRequest);
    }
}
