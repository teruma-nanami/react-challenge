<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BreakStartRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'attendance_id'  => ['required', 'integer', 'exists:attendances,id'],
            'break_start_at' => ['required', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'attendance_id.required' => '勤怠IDは必須です。',
            'attendance_id.exists'   => '対象の勤怠が存在しません。',
            'break_start_at.required' => '休憩開始時刻は必須です。',
            'break_start_at.date'    => '休憩開始時刻の形式が不正です。',
        ];
    }
}
