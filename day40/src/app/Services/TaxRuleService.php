<?php

namespace App\Services;

use App\Models\TaxRule;

class TaxRuleService
{
  public function list()
  {
    return TaxRule::all();
  }

  public function get($id)
  {
    return TaxRule::findOrFail($id);
  }

  public function create(array $data)
  {
    return TaxRule::create($data);
  }

  public function update($id, array $data)
  {
    $m = TaxRule::findOrFail($id);
    $m->update($data);
    return $m;
  }

  public function delete($id)
  {
    $m = TaxRule::findOrFail($id);
    $m->delete();
  }
}
