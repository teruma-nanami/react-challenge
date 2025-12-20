<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EntryWebController extends Controller
{
  public function index()
  {
    return view('entries.index');
  }

  public function create()
  {
    return view('entries.create');
  }

  public function edit($id)
  {
    return view('entries.edit', ['id' => $id]);
  }

  public function detailModal($id)
  {
    return view('entries.detail_modal', ['id' => $id]);
  }

  public function categorySummary()
  {
    return view('entries.category_summary');
  }

  public function recurring()
  {
    return view('entries.recurring');
  }

  public function capitalized()
  {
    return view('entries.capitalized');
  }
}
