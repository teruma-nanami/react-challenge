<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\BreakTimeController;
use App\Http\Controllers\Api\UserController;

// ★ 追加
use App\Http\Controllers\Api\TimeRequestController;
use App\Http\Controllers\Api\DateRequestController;
use App\Http\Controllers\Api\DocumentController;

use Illuminate\Support\Facades\Route;

// 公開：問い合わせ送信だけ
Route::post('/contacts', [ContactController::class, 'store']);

// 認証必須：管理（一覧/詳細/更新/削除）
Route::middleware('auth0')->group(function () {
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

    // ★ 追加：勤怠一覧
    Route::get('/attendances', [AttendanceController::class, 'index']);

    Route::get('/attendances/today', [AttendanceController::class, 'today']);
    Route::get(
        '/attendances/{attendanceId}/break-times',
        [BreakTimeController::class, 'indexByAttendance']
    );
    Route::post('/break-times/start', [BreakTimeController::class, 'start']);
    Route::put('/break-times/{id}/end', [BreakTimeController::class, 'end']);

    // ★ 追加：時刻修正申請（一覧）
    Route::get('/time-requests', [TimeRequestController::class, 'index']);

    // ※ 申請作成ルートは既にあるはず（無い場合はここを有効化）
    // Route::post('/attendances/{attendanceId}/time-requests', [TimeRequestController::class, 'store']);

    // ★ 追加：休日申請（一覧）
    Route::get('/date-requests', [DateRequestController::class, 'index']);

    // ※ 休日申請の作成ルートは既にあるはず（無い場合はここを有効化）
    // Route::post('/date-requests', [DateRequestController::class, 'store']);

    // ★ 追加：書類（documents）
    Route::get('/documents', [DocumentController::class, 'index']);               // 一覧
    Route::post('/documents', [DocumentController::class, 'store']);             // 下書き作成
    Route::get('/documents/{document}', [DocumentController::class, 'show']);    // 詳細
    Route::put('/documents/{document}', [DocumentController::class, 'update']);  // 下書き更新
    Route::post('/documents/{document}/submit', [DocumentController::class, 'submit']); // 提出
    Route::get('/documents/{document}/pdf', [DocumentController::class, 'pdf']);       // PDF

    Route::get('/profile', [UserController::class, 'me']);
    Route::put('/profile', [UserController::class, 'update']);
    Route::post('/auth/create', [UserController::class, 'create']);
});
