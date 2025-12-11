<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaxFillingData extends Model
{
  protected $table = 'tax_filling_data';

  protected $fillable = [
    'user_id',
    'ledger_id',
    'salary_income',
    'salary_withholding_tax',
    'life_insurance_ded',
    'social_insurance_ded',
    'medical_expense_ded',
    'furusato_tax_ded',
    'dependency_deduction_count',
  ];

  protected $casts = [
    'salary_income' => 'decimal:2',
    'salary_withholding_tax' => 'decimal:2',
    'life_insurance_ded' => 'decimal:2',
    'social_insurance_ded' => 'decimal:2',
    'medical_expense_ded' => 'decimal:2',
    'furusato_tax_ded' => 'decimal:2',
    'dependency_deduction_count' => 'integer',
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function ledger()
  {
    return $this->belongsTo(Ledger::class, 'ledger_id');
  }
}
