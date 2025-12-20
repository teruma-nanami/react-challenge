@extends('layouts.app')

@section('content')
  <div class="container py-4">

    <h3 class="fw-bold mb-3">ダッシュボード</h3>

    <p class="text-muted">
      開発用：プロトタイプ確認のため、すべてのページへアクセスできます。
    </p>

    <div class="list-group mt-4">

      {{-- ===========================
             Auth
        ============================ --}}
      <div class="list-group-item active fw-bold">認証</div>
      <a href="{{ route('login') }}" class="list-group-item list-group-item-action">ログイン</a>
      <a href="{{ route('register') }}" class="list-group-item list-group-item-action">ユーザー登録</a>
      <a href="{{ route('password.request') }}" class="list-group-item list-group-item-action">パスワードリセット</a>

      {{-- ===========================
             Setup
        ============================ --}}
      <div class="list-group-item active fw-bold mt-3">初期設定</div>
      <a href="{{ route('setup.initial') }}" class="list-group-item list-group-item-action">初期設定ページ</a>

      {{-- ===========================
             Dashboard
        ============================ --}}
      <div class="list-group-item active fw-bold mt-3">ダッシュボード</div>
      <a href="{{ route('dashboard.notifications') }}" class="list-group-item list-group-item-action">お知らせ</a>

      {{-- ===========================
             Entries
        ============================ --}}
      <div class="list-group-item active fw-bold mt-3">取引</div>
      <a href="{{ route('entries.index') }}" class="list-group-item list-group-item-action">取引一覧</a>
      <a href="{{ route('entries.create') }}" class="list-group-item list-group-item-action">取引を新規作成</a>
      <a href="{{ route('entries.edit', ['id' => 1]) }}" class="list-group-item list-group-item-action">
        取引編集（ID=1例）
      </a>
      <a href="{{ route('entries.detail', ['id' => 1]) }}" class="list-group-item list-group-item-action">
        取引詳細（ID=1例）
      </a>
      <a href="{{ route('entries.category_summary') }}" class="list-group-item list-group-item-action">
        科目別集計
      </a>
      <a href="{{ route('entries.recurring') }}" class="list-group-item list-group-item-action">
        定期取引
      </a>
      <a href="{{ route('entries.capitalized') }}" class="list-group-item list-group-item-action">
        原価消却対象一覧
      </a>

      {{-- ===========================
             Depreciation
        ============================ --}}
      <div class="list-group-item active fw-bold mt-3">原価消却</div>
      <a href="{{ route('depreciation.assets') }}" class="list-group-item list-group-item-action">
        原価消却資産一覧
      </a>
      <a href="{{ route('depreciation.wizard') }}" class="list-group-item list-group-item-action">
        原価消却ウィザード
      </a>

      {{-- ===========================
             Filing
        ============================ --}}
      <div class="list-group-item active fw-bold mt-3">確定申告</div>
      <a href="{{ route('filing.annual_summary') }}" class="list-group-item list-group-item-action">
        年間収支サマリー
      </a>
      <a href="{{ route('filing.deduction_input') }}" class="list-group-item list-group-item-action">
        各種控除入力
      </a>
      <a href="{{ route('filing.entries_summary') }}" class="list-group-item list-group-item-action">
        仕分けデータ集計
      </a>
      <a href="{{ route('filing.preview') }}" class="list-group-item list-group-item-action">
        確定申告書プレビュー
      </a>
      <a href="{{ route('filing.pdf_download') }}" class="list-group-item list-group-item-action">
        PDF ダウンロード
      </a>

      {{-- ===========================
             Invoice
        ============================ --}}
      <div class="list-group-item active fw-bold mt-3">インボイス</div>
      <a href="{{ route('invoice.dashboard') }}" class="list-group-item list-group-item-action">
        インボイス管理ダッシュボード
      </a>
      <a href="{{ route('invoice.entries') }}" class="list-group-item list-group-item-action">
        インボイス対象取引一覧
      </a>

      {{-- ===========================
             Chatbot
        ============================ --}}
      <div class="list-group-item active fw-bold mt-3">チャットボット</div>
      <a href="{{ route('chatbot.index') }}" class="list-group-item list-group-item-action">
        チャットボット
      </a>

      {{-- ===========================
             Settings
        ============================ --}}
      <div class="list-group-item active fw-bold mt-3">設定</div>
      <a href="{{ route('profile.index') }}" class="list-group-item list-group-item-action">
        プロフィール設定
      </a>
      <a href="{{ route('settings.ledger_status') }}" class="list-group-item list-group-item-action">
        帳簿ステータス確認
      </a>

    </div>
  </div>
@endsection
