<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        // 認可は後で middleware / policy に移す
        return true;
    }

    public function rules(): array
    {
        return [
            'display_name' => ['nullable', 'string', 'max:255'],
            'email'        => ['sometimes', 'email', 'max:255'],
            'role'         => ['sometimes', 'string', 'max:50'],
        ];
    }
}
