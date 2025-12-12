<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Authentication (guest)
Route::get('/login', [App\Http\Controllers\AuthController::class, 'login'])->name('login');
Route::get('/register', [App\Http\Controllers\AuthController::class, 'register'])->name('register');
Route::get('/password-reset', [App\Http\Controllers\AuthController::class, 'passwordReset'])->name('password.request');

// Setup (first-run)
Route::get('/setup', [App\Http\Controllers\SetupController::class, 'initial'])->name('setup.initial');

// Public pages (require auth where noted)
if (env('PROTOTYPE_PUBLIC', true)) {
    // Prototype mode: register routes without auth so pages are viewable while developing UI
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'home'])->name('dashboard.home');
    Route::get('/dashboard/notifications', [App\Http\Controllers\DashboardController::class, 'notifications'])->name('dashboard.notifications');

    // Entries (web UI)
    Route::get('/entries', [App\Http\Controllers\EntryWebController::class, 'index'])->name('entries.index');
    Route::get('/entries/create', [App\Http\Controllers\EntryWebController::class, 'create'])->name('entries.create');
    Route::get('/entries/{id}/edit', [App\Http\Controllers\EntryWebController::class, 'edit'])->name('entries.edit');
    Route::get('/entries/{id}/detail', [App\Http\Controllers\EntryWebController::class, 'detailModal'])->name('entries.detail');
    Route::get('/entries/category-summary', [App\Http\Controllers\EntryWebController::class, 'categorySummary'])->name('entries.category_summary');
    Route::get('/entries/recurring', [App\Http\Controllers\EntryWebController::class, 'recurring'])->name('entries.recurring');
    Route::get('/entries/capitalized', [App\Http\Controllers\EntryWebController::class, 'capitalized'])->name('entries.capitalized');

    // Depreciation
    Route::get('/depreciation/assets', [App\Http\Controllers\DepreciationController::class, 'assetsList'])->name('depreciation.assets');
    Route::get('/depreciation/wizard', [App\Http\Controllers\DepreciationController::class, 'wizard'])->name('depreciation.wizard');

    // Filing
    Route::get('/filing/annual-summary', [App\Http\Controllers\FilingController::class, 'annualSummary'])->name('filing.annual_summary');
    Route::get('/filing/deductions', [App\Http\Controllers\FilingController::class, 'deductionInput'])->name('filing.deduction_input');
    Route::get('/filing/entries-summary', [App\Http\Controllers\FilingController::class, 'entriesSummary'])->name('filing.entries_summary');
    Route::get('/filing/preview', [App\Http\Controllers\FilingController::class, 'preview'])->name('filing.preview');
    Route::get('/filing/pdf', [App\Http\Controllers\FilingController::class, 'pdfDownload'])->name('filing.pdf_download');

    // Invoice (only visible if user.invoice_enabled)
    Route::get('/invoice', [App\Http\Controllers\InvoiceController::class, 'dashboard'])->name('invoice.dashboard');
    Route::get('/invoice/entries', [App\Http\Controllers\InvoiceController::class, 'entries'])->name('invoice.entries');

    // Chatbot
    Route::get('/chatbot', [App\Http\Controllers\ChatbotController::class, 'index'])->name('chatbot.index');

    // Settings
    Route::get('/settings/profile', [App\Http\Controllers\SettingsController::class, 'profile'])->name('settings.profile');
    Route::get('/settings/ledger-status', [App\Http\Controllers\SettingsController::class, 'ledgerStatus'])->name('settings.ledger_status');
} else {
    Route::middleware('auth')->group(function () {
        // Dashboard
        Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'home'])->name('dashboard.home');
        Route::get('/dashboard/notifications', [App\Http\Controllers\DashboardController::class, 'notifications'])->name('dashboard.notifications');

        // Entries (web UI)
        Route::get('/entries', [App\Http\Controllers\EntryWebController::class, 'index'])->name('entries.index');
        Route::get('/entries/create', [App\Http\Controllers\EntryWebController::class, 'create'])->name('entries.create');
        Route::get('/entries/{id}/edit', [App\Http\Controllers\EntryWebController::class, 'edit'])->name('entries.edit');
        Route::get('/entries/{id}/detail', [App\Http\Controllers\EntryWebController::class, 'detailModal'])->name('entries.detail');
        Route::get('/entries/category-summary', [App\Http\Controllers\EntryWebController::class, 'categorySummary'])->name('entries.category_summary');
        Route::get('/entries/recurring', [App\Http\Controllers\EntryWebController::class, 'recurring'])->name('entries.recurring');
        Route::get('/entries/capitalized', [App\Http\Controllers\EntryWebController::class, 'capitalized'])->name('entries.capitalized');

        // Depreciation
        Route::get('/depreciation/assets', [App\Http\Controllers\DepreciationController::class, 'assetsList'])->name('depreciation.assets');
        Route::get('/depreciation/wizard', [App\Http\Controllers\DepreciationController::class, 'wizard'])->name('depreciation.wizard');

        // Filing
        Route::get('/filing/annual-summary', [App\Http\Controllers\FilingController::class, 'annualSummary'])->name('filing.annual_summary');
        Route::get('/filing/deductions', [App\Http\Controllers\FilingController::class, 'deductionInput'])->name('filing.deduction_input');
        Route::get('/filing/entries-summary', [App\Http\Controllers\FilingController::class, 'entriesSummary'])->name('filing.entries_summary');
        Route::get('/filing/preview', [App\Http\Controllers\FilingController::class, 'preview'])->name('filing.preview');
        Route::get('/filing/pdf', [App\Http\Controllers\FilingController::class, 'pdfDownload'])->name('filing.pdf_download');

        // Invoice (only visible if user.invoice_enabled)
        Route::get('/invoice', [App\Http\Controllers\InvoiceController::class, 'dashboard'])->name('invoice.dashboard');
        Route::get('/invoice/entries', [App\Http\Controllers\InvoiceController::class, 'entries'])->name('invoice.entries');

        // Chatbot
        Route::get('/chatbot', [App\Http\Controllers\ChatbotController::class, 'index'])->name('chatbot.index');

        // Settings
        Route::get('/settings/profile', [App\Http\Controllers\SettingsController::class, 'profile'])->name('settings.profile');
        Route::get('/settings/ledger-status', [App\Http\Controllers\SettingsController::class, 'ledgerStatus'])->name('settings.ledger_status');
    });
}
