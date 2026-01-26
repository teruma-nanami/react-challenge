<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Support\Collection;

class AdminService
{
    /**
     * お問い合わせ一覧取得（検索/フィルタ対応）
     */
    public function getContacts(?string $status, ?string $category, ?string $keyword): Collection
    {
        $query = Contact::query()->orderBy('created_at', 'desc');

        // ステータス絞り込み
        if ($status) {
            $query->where('status', $status);
        }

        // カテゴリ絞り込み
        if ($category) {
            $query->where('category', $category);
        }

        // キーワード検索（name/email/subject/message）
        if ($keyword) {
            $query->where(function ($q) use ($keyword) {
                $q->where('name', 'like', "%{$keyword}%")
                  ->orWhere('email', 'like', "%{$keyword}%")
                  ->orWhere('subject', 'like', "%{$keyword}%")
                  ->orWhere('message', 'like', "%{$keyword}%");
            });
        }

        return $query->get();
    }

    /**
     * お問い合わせ詳細取得
     */
    public function getContactById(int $id): Contact
    {
        return Contact::findOrFail($id);
    }

    /**
     * お問い合わせ更新（status/担当/メモ）
     */
    public function updateContact(int $id, array $data): Contact
    {
        $contact = Contact::findOrFail($id);

        $contact->update([
            'status' => $data['status'] ?? $contact->status,

            // null を明示的に入れたいケースがあるので array_key_exists が大事
            'assigned_user_id' => array_key_exists('assigned_user_id', $data)
                ? $data['assigned_user_id']
                : $contact->assigned_user_id,

            'internal_note' => array_key_exists('internal_note', $data)
                ? $data['internal_note']
                : $contact->internal_note,
        ]);

        return $contact;
    }
}