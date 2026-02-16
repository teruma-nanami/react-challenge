<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DateRequestStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        // 認証は auth0 ミドルウェアで担保される前提。
        // ここでは true でOK。
        return true;
    }

    public function rules(): array
    {
        return [
            // フロントは YYYY-MM-DD を送る想定だが、Laravelの date は広く許容する。
            // 厳密にしたい場合は date_format:Y-m-d へ変更。
            'start_date' => ['required', 'date'],
            'end_date'   => ['required', 'date', 'after_or_equal:start_date'],

            // 仕様上は full/am/pm のみを許容
            'session'    => ['required', 'string', Rule::in(['full', 'am', 'pm'])],

            // 例：1000 は一旦妥当な上限。必要なら調整
            'reason'     => ['required', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'end_date.after_or_equal' => 'end_date must be after or equal to start_date',
            'session.in'              => 'session must be one of: full, am, pm',
        ];
    }
}
