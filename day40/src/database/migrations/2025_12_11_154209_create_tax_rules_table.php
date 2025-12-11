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
		Schema::create('tax_rules', function (Blueprint $table) {
			$table->id();

			// ルールの種類とその値
			$table->string('rule_type', 50);
			$table->decimal('value_numeric', 15, 4); // 例: 0.1000 (10%), 480000.0000

			// 適用年度 (税制変更対応のため必須)
			$table->unsignedSmallInteger('fiscal_year');

			// 複合ユニーク制約: 同じ年度に同じ種類のルールは一つのみ
			$table->unique(['rule_type', 'fiscal_year']);

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('tax_rules');
	}
};
