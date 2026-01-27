<?php

namespace App\Services;

use App\Models\BillingRequest;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class BillingRequestService
{
    /**
     * ユーザー別 稟議一覧取得
     */
    public function getByUser(int $userId)
    {
        return BillingRequest::query()
            ->where('user_id', $userId)
            ->orderByDesc('id')
            ->get();
    }

    /**
     * 稟議作成
     */
    public function create(array $data): BillingRequest
    {
        return DB::transaction(function () use ($data) {
            // 金額は必須・正数
            if ($data['amount'] <= 0) {
                throw new InvalidArgumentException('Amount must be greater than 0.');
            }

            return BillingRequest::create([
                'user_id'          => $data['user_id'],
                'title'            => $data['title'],
                'reason'           => $data['reason'] ?? null,
                'amount'           => $data['amount'],
                'vendor_name'      => $data['vendor_name'] ?? null,
                'billing_date'     => $data['billing_date'] ?? null,
                'payment_due_date' => $data['payment_due_date'] ?? null,
                // 承認フロー未実装なので status は仮固定
                'status'           => 'draft',
            ]);
        });
    }

    /**
     * 稟議詳細取得
     */
    public function find(int $id): ?BillingRequest
    {
        return BillingRequest::find($id);
    }
}
