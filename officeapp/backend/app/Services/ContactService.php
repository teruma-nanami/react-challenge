<?php

namespace App\Services;

use App\Models\Contact;

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
}