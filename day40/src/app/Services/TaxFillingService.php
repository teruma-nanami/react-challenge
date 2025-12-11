<?php

namespace App\Services;

use App\Models\TaxFillingData;

class TaxFillingService
{
  public function list()
  {
    return TaxFillingData::all();
  }

  public function get($id)
  {
    return TaxFillingData::findOrFail($id);
  }

  public function create(array $data)
  {
    return TaxFillingData::create($data);
  }

  public function update($id, array $data)
  {
    $m = TaxFillingData::findOrFail($id);
    $m->update($data);
    return $m;
  }

  public function delete($id)
  {
    $m = TaxFillingData::findOrFail($id);
    $m->delete();
  }
}
