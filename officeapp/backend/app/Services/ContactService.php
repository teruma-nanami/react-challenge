<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Support\Collection;

class ContactService
{
    public function createContact(array $data): Contact
    {
        return Contact::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'subject' => $data['subject'],
            'message' => $data['message'],
            'category' => $data['category'],
            'status' => 'new',
        ]);
    }

    public function getContacts(?string $status, ?string $category, ?string $keyword): Collection
    {
        $query = Contact::query()->orderBy('created_at', 'desc');

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

        return $query->get();
    }

    public function updateContact(int $id, array $data): Contact
    {
        $contact = Contact::findOrFail($id);

        $contact->update([
            'status' => $data['status'] ?? $contact->status,
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
