<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', App\Http\Controllers\UserController::class);
    Route::apiResource('ledgers', App\Http\Controllers\LedgerController::class);
    Route::apiResource('entries', App\Http\Controllers\EntryController::class);
    Route::apiResource('categories', App\Http\Controllers\CategoryController::class);
    Route::apiResource('preferences', App\Http\Controllers\UserPreferenceController::class);
    Route::apiResource('tax-rules', App\Http\Controllers\TaxRuleController::class);
    Route::apiResource('tax-fillings', App\Http\Controllers\TaxFillingController::class);
});
