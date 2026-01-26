<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inventory_items', function (Blueprint $table) {
            $table->id();

            // 商品コード（任意）
            $table->string('sku')->nullable();

            // 商品名（必須）
            $table->string('name');

            // 現在庫（キャッシュ）
            $table->integer('quantity')->default(0);

            // 販売終了など（非表示にできる）
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventory_items');
    }
};