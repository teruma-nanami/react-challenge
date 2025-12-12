<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ledger extends Model
{
  protected $table = 'ledgers';

  protected $fillable = [
    'user_id',
    'fiscal_year',
    'status',
    'locked_at',
  ];

  protected $casts = [
    'locked_at' => 'datetime',
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function entries()
  {
    return $this->hasMany(Entry::class, 'ledger_id');
  }

  public function taxFilingData()
  {
    return $this->hasOne(TaxFilingData::class, 'ledger_id');
  }
}
