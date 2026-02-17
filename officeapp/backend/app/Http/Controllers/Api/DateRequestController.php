<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\DateRequestStoreRequest;
use App\Models\DateRequest;
use App\Services\DateRequestService;
use Illuminate\Http\Request;

class DateRequestController extends ApiController
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
        $user = $this->currentUser($request);

        $items = $this->dateRequestService->listMine((int) $user->id);

        return response()->json($items);
    }

    /**
     * POST /api/date-requests
     * staff: 休日申請作成（pending）
     */
    public function store(DateRequestStoreRequest $request)
    {
        $user = $this->currentUser($request);

        $validated = $request->validated();

        $item = $this->dateRequestService->create(
            (int) $user->id,
            (string) $validated['start_date'],
            (string) $validated['end_date'],
            (string) $validated['session'],
            (string) $validated['reason']
        );

        return response()->json($item, 201);
    }

    /**
     * GET /api/date-requests/{dateRequest}
     * staff: 自分の申請詳細
     */
    public function show(Request $request, DateRequest $dateRequest)
    {
        $user = $this->currentUser($request);

        if ((int) $dateRequest->user_id !== (int) $user->id) {
            abort(403, 'Forbidden');
        }

        return response()->json($dateRequest);
    }
}
