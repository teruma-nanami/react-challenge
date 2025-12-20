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
		Schema::create('tax_filing_data', function (Blueprint $table) {
			$table->id();

			// ユーザーと年度（ledger）と1:1
			$table->foreignId('user_id')->constrained('users')->onDelete('cascade');
			$table->foreignId('ledger_id')->constrained('ledgers')->onDelete('cascade');
			$table->unique('ledger_id'); // 年度ごとに1つ

			// ===========================
			// ① 給与所得（源泉徴収票）
			// ===========================
			$table->decimal('salary_income', 15, 2)->default(0);                // 支払金額
			$table->decimal('salary_withholding_tax', 15, 2)->default(0);       // 源泉徴収税額
			$table->decimal('salary_social_insurance_paid', 15, 2)->default(0); // 給与天引き社保
			$table->decimal('salary_life_insurance_ded', 15, 2)->default(0);    // 給与天引き生命保険控除
			$table->decimal('salary_earthquake_insurance_ded', 15, 2)->default(0); // 地震保険料控除
			$table->unsignedSmallInteger('salary_dependents_count')->default(0);  // 扶養人数
			$table->boolean('salary_spouse_ded_applied')->default(false);         // 配偶者控除適用
			$table->decimal('salary_commute_allowance_non_taxable', 15, 2)->default(0); // 通勤手当（非課税）
			$table->decimal('salary_other_deductions', 15, 2)->default(0); // 障害者/寡婦/勤労学生控除など手入力

			// ===========================
			// ② 所得控除（事業者 + 給与合算）
			// ===========================
			// 生命保険控除（3区分）
			$table->decimal('life_insurance_general', 15, 2)->default(0);
			$table->decimal('life_insurance_medical', 15, 2)->default(0);
			$table->decimal('life_insurance_pension', 15, 2)->default(0);

			// 社会保険料控除
			$table->decimal('social_insurance_ded', 15, 2)->default(0);

			// 医療費控除
			$table->decimal('medical_expense_ded', 15, 2)->default(0);

			// 寄附金控除（ふるさと納税）
			$table->decimal('donation_ded', 15, 2)->default(0);

			// 配偶者控除
			$table->boolean('spouse_deduction_applied')->default(false);

			// 扶養控除
			$table->unsignedSmallInteger('dependent_count')->default(0);

			// 小規模企業共済 / iDeCo
			$table->decimal('small_enterprise_mutual_aid', 15, 2)->default(0);
			$table->decimal('ideco_contributions', 15, 2)->default(0);

			// ===========================
			// ③ 住宅ローン控除
			// ===========================
			$table->decimal('home_loan_year_end_balance', 15, 2)->default(0); // 年末残高
			$table->decimal('home_loan_deduction_amount', 15, 2)->default(0); // 控除額（自動 or 手動）
			$table->string('home_loan_type', 50)->nullable();                 // 一般/特定/認定住宅
			$table->unsignedSmallInteger('home_loan_year_number')->default(1); // 控除何年目？

			// ===========================
			// ④ その他調整
			// ===========================
			$table->decimal('misc_deductions', 15, 2)->default(0); // その他控除（予備）

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('tax_filing_data');
	}
};