@extends('layouts.app')

@section('content')

  @php
    // ★ コントローラー未実装時の暫定対応（ダミーデータを定義）

    // $entry が渡っていない場合のみダミーをセット
    if (!isset($entry)) {
        $entry = (object) [
            'id' => 1,
            'transaction_date' => '2026-01-15',
            'category_id' => 1,
            'amount_inc_tax' => 1500,
            'description' => 'ダミーの取引です（コントローラー未接続）',
            'is_invoice_received' => false,
        ];
    }

    // $categories が渡っていない場合のみダミーをセット
    if (!isset($categories)) {
        $categories = [
            (object) ['id' => 1, 'category_name' => '通信費'],
            (object) ['id' => 2, 'category_name' => '旅費交通費'],
            (object) ['id' => 3, 'category_name' => '消耗品費'],
        ];
    }
  @endphp

  <div class="container py-4">

    <h3 class="fw-bold mb-4">取引の編集</h3>

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

    {{-- 更新フォーム --}}
    <form method="POST" action="{{ route('entries.update', $entry->id) }}">
      @csrf
      @method('PUT')

      {{-- 日付 --}}
      <div class="mb-3">
        <label for="transaction_date" class="form-label fw-semibold">日付</label>
        <input type="date" id="transaction_date" name="transaction_date" class="form-control"
          value="{{ old('transaction_date', $entry->transaction_date) }}" required>
      </div>

      {{-- 科目 --}}
      <div class="mb-3">
        <label for="category_id" class="form-label fw-semibold">科目</label>
        <select name="category_id" id="category_id" class="form-select" required>
          @foreach ($categories as $category)
            <option value="{{ $category->id }}" @selected(old('category_id', $entry->category_id) == $category->id)>
              {{ $category->category_name }}
            </option>
          @endforeach
        </select>
      </div>

      {{-- 金額（税込） --}}
      <div class="mb-3">
        <label for="amount_inc_tax" class="form-label fw-semibold">金額（税込）</label>
        <input type="number" id="amount_inc_tax" name="amount_inc_tax" class="form-control"
          value="{{ old('amount_inc_tax', $entry->amount_inc_tax) }}" step="1" required>
      </div>

      {{-- 摘要 --}}
      <div class="mb-3">
        <label for="description" class="form-label fw-semibold">摘要（任意）</label>
        <textarea id="description" name="description" class="form-control" rows="3">{{ old('description', $entry->description) }}</textarea>
      </div>

      {{-- インボイス受領フラグ --}}
      <div class="form-check mb-4">
        <input type="checkbox" id="is_invoice_received" name="is_invoice_received" class="form-check-input" value="1"
          @checked(old('is_invoice_received', $entry->is_invoice_received))>
        <label for="is_invoice_received" class="form-check-label">
          インボイスを受領済み
        </label>
      </div>

      {{-- ボタン群 --}}
      <div class="d-flex align-items-center gap-2">
        <button type="submit" class="btn btn-primary">
          保存する
        </button>
    </form>

    {{-- 削除用フォーム（別フォーム・ネストしない） --}}
    <form method="POST" action="{{ route('entries.destroy', $entry->id) }}">
      @csrf
      @method('DELETE')
      <button type="submit" class="btn btn-outline-danger">
        削除する
      </button>
    </form>
  </div>

  </div>
@endsection
