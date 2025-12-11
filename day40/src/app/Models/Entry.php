<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
  protected $table = 'entries';

  protected $fillable = [
    'user_id',
    'ledger_id',
    'category_id',
    'tax_rule_id',
    'transaction_date',
    'amount_inc_tax',
    'tax_category',
    'is_invoice_received',
    'description',
    'partner_name',
  ];

  protected $casts = [
    'transaction_date' => 'datetime',
    'amount_inc_tax' => 'decimal:2',
    'is_invoice_received' => 'boolean',
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function ledger()
  {
    return $this->belongsTo(Ledger::class, 'ledger_id');
  }

  public function category()
  {
    return $this->belongsTo(Category::class, 'category_id');
  }

  public function taxRule()
  {
    return $this->belongsTo(TaxRule::class, 'tax_rule_id');
  }
}
