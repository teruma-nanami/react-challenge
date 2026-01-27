<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AttendanceCheckInRequest extends FormRequest
{
    public function authorize(): bool
    {
        // 認証は ApiController 側で担保する前提
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

    /**
     * Controller から使うためのアクセサ
     * （後で Auth0 に差し替えやすくするため）
     */
    public function userId(): int
    {
        return (int) $this->input('user_id');
    }
}
