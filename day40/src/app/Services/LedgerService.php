<?php

namespace App\Services;

use App\Models\Ledger;

class LedgerService
{
  public function list()
  {
    return Ledger::all();
  }

  public function get($id)
  {
    return Ledger::findOrFail($id);
  }

  public function create(array $data)
  {
    return Ledger::create($data);
  }

  public function update($id, array $data)
  {
    $m = Ledger::findOrFail($id);
    $m->update($data);
    return $m;
  }

  public function delete($id)
  {
    $m = Ledger::findOrFail($id);
    $m->delete();
  }
}
