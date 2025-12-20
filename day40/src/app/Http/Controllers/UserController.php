<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\UserService;
use App\Models\UserProfile;

class UserController extends Controller
{
  protected $service;

  // コンストラクタで service を注入
  public function __construct(UserService $service)
  {
    $this->service = $service;
  }

  /**
   * プロフィール設定ページ表示
   */
  public function showProfile()
  {
    return view('profile.index', [
      'profile' => Auth::user()->userProfile,
    ]);
  }

  /**
   * プロフィール更新
   */
  public function updateProfile(Request $request)
  {
    $request->validate([
      'business_name' => 'nullable|string|max:255',
      'invoice_enabled' => 'boolean',
      'invoice_number' => 'nullable|string|max:20|required_if:invoice_enabled,1',
    ]);

    $this->service->updateProfile($request->all());

    return back()->with('success', 'プロフィールを更新しました。');
  }
}