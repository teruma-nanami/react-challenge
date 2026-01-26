<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // 今はAuth0のガードは後で（まず動かす）
    }

    public function rules(): array
    {
        return [
            'status' => ['sometimes', 'in:new,in_progress,closed'],
            'assigned_user_id' => ['sometimes', 'nullable', 'integer', 'exists:users,id'],
            'internal_note' => ['sometimes', 'nullable', 'string', 'max:5000'],
        ];
    }
}