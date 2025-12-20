<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SetupController extends Controller
{
  public function initial()
  {
    return view('setup.initial_setup');
  }
}
