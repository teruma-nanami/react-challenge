<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('billing_requests', function (Blueprint $table) {
            $table->id();

            // 申請者
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            // 請求タイトル（例：【1月分】請求書作成依頼）
            $table->string('title');

            // 金額
            $table->unsignedInteger('amount');

            // 申請理由（必須）
            $table->text('reason');

            // ステータス
            // draft / submitted / approved / rejected
            $table->string('status', 20)->default('draft');

            // 承認者（Admin）
            $table->foreignId('approved_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();

            // インデックス
            $table->index(['user_id', 'status'], 'billing_requests_user_status_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('billing_requests');
    }
};
