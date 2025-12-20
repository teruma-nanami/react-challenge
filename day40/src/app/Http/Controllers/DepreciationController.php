<?php

namespace App\Http\Controllers;

class DepreciationController extends Controller
{
  public function assetsList()
  {
    return view('depreciation.assets_list');
  }

  public function wizard()
  {
    return view('depreciation.wizard');
  }
}
