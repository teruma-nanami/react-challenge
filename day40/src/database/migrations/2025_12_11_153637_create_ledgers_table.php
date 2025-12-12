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

			// 帳簿はユーザー単位
			$table->foreignId('user_id')->constrained('users')->onDelete('cascade');

			// 1ユーザーは年度ごとに1帳簿しか持てない
			$table->unsignedSmallInteger('fiscal_year');
			$table->unique(['user_id', 'fiscal_year']);

			// Ledger状態（Draft または Locked）
			$table->enum('status', ['Draft', 'Locked'])->default('Draft');

			// ロック日時（提出 or 自動ロック時に設定）
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