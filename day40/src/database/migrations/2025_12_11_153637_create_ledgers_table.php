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
		Schema::create('ledgers', function (Blueprint $table) {
			$table->id();

			// 外部キーと複合ユニークキーの定義 (ユーザーごとに年度は1つ)
			$table->foreignId('user_id')->constrained('users')->onDelete('cascade');
			$table->unsignedSmallInteger('fiscal_year');
			$table->unique(['user_id', 'fiscal_year']);

			// 帳簿の期間とステータス
			$table->string('status', 50)->default('Draft'); // Open, Closed
			$table->timestamp('locked_at')->nullable();

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('ledgers');
	}
};
