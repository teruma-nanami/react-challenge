<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBillingRequest extends FormRequest
{
    public function authorize(): bool
    {
        // 今は Auth0 未導入なので true
        // 導入後は $this->user() === null などで制御
        return true;
    }

    public function rules(): array
    {
        return [
            // 'user_id' => ['required', 'integer', 'exists:users,id'],
            'title'   => ['required', 'string', 'max:255'],
            'amount'  => ['required', 'integer', 'min:1'],
            'reason'  => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => '申請者が不明です。',
            'title.required'   => 'タイトルは必須です。',
            'amount.required'  => '金額は必須です。',
            'reason.required'  => '申請理由は必須です。',
        ];
    }
}
