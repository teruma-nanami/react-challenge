<?php

namespace App\Http\Controllers\Api;

use App\Models\Attendance;
use App\Services\AttendanceService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendanceController extends ApiController
{
    private AttendanceService $attendanceService;

    public function __construct(AttendanceService $attendanceService)
    {
        $this->attendanceService = $attendanceService;
    }

    /**
     * GET /api/attendances
     * - staff: 自分の勤怠一覧
     * - admin: 全員の勤怠一覧
     * - クエリ無しなら最新30件
     * - 任意で from/to (YYYY-MM-DD) を受けて絞り込み
     */
    public function index(Request $request)
    {
        $user = $this->currentUser($request);

        $q = Attendance::query();

        // staff は自分だけ。admin は全員。
        if (($user->role ?? null) !== 'admin') {
            $q->where('user_id', (int) $user->id);
        }

        $from = $request->query('from'); // YYYY-MM-DD
        $to   = $request->query('to');   // YYYY-MM-DD

        if ($from) {
            $q->where('work_date', '>=', $from);
        }
        if ($to) {
            $q->where('work_date', '<=', $to);
        }

        // デフォルトは最新30件
        if (!$from && !$to) {
            $q->orderByDesc('work_date')->orderByDesc('id')->limit(30);
        } else {
            $q->orderByDesc('work_date')->orderByDesc('id');
        }

        return response()->json($q->get());
    }

    /**
     * POST /api/attendances/check-in
     */
    public function checkIn(Request $request)
    {
        $user = $this->currentUser($request);

        $now = Carbon::now();
        $attendance = $this->attendanceService->checkIn((int)$user->id, $now);

        return response()->json($attendance, 201);
    }

    /**
     * POST /api/attendances/check-out
     */
    public function checkOut(Request $request)
    {
        $user = $this->currentUser($request);

        $now = Carbon::now();
        $attendance = $this->attendanceService->checkOut((int)$user->id, $now);

        return response()->json($attendance);
    }

    /**
     * GET /api/attendances/today
     */
    public function today(Request $request)
    {
        $user = $this->currentUser($request);

        $now = Carbon::now();
        $attendance = $this->attendanceService->getTodayAttendance((int)$user->id, $now);

        return response()->json($attendance);
    }
}
