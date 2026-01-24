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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();

            // 公開フォーム入力
            $table->string('name');
            $table->string('email');
            $table->string('subject');
            $table->text('message');

            // 検索/フィルタのため必須（bug/request/other）
            $table->string('category')->default('other');

            // 対応状況（new/in_progress/closed）
            $table->string('status')->default('new');

            // 担当管理者（未割当OK）
            $table->foreignId('assigned_user_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // 管理メモ（ユーザーには見えない）
            $table->text('internal_note')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};