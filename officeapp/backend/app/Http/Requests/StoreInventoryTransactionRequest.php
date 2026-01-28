<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\InventoryTransactionType;

class StoreInventoryTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        // 認可は middleware / policy 側で制御する前提
        return true;
    }

    public function rules(): array
    {
        return [
            'inventory_item_id' => [
                'required',
                'integer',
                'exists:inventory_items,id',
            ],

            // Auth0導入後は Controller / Service 側で注入予定
            'user_id' => [
                'nullable',
                'integer',
                'exists:users,id',
            ],

            'type' => [
                'required',
                InventoryTransactionType::validationRule(),
            ],

            'quantity' => [
                'required',
                'integer',
                'min:1',
            ],

            'note' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ];
    }
}
