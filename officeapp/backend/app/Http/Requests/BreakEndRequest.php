<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BreakEndRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'break_end_at' => ['required', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'break_end_at.required' => '休憩終了時刻は必須です。',
            'break_end_at.date'     => '休憩終了時刻の形式が不正です。',
        ];
    }
}
