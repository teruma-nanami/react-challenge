<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('entries', function (Blueprint $table) {
			$table->id();

			// ユーザー紐づけ
			$table->foreignId('user_id')->constrained('users')->onDelete('cascade');

			// 年度帳簿
			$table->foreignId('ledger_id')->constrained('ledgers')->onDelete('cascade');

			// 勘定科目
			$table->foreignId('category_id')->constrained('categories');

			// 税率ルール（Standard, Reduced, NonTaxable）
			$table->foreignId('tax_rule_id')->constrained('tax_rules');

			// 取引日
			$table->timestamp('transaction_date');

			// 税込み金額（単式簿記ではこれが正解）
			$table->decimal('amount_inc_tax', 15, 2);

			// UI検索用の税区分（StandardTax / ReducedTax / NonTaxable）
			$table->string('tax_category', 50);

			// インボイス受領フラグ
			$table->boolean('is_invoice_received')->default(false);

			// 10万円以上の資産（白色申告の減価償却対象）
			// → 経費には含めない
			// → 年末に償却通知の対象
			$table->boolean('is_capitalized')->default(false);

			// サブスク判定（将来の recurring_entries の布石）
			$table->boolean('is_recurring')->default(false);

			// 取引先名（任意）
			$table->string('partner_name')->nullable();

			// 備考
			$table->text('description')->nullable();

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('entries');
	}
};