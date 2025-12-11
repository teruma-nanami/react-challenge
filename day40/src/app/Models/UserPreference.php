<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
  protected $table = 'user_preferences';
  public $incrementing = false; // composite PK
  public $timestamps = true;

  protected $fillable = [
    'user_id',
    'category_id',
    'is_hidden',
  ];

  protected $casts = [
    'is_hidden' => 'boolean',
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function category()
  {
    return $this->belongsTo(Category::class, 'category_id');
  }
}
