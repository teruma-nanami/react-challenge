<?php

namespace App\Services;

use App\Models\UserPreference;

class UserPreferenceService
{
  public function list()
  {
    return UserPreference::all();
  }

  public function get($id)
  {
    return UserPreference::findOrFail($id);
  }

  public function create(array $data)
  {
    return UserPreference::create($data);
  }

  public function update($id, array $data)
  {
    $m = UserPreference::findOrFail($id);
    $m->update($data);
    return $m;
  }

  public function delete($id)
  {
    $m = UserPreference::findOrFail($id);
    $m->delete();
  }
}
