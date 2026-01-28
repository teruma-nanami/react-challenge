<?php

namespace App\Enums;

use Illuminate\Validation\Rules\Enum as EnumRule;

enum InventoryTransactionType: string
{
    case IN = 'in';
    case OUT = 'out';

    /**
     * FormRequest 用 validation rule
     */
    public static function validationRule(): EnumRule
    {
        return new EnumRule(self::class);
    }

    /**
     * 在庫数にどう影響するか
     * +1: 入庫
     * -1: 出庫
     */
    public function direction(): int
    {
        return match ($this) {
            self::IN => 1,
            self::OUT => -1,
        };
    }
}
