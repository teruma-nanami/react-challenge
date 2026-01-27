<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->date('work_date');
            $table->dateTime('check_in_at');
            $table->dateTime('check_out_at')->nullable();
            $table->timestamps();

            // 制約・インデックス
            $table->unique(['user_id', 'work_date'], 'attendances_user_date_unique');
            $table->index('work_date', 'attendances_work_date_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
