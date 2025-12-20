<?php

namespace App\Services;

use App\Models\TaxFilingData;

class TaxFilingService
{
  public function list()
  {
    return TaxFilingData::all();
  }

  public function get($id)
  {
    return TaxFilingData::findOrFail($id);
  }

  public function create(array $data)
  {
    return TaxFilingData::create($data);
  }

  public function update($id, array $data)
  {
    $m = TaxFilingData::findOrFail($id);
    $m->update($data);
    return $m;
  }

  public function delete($id)
  {
    $m = TaxFilingData::findOrFail($id);
    $m->delete();
  }
}
