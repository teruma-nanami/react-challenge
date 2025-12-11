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
		Schema::create('tax_filling_data', function (Blueprint $table) {
			$table->id();

			// 外部キー定義
			$table->foreignId('user_id')->constrained('users')->onDelete('cascade');
			// ledger_id は 1:1（unique）で ledger を参照するため、外部キー制約
			// と一意制約を分けて定義します（DB による自動インデックス生成の
			// 挙動を明確にするため）。
			$table->foreignId('ledger_id')->constrained('ledgers')->onDelete('cascade');
			$table->unique('ledger_id'); // 1:1

			// 所得情報 (源泉徴収票からの転記)
			$table->decimal('salary_income', 15, 2)->default(0);
			$table->decimal('salary_withholding_tax', 15, 2)->default(0);

			// 控除情報 (手入力)
			$table->decimal('life_insurance_ded', 15, 2)->default(0);
			$table->decimal('social_insurance_ded', 15, 2)->default(0);
			$table->decimal('medical_expense_ded', 15, 2)->default(0);
			$table->decimal('furusato_tax_ded', 15, 2)->default(0);
			$table->unsignedSmallInteger('dependency_deduction_count')->default(0);

			// すべての項目をNOT NULLにするため、DEFAULT(0)を設定
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('tax_filling_data');
	}
};
