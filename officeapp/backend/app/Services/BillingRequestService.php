<?php

namespace App\Services;

use App\Models\BillingRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class BillingRequestService
{
    /**
     * 稟議一覧取得用のベースクエリ
     * Controller 側で order / paginate を決める前提
     */
    public function baseQueryByUser(int $userId): Builder
    {
        return BillingRequest::query()
            ->where('user_id', $userId);
    }

    /**
     * 稟議作成
     */
    public function create(array $data): BillingRequest
    {
        return DB::transaction(function () use ($data) {
            return BillingRequest::create([
                'user_id'          => $data['user_id'],
                'title'            => $data['title'],
                'reason'           => $data['reason'] ?? null,
                'amount'           => $data['amount'],
                'vendor_name'      => $data['vendor_name'] ?? null,
                'billing_date'     => $data['billing_date'] ?? null,
                'payment_due_date' => $data['payment_due_date'] ?? null,
                // 承認フロー未実装のため draft 固定
                'status'           => 'draft',
            ]);
        });
    }

    /**
     * 稟議詳細取得（ユーザー境界を必ず守る）
     */
    public function findByUser(int $id, int $userId): BillingRequest
    {
        return BillingRequest::where('id', $id)
            ->where('user_id', $userId)
            ->firstOrFail();
    }

    /**
     * 稟議削除（提出前想定）
     */
    public function deleteByUser(int $id, int $userId): void
    {
        $billing = $this->findByUser($id, $userId);

        $billing->delete();
    }
}
