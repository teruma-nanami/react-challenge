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
        Schema::create('user_preferences', function (Blueprint $table) {
            // 複合主キーの定義 (ユーザーIDとカテゴリIDの組み合わせで一意)
            // foreignId() は内部でインデックスを作るため、複合 primary を作る場合は
            // 明示的にカラムを定義してから primary を作り、その後に外部キー制約を追加します。
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('category_id');
            $table->primary(['user_id', 'category_id']);

            // 外部キー制約を別途追加
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');

            // 設定データ
            $table->boolean('is_hidden')->default(false); // TRUE の場合に非表示

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_preferences');
    }
};
