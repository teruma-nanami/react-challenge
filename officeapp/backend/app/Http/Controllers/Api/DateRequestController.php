<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DateRequest;
use App\Services\DateRequestService;
use Illuminate\Http\Request;

class DateRequestController extends Controller
{
    private DateRequestService $dateRequestService;

    public function __construct(DateRequestService $dateRequestService)
    {
        $this->dateRequestService = $dateRequestService;
    }

    /**
     * GET /api/date-requests
     * staff: 自分の休日申請一覧
     */
    public function index(Request $request)
    {
        $userId = (int) $request->user()->id;

        $items = $this->dateRequestService->listMine($userId);

        return response()->json($items);
    }

    /**
     * POST /api/date-requests
     * staff: 休日申請作成（pending）
     */
    public function store(Request $request)
    {
        $userId = (int) $request->user()->id;

        $validated = $request->validate([
            'start_date' => ['required', 'date'],
            'end_date'   => ['required', 'date'],
            'session'    => ['required', 'string'], // full/am/pm は Service で正規化
            'reason'     => ['required', 'string'],
        ]);

        $item = $this->dateRequestService->create(
            $userId,
            $validated['start_date'],
            $validated['end_date'],
            $validated['session'],
            $validated['reason']
        );

        return response()->json($item, 201);
    }

    /**
     * GET /api/date-requests/{dateRequest}
     * staff: 自分の申請詳細
     */
    public function show(Request $request, DateRequest $dateRequest)
    {
        $userId = (int) $request->user()->id;

        if ((int)$dateRequest->user_id !== $userId) {
            abort(403, 'Forbidden');
        }

        return response()->json($dateRequest);
    }
}
