@extends('layouts.app')

@section('content')

  @php
    /**
     * ------------------------------------------------------------
     * プロトタイプ用ダミーデータ
     * ------------------------------------------------------------
     */

    // ① ユーザー情報（インボイス事業者かどうか）
    // コントローラ未設定でもエラーが出ないようにする
    if (!isset($user)) {
        $user = (object) [
            'profile' => (object) [
                // ← ここを true にすると「インボイス対応フォーム」が表示される
                'invoice_enabled' => true,
            ],
        ];
    }

    // ② カテゴリデータ（未設定のときに使用）
    if (!isset($categories)) {
        $categories = [
            (object) ['id' => 1, 'category_name' => '通信費'],
            (object) ['id' => 2, 'category_name' => '旅費交通費'],
            (object) ['id' => 3, 'category_name' => '消耗品費'],
        ];
    }
  @endphp


  <div class="container py-4">

    <h3 class="fw-bold mb-4">新しい取引を追加</h3>

    {{-- エラーメッセージ --}}
    @if ($errors->any())
      <div class="alert alert-danger">
        <ul class="mb-0">
          @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
          @endforeach
        </ul>
      </div>
    @endif


    {{-- 取引登録フォーム --}}
    <form method="POST" action="{{ route('entries.store') }}">
      @csrf

      {{-- 日付 --}}
      <div class="mb-3">
        <label for="transaction_date" class="form-label fw-semibold">日付</label>
        <input type="date" id="transaction_date" name="transaction_date" class="form-control"
          value="{{ old('transaction_date') }}" required>
      </div>

      {{-- 科目 --}}
      <div class="mb-3">
        <label for="category_id" class="form-label fw-semibold">科目</label>
        <select name="category_id" id="category_id" class="form-select" required>
          <option value="" disabled selected>選択してください</option>
          @foreach ($categories as $category)
            <option value="{{ $category->id }}">
              {{ $category->category_name }}
            </option>
          @endforeach
        </select>
      </div>


      {{-- ▼▼▼ インボイス事業者かどうかでフォーム切り替え ▼▼▼ --}}
      @if ($user->profile->invoice_enabled)
        <div class="alert alert-info">
          あなたは <strong>インボイス登録事業者</strong> として設定されています。
          適格請求書の情報を入力してください。
        </div>

        {{-- 税区分 --}}
        <div class="mb-3">
          <label for="tax_category" class="form-label fw-semibold">税区分</label>
          <select name="tax_category" id="tax_category" class="form-select" required>
            <option value="standard">標準税率（10%）</option>
            <option value="reduced">軽減税率（8%）</option>
            <option value="non-taxable">非課税</option>
          </select>
        </div>

        {{-- インボイス登録番号（任意） --}}
        <div class="mb-3">
          <label for="invoice_number" class="form-label fw-semibold">
            インボイス登録番号（任意）
          </label>
          <input type="text" id="invoice_number" name="invoice_number" class="form-control"
            value="{{ old('invoice_number') }}" placeholder="例：T1234567890123（任意）">
        </div>

        {{-- 税込金額 --}}
        <div class="mb-3">
          <label for="amount_inc_tax" class="form-label fw-semibold">税込金額</label>
          <input type="number" id="amount_inc_tax" name="amount_inc_tax" class="form-control"
            value="{{ old('amount_inc_tax') }}" required>
        </div>
      @else
        {{-- ▼ 非インボイスユーザー（通常） ▼ --}}
        <div class="mb-3">
          <label for="amount_inc_tax" class="form-label fw-semibold">金額（税込）</label>
          <input type="number" id="amount_inc_tax" name="amount_inc_tax" class="form-control"
            value="{{ old('amount_inc_tax') }}" required>
        </div>
      @endif
      {{-- ▲▲▲ フォーム切り替えここまで ▲▲▲ --}}


      {{-- 摘要 --}}
      <div class="mb-3">
        <label for="description" class="form-label fw-semibold">摘要（任意）</label>
        <textarea id="description" name="description" class="form-control" rows="3" placeholder="例：電車代、Wi-Fi料金 など">{{ old('description') }}</textarea>
      </div>


      {{-- ボタン --}}
      <button type="submit" class="btn btn-success px-4">取引を登録する</button>

      <a href="{{ route('entries.index') }}" class="btn btn-outline-secondary ms-2">
        戻る
      </a>

    </form>

  </div>

@endsection
