<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Builder;

class ContactService
{
    /**
     * お問い合わせ作成（公開）
     */
    public function createContact(array $data): Contact
    {
        return Contact::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'subject'  => $data['subject'],
            'message'  => $data['message'],
            'category' => $data['category'],
            'status'   => 'new',
        ]);
    }

    /**
     * お問い合わせ一覧用のクエリを構築
     * ※ paginate / get / count は Controller 側で行う
     */
    public function baseQuery(): Builder
    {
        return Contact::query();
    }

    public function applyFilters(
        Builder $query,
        ?string $status,
        ?string $category,
        ?string $keyword
    ): Builder {
        if ($status) {
            $query->where('status', $status);
        }

        if ($category) {
            $query->where('category', $category);
        }

        if ($keyword) {
            $query->where(function ($q) use ($keyword) {
                $q->where('name', 'like', "%{$keyword}%")
                    ->orWhere('email', 'like', "%{$keyword}%")
                    ->orWhere('subject', 'like', "%{$keyword}%")
                    ->orWhere('message', 'like', "%{$keyword}%");
            });
        }

        return $query;
    }

    /**
     * お問い合わせ更新
     */
    public function updateContact(int $id, array $data): Contact
    {
        $contact = Contact::findOrFail($id);

        $updatable = [
            'status',
            'assigned_user_id',
            'internal_note',
        ];

        $payload = [];

        foreach ($updatable as $field) {
            if (array_key_exists($field, $data)) {
                $payload[$field] = $data[$field];
            }
        }

        if ($payload !== []) {
            $contact->update($payload);
        }

        return $contact;
    }
}
