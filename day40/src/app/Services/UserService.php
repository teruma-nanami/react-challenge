<?php

namespace App\Services;

use App\Models\User;

class UserService
{
  public function list()
  {
    return User::with('profile')->get();
  }

  public function get($id)
  {
    return User::with('profile')->findOrFail($id);
  }

  public function create(array $data)
  {
    return User::create($data);
  }

  public function update($id, array $data)
  {
    $m = User::findOrFail($id);
    $m->update($data);
    return $m;
  }

  public function delete($id)
  {
    $m = User::findOrFail($id);
    $m->delete();
  }
}
