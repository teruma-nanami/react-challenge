<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserProfile;
use App\Models\Ledger;
use Illuminate\Support\Facades\Auth;

class UserService
{
  /**
   * 指定ユーザーの当年度台帳が存在しなければ作成する
   */
  public function ensureLedgerExists(User $user)
  {
    $year = now()->year;

    Ledger::firstOrCreate(
      [
        'user_id' => $user->id,
        'fiscal_year' => $year,
      ],
      [
        'status' => 'Draft',
      ]
    );

    // プロフィールも念のため作成（初回ログイン時に必要）
    UserProfile::firstOrCreate(
      ['user_id' => $user->id],
      [
        'business_name'   => null,
        'invoice_enabled' => false,
        'invoice_number'  => null,
        'first_login'     => false,
      ]
    );
  }


  /**
   * プロフィール更新
   */
  public function updateProfile(array $data)
  {
    $user = Auth::user();

    UserProfile::updateOrCreate(
      ['user_id' => $user->id],
      [
        'business_name'   => $data['business_name'] ?? null,
        'invoice_enabled' => $data['invoice_enabled'] ?? false,
        'invoice_number'  => $data['invoice_number'] ?? null,
      ]
    );
  }
}