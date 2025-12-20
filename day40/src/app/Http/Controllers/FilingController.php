<?php

namespace App\Http\Controllers;

class FilingController extends Controller
{
  public function annualSummary()
  {
    return view('filing.annual_summary');
  }

  public function deductionInput()
  {
    return view('filing.deduction_input');
  }

  public function entriesSummary()
  {
    return view('filing.entries_summary');
  }

  public function preview()
  {
    return view('filing.preview');
  }

  public function pdfDownload()
  {
    return view('filing.pdf_download');
  }
}
