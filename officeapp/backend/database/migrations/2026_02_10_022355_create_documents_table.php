<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // 種別（制限しない）
            $table->string('type');

            // 一覧表示用タイトル
            $table->string('title');

            // 下書き/申請済み（2状態だけ運用）
            $table->string('status')->default('draft'); // draft / submitted

            // 書類フォームの中身（JSON）
            $table->json('document_data');

            // 申請（提出）日時（draft の間は NULL）
            $table->dateTime('submitted_at')->nullable();

            $table->timestamps();

            // インデックス
            $table->index(['user_id', 'updated_at'], 'documents_user_updated_at_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
