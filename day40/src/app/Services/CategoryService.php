<?php

namespace App\Services;

use App\Models\Category;

class CategoryService
{
  public function list()
  {
    return Category::all();
  }

  public function get($id)
  {
    return Category::findOrFail($id);
  }

  public function create(array $data)
  {
    return Category::create($data);
  }

  public function update($id, array $data)
  {
    $m = Category::findOrFail($id);
    $m->update($data);
    return $m;
  }

  public function delete($id)
  {
    $m = Category::findOrFail($id);
    $m->delete();
  }
}
