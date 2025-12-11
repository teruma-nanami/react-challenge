<?php

namespace App\Services;

use App\Models\Entry;

class EntryService
{
  public function list()
  {
    return Entry::all();
  }

  public function get($id)
  {
    return Entry::findOrFail($id);
  }

  public function create(array $data)
  {
    return Entry::create($data);
  }

  public function update($id, array $data)
  {
    $m = Entry::findOrFail($id);
    $m->update($data);
    return $m;
  }

  public function delete($id)
  {
    $m = Entry::findOrFail($id);
    $m->delete();
  }
}
