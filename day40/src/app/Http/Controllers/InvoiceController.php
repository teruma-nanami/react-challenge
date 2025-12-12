<?php

namespace App\Http\Controllers;

class InvoiceController extends Controller
{
  public function dashboard()
  {
    return view('invoice.dashboard');
  }

  public function entries()
  {
    return view('invoice.entries');
  }
}
