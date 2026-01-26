<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'min:1'],
            'description' => ['nullable', 'string'],
            'status'      => ['nullable', 'string', Rule::in(['todo', 'in_progress', 'done'])],
            'due_date'    => ['nullable', 'date'],
        ];
    }
}