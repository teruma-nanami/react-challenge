@extends('layouts.app')

@section('content')
  <div class="container py-4">

    <h3 class="fw-bold mb-4">プロフィール設定</h3>

    {{-- エラーメッセージ --}}
    @if ($errors->any())
      <div class="alert alert-danger">
        <ul class="mb-0">
          @foreach ($errors->all() as $e)
            <li>{{ $e }}</li>
          @endforeach
        </ul>
      </div>
    @endif

    {{-- 更新完了 --}}
    @if (session('status'))
      <div class="alert alert-success">
        {{ session('status') }}
      </div>
    @endif

    <div class="card">
      <div class="card-header fw-semibold">
        基本情報
      </div>

      <div class="card-body">

        {{-- プロトタイプ用ダミーデータ --}}
        @php
          if (!isset($profile)) {
              $profile = (object) [
                  'name' => '山田 太郎',
                  'business_name' => 'やまだデザイン',
                  'invoice_enabled' => true,
                  'invoice_number' => 'T1234567890123',
                  'tax_filing_method' => 'white',
              ];
          }
        @endphp

        <form method="POST" action="#">
          @csrf

          {{-- 名前 --}}
          <div class="mb-3">
            <label class="form-label">名前</label>
            <input type="text" class="form-control" name="name" value="{{ $profile->name }}" required>
          </div>

          {{-- 事業者名 --}}
          <div class="mb-3">
            <label class="form-label">事業者名（任意）</label>
            <input type="text" class="form-control" name="business_name" value="{{ $profile->business_name }}">
          </div>

          {{-- 税務方式（将来拡張用） --}}
          <div class="mb-3">
            <label class="form-label">申告方式</label>
            <input type="text" class="form-control" value="白色申告（単式簿記）" disabled>
            <small class="text-muted">現在は白色申告のみ対応しています。</small>
          </div>

          <hr class="my-4">

          {{-- インボイス設定 --}}
          <h5 class="fw-bold">インボイス設定</h5>

          {{-- インボイス登録有無 --}}
          <div class="form-check form-switch my-3">
            <input class="form-check-input" type="checkbox" name="invoice_enabled" id="invoice_enabled"
              {{ $profile->invoice_enabled ? 'checked' : '' }}>
            <label class="form-check-label" for="invoice_enabled">インボイス制度を利用する</label>
          </div>

          {{-- 登録番号（invoice_enabled のときだけ表示） --}}
          @if ($profile->invoice_enabled)
            <div class="mb-3">
              <label class="form-label">インボイス登録番号（任意）</label>
              <input type="text" class="form-control" name="invoice_number" value="{{ $profile->invoice_number }}">
              <small class="text-muted">
                ※「T + 13桁」が一般的な形式です。
              </small>
            </div>
          @endif

          <div class="mt-4 d-grid gap-2">
            <button class="btn btn-primary" type="submit">更新する</button>
          </div>

        </form>
      </div>
    </div>

    <div class="mt-3">
      <a href="{{ route('dashboard.home') }}" class="btn btn-outline-secondary">
        ダッシュボードに戻る
      </a>
    </div>

  </div>
@endsection
