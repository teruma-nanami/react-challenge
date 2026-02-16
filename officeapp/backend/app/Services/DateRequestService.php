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
     *
     * 前提：
     * - start_date / end_date / session / reason は Controller/FormRequest 側でバリデーション済み
     *   （start_date <= end_date / 過去日不可 / session は full|am|pm / reason 必須 など）
     *
     * Service側では「DB状態に依存するルール」だけを守る。
     * - approved/pending の重複（同一日が被る申請）を禁止
     */
    public function create(
        int $userId,
        string $startDate, // 'Y-m-d' 想定
        string $endDate,   // 'Y-m-d' 想定
        string $session,   // full/am/pm 想定
        string $reason
    ): DateRequest {
        $start = CarbonImmutable::parse($startDate)->toDateString();
        $end   = CarbonImmutable::parse($endDate)->toDateString();

        $session = strtolower(trim($session));
        $reason  = trim($reason);

        return DB::transaction(function () use ($userId, $start, $end, $session, $reason) {
            $overlapExists = DateRequest::query()
                ->where('user_id', $userId)
                ->whereIn('status', ['pending', 'approved'])
                ->whereDate('start_date', '<=', $end)
                ->whereDate('end_date', '>=', $start)
                ->lockForUpdate()
                ->exists();

            if ($overlapExists) {
                // これは「DB状態」によって決まる衝突なので Service に残す価値がある。
                // HTTP 表現（409にする等）は Controller で握る。
                throw new \RuntimeException('Date request overlaps with existing request', 409);
            }

            return DateRequest::create([
                'user_id'         => $userId,
                'start_date'      => $start,
                'end_date'        => $end,
                'session'         => $session,
                'reason'          => $reason,
                'status'          => 'pending',
                'rejected_reason' => null,
            ]);
        });
    }

    /**
     * staff: 自分の申請一覧
     */
    public function listMine(int $userId): Collection
    {
        return DateRequest::query()
            ->where('user_id', $userId)
            ->orderByDesc('id')
            ->limit(200)
            ->get();
    }

    /**
     * 打刻ガード用：
     * 指定ユーザーが指定日時に「休暇扱い」なら true
     *
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
            ->orderByDesc('id')
            ->first();

        if (!$approved) {
            return false;
        }

        $session = $this->normalizeSession((string) $approved->session);
        if ($session === null) {
            // DBに未知の値が入っている等の異常系。
            // ここで例外を投げて全体を壊すより、「休暇扱いにしない」で安全に倒す。
            return false;
        }

        if ($session === 'full') {
            return true;
        }

        $border = $dt->setTime(self::AM_PM_BORDER_HOUR, 0, 0);

        if ($session === 'am') {
            return $dt->lt($border);
        }

        return $dt->gte($border);
    }

    /**
     * DB値の防御用。正常なら full/am/pm を返す。
     * 異常なら null。
     */
    private function normalizeSession(string $session): ?string
    {
        $s = strtolower(trim($session));

        if ($s === 'full' || $s === 'am' || $s === 'pm') {
            return $s;
        }

        return null;
    }
}
