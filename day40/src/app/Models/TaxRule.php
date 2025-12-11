<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaxRule extends Model
{
  protected $table = 'tax_rules';

  protected $fillable = [
    'rule_type',
    'value_numeric',
    'fiscal_year',
  ];

  protected $casts = [
    'value_numeric' => 'decimal:4',
    'fiscal_year' => 'integer',
  ];

  public function entries()
  {
    return $this->hasMany(Entry::class, 'tax_rule_id');
  }
}
