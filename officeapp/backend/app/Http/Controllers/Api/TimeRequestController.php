<?php

namespace App\Http\Controllers\Api;

use App\Models\Attendance;
use App\Models\TimeRequest;
use Illuminate\Http\Request;

class TimeRequestController extends ApiController
{
    /**
     * GET /api/time-requests
     * 自分の時刻修正申請一覧
     */
    public function index(Request $request)
    {
        $user = $this->currentUser($request);

        $items = TimeRequest::query()
            ->where('user_id', (int)$user->id)
            ->orderByDesc('id')
            ->limit(200)
            ->get();

        return response()->json($items);
    }

    /**
     * POST /api/attendances/{attendanceId}/time-requests
     * 勤怠時刻の修正申請（申請＝レコード作成）
     */
    public function store(Request $request, int $attendanceId)
    {
        $user = $this->currentUser($request);

        // 対象勤怠が「自分のもの」かチェック
        $attendance = Attendance::query()->findOrFail($attendanceId);
        if ((int)$attendance->user_id !== (int)$user->id) {
            abort(403, 'You can only request edits for your own attendance');
        }

        $validated = $request->validate([
            'requested_check_in_at'  => ['required', 'date'],
            'requested_check_out_at' => ['nullable', 'date'],
            'reason'                 => ['required', 'string', 'max:1000'],
        ]);

        $timeRequest = TimeRequest::create([
            'user_id'                => (int)$user->id,
            'attendance_id'          => (int)$attendance->id,
            'requested_check_in_at'  => $validated['requested_check_in_at'],
            'requested_check_out_at' => $validated['requested_check_out_at'] ?? null,
            'reason'                 => $validated['reason'],
            'status'                 => 'pending',
            'reject_reason'          => null,
        ]);

        return response()->json($timeRequest, 201);
    }
}
