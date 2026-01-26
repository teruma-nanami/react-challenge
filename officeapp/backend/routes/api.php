<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;

// 公開：問い合わせ送信だけ
Route::post('/contacts', [ContactController::class, 'store']);

// 認証必須：管理（一覧/詳細/更新/削除）
// Route::middleware('auth')->group(function () {
Route::get('/contacts', [ContactController::class, 'index']);
Route::get('/contacts/{id}', [ContactController::class, 'show']);
Route::put('/contacts/{id}', [ContactController::class, 'update']);
Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);

Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::put('/tasks/{id}', [TaskController::class, 'update']);
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
// });