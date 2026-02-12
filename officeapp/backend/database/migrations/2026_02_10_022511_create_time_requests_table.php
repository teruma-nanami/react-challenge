<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('time_requests', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->foreignId('attendance_id')->constrained()->cascadeOnDelete();

            // 修正希望時刻（両方必須）
            $table->dateTime('requested_check_in_at');
            $table->dateTime('requested_check_out_at');

            // 申請理由（必須）
            $table->text('reason');

            // pending / approved / rejected
            $table->string('status')->default('pending');

            // 却下理由（rejected のとき必須）
            $table->text('rejected_reason')->nullable();

            $table->timestamps();

            // インデックス
            $table->index(['user_id', 'created_at'], 'time_requests_user_created_at_index');
            $table->index(['status', 'created_at'], 'time_requests_status_created_at_index');
            $table->index(['attendance_id', 'created_at'], 'time_requests_attendance_created_at_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('time_requests');
    }
};
