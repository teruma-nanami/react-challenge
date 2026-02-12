<?php

namespace App\Services;

use App\Models\DateRequest;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class DateRequestService
{
    /**
     * 午前/午後の境界時刻（運用で固定）
     * 例: 12:00 を境に、午前(am) / 午後(pm)
     */
    private const AM_PM_BORDER_HOUR = 12;

    /**
     * staff: 休日申請作成（pending）
     * - 過去日不可
     * - start_date <= end_date
     * - approved/pending の重複（同一日が被る申請）を禁止
     */
    public function create(
        int $userId,
        string $startDate, // 'Y-m-d'
        string $endDate,   // 'Y-m-d'
        string $session,   // full/am/pm
        string $reason
    ): DateRequest {
        $session = $this->normalizeSession($session);

        $start = CarbonImmutable::parse($startDate)->startOfDay();
        $end   = CarbonImmutable::parse($endDate)->startOfDay();

        if ($start->gt($end)) {
            abort(422, 'start_date must be less than or equal to end_date');
        }

        $today = CarbonImmutable::today();
        if ($start->lt($today)) {
            abort(422, 'Past date request is not allowed');
        }

        // 同一ユーザーの approved/pending の日付範囲重複を禁止（MVP）
        $overlapExists = DateRequest::query()
            ->where('user_id', $userId)
            ->whereIn('status', ['pending', 'approved'])
            ->where(function ($q) use ($start, $end) {
                // (existing.start <= new.end) AND (existing.end >= new.start)
                $q->whereDate('start_date', '<=', $end->toDateString())
                    ->whereDate('end_date', '>=', $start->toDateString());
            })
            ->exists();

        if ($overlapExists) {
            abort(409, 'Date request overlaps with existing request');
        }

        return DateRequest::create([
            'user_id'         => $userId,
            'start_date'      => $start->toDateString(),
            'end_date'        => $end->toDateString(),
            'session'         => $session,
            'reason'          => $reason,
            'status'          => 'pending',
            'rejected_reason' => null,
        ]);
    }

    /**
     * staff: 自分の申請一覧
     */
    public function listMine(int $userId): Collection
    {
        return DateRequest::query()
            ->where('user_id', $userId)
            ->orderByDesc('created_at')
            ->get();
    }

    /**
     * admin: pending一覧
     */
    public function listPending(): Collection
    {
        return DateRequest::query()
            ->where('status', 'pending')
            ->orderBy('created_at')
            ->get();
    }

    /**
     * admin: 承認
     */
    public function approve(DateRequest $req): DateRequest
    {
        if ($req->status !== 'pending') {
            abort(409, 'Only pending requests can be approved');
        }

        return DB::transaction(function () use ($req) {
            // 承認済み範囲が他のapprovedと被るのは避ける（安全側）
            $overlapApproved = DateRequest::query()
                ->where('user_id', $req->user_id)
                ->where('status', 'approved')
                ->where('id', '!=', $req->id)
                ->where(function ($q) use ($req) {
                    $q->whereDate('start_date', '<=', $req->end_date)
                        ->whereDate('end_date', '>=', $req->start_date);
                })
                ->exists();

            if ($overlapApproved) {
                abort(409, 'Approved request overlaps with existing approved request');
            }

            $req->status = 'approved';
            $req->rejected_reason = null;
            $req->save();

            return $req;
        });
    }

    /**
     * admin: 却下
     */
    public function reject(DateRequest $req, string $rejectedReason): DateRequest
    {
        if ($req->status !== 'pending') {
            abort(409, 'Only pending requests can be rejected');
        }

        if (trim($rejectedReason) === '') {
            abort(422, 'rejected_reason is required');
        }

        $req->status = 'rejected';
        $req->rejected_reason = $rejectedReason;
        $req->save();

        return $req;
    }

    /**
     * 打刻ガード用：
     * 指定ユーザーが指定日時に「休暇扱い」なら true
     * - full: 終日 true
     * - am: 境界より前なら true
     * - pm: 境界以降なら true
     */
    public function isLeaveAt(int $userId, \DateTimeInterface $at): bool
    {
        $dt = CarbonImmutable::instance($at);
        $date = $dt->toDateString();

        $approved = DateRequest::query()
            ->where('user_id', $userId)
            ->where('status', 'approved')
            ->whereDate('start_date', '<=', $date)
            ->whereDate('end_date', '>=', $date)
            ->orderByDesc('created_at')
            ->first();

        if (!$approved) {
            return false;
        }

        $session = $this->normalizeSession((string)$approved->session);

        if ($session === 'full') {
            return true;
        }

        $border = $dt->setTime(self::AM_PM_BORDER_HOUR, 0, 0);

        if ($session === 'am') {
            return $dt->lt($border);
        }

        // pm
        return $dt->gte($border);
    }

    private function normalizeSession(string $session): string
    {
        $s = strtolower(trim($session));

        if (!in_array($s, ['full', 'am', 'pm'], true)) {
            abort(422, 'Invalid session');
        }

        return $s;
    }
}
