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
		Schema::create('user_profile', function (Blueprint $table) {
			// usersテーブルのIDを参照（主キー + 外部キー）
			// 明示的に primary を設定し、その後に外部キー制約を定義します。
			$table->unsignedBigInteger('user_id')->primary();
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

			// 役割 (app_role)
			$table->string('app_role', 50)->default('user');

			// 税務・インボイス情報
			$table->string('tax_filing_method', 50)->default('NA');
			$table->boolean('invoice_enabled')->default(false);
			$table->string('invoice_number', 20)->nullable()->unique();

			// 事業情報
			$table->string('business_name')->nullable();

			// 初期設定フラグ
			$table->boolean('first_login')->default(true);

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('user_profile');
	}
};
