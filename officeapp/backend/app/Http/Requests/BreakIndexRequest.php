<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BreakIndexRequest extends FormRequest
{
    /**
     * 認可
     * ※ Auth0 ユーザー認可は Controller / Service 側で行う前提
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * バリデーションルール
     */
    public function rules(): array
    {
        return [
            // ルートパラメータ {attendanceId} 用
            'attendanceId' => ['required', 'integer', 'exists:attendances,id'],
        ];
    }

    /**
     * ルートパラメータを validation 対象に含める
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'attendanceId' => $this->route('attendanceId'),
        ]);
    }
}
