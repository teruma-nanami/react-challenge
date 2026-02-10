<?php

namespace App\Http\Controllers\Api;

use App\Models\Attendance;
use App\Models\TimeRequest;
use Illuminate\Http\Request;

class TimeRequestController extends ApiController
{
    /**
     * POST /api/attendances/{attendanceId}/time-requests
     * - staff: 自分の勤怠のみ申請OK
     * - admin: 全員の勤怠に対して申請OK
     */
    public function store(Request $request, int $attendanceId)
    {
        $me = $this->currentUser($request);
        $role = (string) ($me->role ?? 'staff');
        $isAdmin = ($role === 'admin');

        $validated = $request->validate([
            'requested_check_in_at'  => ['required', 'date'],
            'requested_check_out_at' => ['required', 'date'],
            'reason'                 => ['required', 'string', 'max:2000'],
        ]);

        $attendance = Attendance::find($attendanceId);
        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        // staff は「自分の勤怠だけ」。admin は全員OK。
        if (!$isAdmin && (int) $attendance->user_id !== (int) $me->id) {
            return response()->json([
                'message' => 'You can only request edits for your own attendance',
            ], 403);
        }

        $timeRequest = TimeRequest::create([
            'attendance_id'          => (int) $attendance->id,
            'user_id'                => (int) $attendance->user_id,
            'requested_check_in_at'  => $validated['requested_check_in_at'],
            'requested_check_out_at' => $validated['requested_check_out_at'],
            'reason'                 => $validated['reason'],
            'status'                 => 'pending',
            'rejected_reason'        => null,
        ]);

        return response()->json($timeRequest, 201);
    }
}
