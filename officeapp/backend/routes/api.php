<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\BreakTimeController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DateRequestController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\TimeRequestController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// 公開：問い合わせ送信だけ
Route::post('/contacts', [ContactController::class, 'store']);

// 認証必須：管理（一覧/詳細/更新/削除）
Route::middleware('auth0')->group(function () {
    // ===== Contacts =====
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::get('/contacts/{id}', [ContactController::class, 'show']);
    Route::put('/contacts/{id}', [ContactController::class, 'update']);
    Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);

    // ===== Tasks =====
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('/tasks/{id}', [TaskController::class, 'update']);
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

    // ===== Items =====
    Route::apiResource('items', ItemController::class);
    // Route::get('/items', [ItemController::class, 'index']);
    // Route::get('/items/{id}', [ItemController::class, 'show']);
    // Route::post('/items', [ItemController::class, 'store']);
    // Route::put('/items/{id}', [ItemController::class, 'update']);
    // Route::delete('/items/{id}', [ItemController::class, 'destroy']);

    // ===== Transactions =====
    Route::apiResource('transactions', TransactionController::class)
        ->only(['index', 'show', 'store']);
    // Route::get('/transactions', [TransactionController::class, 'index']);
    // Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    // Route::post('/transactions', [TransactionController::class, 'store']);
    // });

    // ===== Attendances =====
    Route::post('/attendances/check-in', [AttendanceController::class, 'checkIn']);
    Route::post('/attendances/check-out', [AttendanceController::class, 'checkOut']);
    Route::get('/attendances', [AttendanceController::class, 'index']);
    Route::get('/attendances/today', [AttendanceController::class, 'today']);

    // ===== BreakTimes =====
    Route::get(
        '/attendances/{attendanceId}/break-times',
        [BreakTimeController::class, 'indexByAttendance']
    );
    Route::post('/break-times/start', [BreakTimeController::class, 'start']);
    Route::put('/break-times/{id}/end', [BreakTimeController::class, 'end']);

    // ===== TimeRequests =====
    Route::get('/time-requests', [TimeRequestController::class, 'index']);
    Route::post('/attendances/{attendanceId}/time-requests', [TimeRequestController::class, 'store']);

    // ===== DateRequests =====
    Route::get('/date-requests', [DateRequestController::class, 'index']);
    Route::post('/date-requests', [DateRequestController::class, 'store']);

    // ===== Documents =====
    Route::get('/documents', [DocumentController::class, 'index']);
    Route::post('/documents', [DocumentController::class, 'store']);
    Route::get('/documents/{document}', [DocumentController::class, 'show']);
    Route::put('/documents/{document}', [DocumentController::class, 'update']);
    Route::post('/documents/{document}/submit', [DocumentController::class, 'submit']);
    Route::get('/documents/{document}/pdf', [DocumentController::class, 'pdf']);

    // ===== Admin（承認/却下）=====
    Route::prefix('admin')->group(function () {
        // 休日申請
        Route::post('/date-requests/{id}/approve', [AdminController::class, 'approveDateRequest']);
        Route::post('/date-requests/{id}/reject', [AdminController::class, 'rejectDateRequest']);

        // 時刻修正申請
        Route::post('/time-requests/{id}/approve', [AdminController::class, 'approveTimeRequest']);
        Route::post('/time-requests/{id}/reject', [AdminController::class, 'rejectTimeRequest']);
    });

    // ===== Profile / Auth =====
    Route::get('/profile', [UserController::class, 'me']);
    Route::put('/profile', [UserController::class, 'update']);
    Route::post('/auth/create', [UserController::class, 'create']);
});
