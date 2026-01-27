<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\BreakTimeController;
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

Route::apiResource('items', ItemController::class);
// Route::get('/items', [ItemController::class, 'index']);
// Route::get('/items/{id}', [ItemController::class, 'show']);
// Route::post('/items', [ItemController::class, 'store']);
// Route::put('/items/{id}', [ItemController::class, 'update']);
// Route::delete('/items/{id}', [ItemController::class, 'destroy']);

Route::apiResource('transactions', TransactionController::class)
    ->only(['index', 'show', 'store']);
// Route::get('/transactions', [TransactionController::class, 'index']);
// Route::get('/transactions/{id}', [TransactionController::class, 'show']);
// Route::post('/transactions', [TransactionController::class, 'store']);
// });

Route::post('/attendances/check-in', [AttendanceController::class, 'checkIn']);
Route::post('/attendances/check-out', [AttendanceController::class, 'checkOut']);
Route::get('/attendances/today', [AttendanceController::class, 'today']);

Route::post('/break-times/start', [BreakTimeController::class, 'start']);
Route::put('/break-times/{id}/end', [BreakTimeController::class, 'end']);
// }