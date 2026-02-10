<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('date_requests', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // 申請期間
            $table->date('start_date');
            $table->date('end_date');

            // full / am / pm
            $table->string('session');

            // 申請理由（必須）
            $table->text('reason');

            // pending / approved / rejected
            $table->string('status')->default('pending');

            // 却下理由（rejected のとき必須）
            $table->text('rejected_reason')->nullable();

            $table->timestamps();

            // インデックス
            $table->index(['user_id', 'created_at'], 'date_requests_user_created_at_index');
            $table->index(['status', 'created_at'], 'date_requests_status_created_at_index');
            $table->index(['user_id', 'start_date', 'end_date'], 'date_requests_user_date_range_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('date_requests');
    }
};
