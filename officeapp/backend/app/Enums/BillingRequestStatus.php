<?php

namespace App\Enums;

use Illuminate\Validation\Rules\Enum as EnumRule;

enum BillingRequestStatus: string
{
    case DRAFT = 'draft';
    case SUBMITTED = 'submitted';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';

    /**
     * validation 用
     */
    public static function rule(): EnumRule
    {
        return new EnumRule(self::class);
    }
}
