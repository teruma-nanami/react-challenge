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
		Schema::create('categories', function (Blueprint $table) {
			$table->id();

			// 勘定科目名とその種別
			$table->string('category_name', 100)->unique();
			$table->string('default_type', 20); // Revenue or Expense

			// 消費税情報
			$table->string('default_tax_category', 50); // StandardTax, NonTaxableなど
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('categories');
	}
};
