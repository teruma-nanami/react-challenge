<?php

namespace App\Http\Controllers;

class SettingsController extends Controller
{
  public function profile()
  {
    return view('settings.profile');
  }

  public function ledgerStatus()
  {
    return view('settings.ledger_status');
  }
}