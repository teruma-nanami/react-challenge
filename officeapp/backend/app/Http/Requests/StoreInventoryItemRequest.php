<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInventoryItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        // 認可は middleware / policy 側で制御する前提
        return true;
    }

    public function rules(): array
    {
        return [
            'sku' => ['nullable', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'quantity' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
