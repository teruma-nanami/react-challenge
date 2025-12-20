@extends('layouts.app')

@section('content')

  @php
    /**
     * ------------------------------------------------------------
     * プロトタイプ向けダミーデータ
     * ------------------------------------------------------------
     */

    // 償却期間の候補（白色申告対象の少額減価償却を想定）
    $depreciation_years = [
        1 => '1年',
        2 => '2年',
        3 => '3年（一般的）',
        4 => '4年',
        5 => '5年',
    ];
  @endphp


  <div class="container py-4">

    <h3 class="fw-bold mb-4">固定資産の登録（10万円以上）</h3>

    <p class="text-muted">
      「10万円以上」の購入は経費にできず、減価償却が必要となります。
      このページでは、固定資産として登録し、年末に減価償却費を自動計算するための情報を入力します。
    </p>

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


    {{-- 固定資産登録フォーム --}}
    <form method="POST" action="{{ route('entries.capitalized.store') }}">
      @csrf

      {{-- 購入日 --}}
      <div class="mb-3">
        <label for="purchase_date" class="form-label fw-semibold">購入日</label>
        <input type="date" id="purchase_date" name="purchase_date" class="form-control"
          value="{{ old('purchase_date') }}" required>
      </div>

      {{-- 資産名 --}}
      <div class="mb-3">
        <label for="asset_name" class="form-label fw-semibold">資産名</label>
        <input type="text" id="asset_name" name="asset_name" class="form-control" value="{{ old('asset_name') }}"
          placeholder="例：パソコン、業務用カメラ など" required>
      </div>

      {{-- 金額（税込） --}}
      <div class="mb-3">
        <label for="amount_inc_tax" class="form-label fw-semibold">金額（税込）</label>
        <input type="number" id="amount_inc_tax" name="amount_inc_tax" class="form-control"
          value="{{ old('amount_inc_tax') }}" required>
      </div>

      {{-- 償却期間 --}}
      <div class="mb-3">
        <label for="depreciation_years" class="form-label fw-semibold">償却期間</label>
        <select id="depreciation_years" name="depreciation_years" class="form-select" required>
          <option value="" disabled selected>選択してください</option>
          @foreach ($depreciation_years as $year => $label)
            <option value="{{ $year }}">{{ $label }}</option>
          @endforeach
        </select>
      </div>

      {{-- 摘要（任意） --}}
      <div class="mb-3">
        <label for="description" class="form-label fw-semibold">摘要（任意）</label>
        <textarea id="description" name="description" class="form-control" rows="3" placeholder="例：業務用として購入">{{ old('description') }}</textarea>
      </div>


      {{-- ボタン --}}
      <button type="submit" class="btn btn-success px-4">固定資産として登録する</button>

      <a href="{{ route('entries.index') }}" class="btn btn-outline-secondary ms-2">
        戻る
      </a>

    </form>

  </div>

@endsection
