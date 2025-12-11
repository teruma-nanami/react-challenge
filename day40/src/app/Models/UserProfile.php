<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
  protected $table = 'user_profile';
  protected $primaryKey = 'user_id';
  public $incrementing = false;

  protected $fillable = [
    'user_id',
    'app_role',
    'tax_filing_method',
    'invoice_enabled',
    'invoice_number',
    'business_name',
    'first_login',
  ];

  protected $casts = [
    'invoice_enabled' => 'boolean',
    'first_login' => 'boolean',
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }
}
