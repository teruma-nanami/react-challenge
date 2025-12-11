<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  protected $table = 'categories';

  protected $fillable = [
    'category_name',
    'default_type',
    'default_tax_category',
  ];

  public function preferences()
  {
    return $this->hasMany(UserPreference::class, 'category_id');
  }

  public function entries()
  {
    return $this->hasMany(Entry::class, 'category_id');
  }
}
