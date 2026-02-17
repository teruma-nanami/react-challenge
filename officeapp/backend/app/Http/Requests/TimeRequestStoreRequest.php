<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class TimeRequestStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'requested_check_in_at'  => ['required', 'date'],
            'requested_check_out_at' => ['nullable', 'date'],
            'reason'                 => ['required', 'string', 'max:1000'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $v) {
            $in = $this->input('requested_check_in_at');
            $out = $this->input('requested_check_out_at');

            if ($in && $out) {
                $inTs = strtotime((string) $in);
                $outTs = strtotime((string) $out);

                if ($inTs !== false && $outTs !== false && $inTs >= $outTs) {
                    $v->errors()->add('requested_check_out_at', '退勤（修正後）は出勤（修正後）より後である必要があります。');
                }
            }
        });
    }
}
