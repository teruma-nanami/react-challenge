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

			// 監査用ID (参照先を users に変更)
			$table->foreignId('user_id')->constrained('users')->onDelete('cascade');

			// 必須の外部キー (取引がどの帳簿、科目、税率に紐づくか)
			$table->foreignId('ledger_id')->constrained('ledgers')->onDelete('cascade');
			$table->foreignId('category_id')->constrained('categories');

			// tax_rules は後で定義するため、foreignIdではなくbigIntegerで定義し、
			// 後続のマイグレーションで制約を追加します。ここでは将来の参照に備え
			// インデックスを張っておきます。
			$table->unsignedBigInteger('tax_rule_id')->index();

			// 取引の主要データ
			$table->timestamp('transaction_date');
			$table->decimal('amount_inc_tax', 15, 2);
			$table->string('tax_category', 50); // 適用課税区分 (集計用)
			$table->boolean('is_invoice_received')->default(false); // インボイス受領フラグ

			// 任意データ
			$table->text('description')->nullable();
			$table->string('partner_name')->nullable(); // 取引先名

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
