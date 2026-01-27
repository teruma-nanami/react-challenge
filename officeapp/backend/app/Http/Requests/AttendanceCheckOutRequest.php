<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AttendanceCheckOutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'ユーザーIDが指定されていません。',
            'user_id.integer'  => 'ユーザーIDが不正です。',
            'user_id.min'      => 'ユーザーIDが不正です。',
        ];
    }

    public function userId(): int
    {
        return (int) $this->input('user_id');
    }
}
