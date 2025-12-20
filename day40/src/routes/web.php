<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
	DashboardController,
	EntryWebController,
	DepreciationController,
	FilingController,
	InvoiceController,
	ChatbotController,
	SettingsController,
	UserController
};

// Welcome（公開ページ）
Route::get('/', fn() => view('welcome'))->name('welcome');

// ===== ここからログイン必須 =====
Route::middleware('auth')->group(function () {

	// Dashboard
	Route::get('/dashboard', [DashboardController::class, 'home'])->name('dashboard.home');
	Route::get('/dashboard/notifications', [DashboardController::class, 'notifications'])->name('dashboard.notifications');

	// Entries
	Route::prefix('entries')->group(function () {
		Route::get('/', [EntryWebController::class, 'index'])->name('entries.index');
		Route::get('/create', [EntryWebController::class, 'create'])->name('entries.create');
		Route::get('/{id}/edit', [EntryWebController::class, 'edit'])->name('entries.edit');
		Route::get('/{id}/detail', [EntryWebController::class, 'detailModal'])->name('entries.detail');
		Route::get('/category-summary', [EntryWebController::class, 'categorySummary'])->name('entries.category_summary');
		Route::get('/recurring', [EntryWebController::class, 'recurring'])->name('entries.recurring');
		Route::get('/capitalized', [EntryWebController::class, 'capitalized'])->name('entries.capitalized');
	});

	// Depreciation
	Route::get('/depreciation/assets', [DepreciationController::class, 'assetsList'])->name('depreciation.assets');
	Route::get('/depreciation/wizard', [DepreciationController::class, 'wizard'])->name('depreciation.wizard');

	// Filing
	Route::prefix('filing')->group(function () {
		Route::get('/annual-summary', [FilingController::class, 'annualSummary'])->name('filing.annual_summary');
		Route::get('/deductions', [FilingController::class, 'deductionInput'])->name('filing.deduction_input');
		Route::get('/entries-summary', [FilingController::class, 'entriesSummary'])->name('filing.entries_summary');
		Route::get('/preview', [FilingController::class, 'preview'])->name('filing.preview');
		Route::get('/pdf', [FilingController::class, 'pdfDownload'])->name('filing.pdf_download');
	});

	// Invoice
	Route::get('/invoice', [InvoiceController::class, 'dashboard'])->name('invoice.dashboard');
	Route::get('/invoice/entries', [InvoiceController::class, 'entries'])->name('invoice.entries');

	// Chatbot
	Route::get('/chatbot', [ChatbotController::class, 'index'])->name('chatbot.index');

	// Settings
	Route::get('/profile', [UserController::class, 'showProfile'])->name('profile.index');
	Route::post('/profile', [UserController::class, 'updateProfile'])->name('profile.update');

	Route::get('/settings/ledger-status', [SettingsController::class, 'ledgerStatus'])->name('settings.ledger_status');
});