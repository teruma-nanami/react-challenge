@extends('layouts.app')

@section('content')
  <div class="container py-4">

    <h2 class="mb-4">減価償却ウィザード</h2>

    @php
      // --------------------------------------------------
      // asset のダミーデータ（実装では Controller から供給）
      // --------------------------------------------------
      if (!isset($asset)) {
          $asset = (object) [
              'id' => 1,
              'description' => 'パソコン（MacBook Air）',
              'transaction_date' => '2024-03-12',
              'amount_inc_tax' => 165000,
          ];
      }

      // --------------------------------------------------
      // インボイス登録者かどうか（Controllerで取得）
      // --------------------------------------------------
      $invoiceEnabled = $invoiceEnabled ?? false;

      // --------------------------------------------------
      // 税抜価格計算（10%想定）
      // --------------------------------------------------
      $base_price = $invoiceEnabled ? floor($asset->amount_inc_tax / 1.1) : $asset->amount_inc_tax; // インボイスなし→税込償却

      $tax_part = $asset->amount_inc_tax - ($invoiceEnabled ? $base_price : 0);

      // --------------------------------------------------
      // 金額で償却方式を決定
      // --------------------------------------------------
      if ($asset->amount_inc_tax >= 100000 && $asset->amount_inc_tax < 200000) {
          // 3年償却（少額減価償却）
          $useful_life = 3;
          $suggested_amount = floor($base_price / $useful_life);
          $mode = 'small_asset'; // 10〜20万円
      } elseif ($asset->amount_inc_tax >= 200000) {
          // 通常の減価償却（法定耐用年数）→ユーザー入力
          $useful_life = null;
          $suggested_amount = null;
          $mode = 'large_asset';
      } else {
          $mode = 'not_applicable';
      }
    @endphp

    {{-- 対象外 --}}
    @if ($mode === 'not_applicable')
      <div class="alert alert-info">
        この資産（{{ number_format($asset->amount_inc_tax) }}円）は10万円未満のため、減価償却は不要です。
      </div>
      <a href="{{ route('depreciation.assets') }}" class="btn btn-secondary mt-3">資産一覧へ戻る</a>
      @php return; @endphp
    @endif

    {{-- 3年償却・20万円以上共通のヘッダ --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">資産情報</div>
      <div class="card-body">
        <p><strong>購入日：</strong> {{ $asset->transaction_date }}</p>
        <p><strong>資産名：</strong> {{ $asset->description }}</p>
        <p><strong>購入金額（税込）：</strong> ¥{{ number_format($asset->amount_inc_tax) }}</p>

        @if ($invoiceEnabled)
          <p><strong>本体価格（税抜）：</strong> ¥{{ number_format($base_price) }}</p>
          <p><strong>消費税：</strong> ¥{{ number_format($tax_part) }}</p>
        @else
          <p class="text-muted">（インボイス未登録のため税込金額で償却します）</p>
        @endif
      </div>
    </div>

    {{-- 説明カード --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">償却方法の説明</div>
      <div class="card-body">

        @if ($mode === 'small_asset')
          <p>
            この資産は <strong>10万円以上20万円未満</strong> で購入されたため、
            税法上 <strong>3年間の均等償却</strong> を行います。
          </p>

          <p>本体価格： ¥{{ number_format($base_price) }}</p>

          <ul>
            <li>償却対象は本体価格（税抜）です。</li>
            <li>消費税（¥{{ number_format($tax_part) }}）は仕入税額控除／税計算で処理します。</li>
            <li>1年あたりの償却額（推奨）： <strong>¥{{ number_format($suggested_amount) }}</strong></li>
          </ul>
        @elseif ($mode === 'large_asset')
          <p>
            この資産は <strong>20万円以上</strong> のため、法定耐用年数により減価償却を行います。
          </p>
          <ul>
            <li>耐用年数は資産の種類により異なります。</li>
            <li>ユーザー自身で耐用年数を確認し、今年度の償却額を計算してください。</li>
            <li>アプリは償却額の登録のみを行います（自動計算はしません）。</li>
          </ul>

          @if ($invoiceEnabled)
            <p>償却対象額（税抜）： <strong>¥{{ number_format($base_price) }}</strong></p>
          @else
            <p>償却対象額（税込）： <strong>¥{{ number_format($base_price) }}</strong></p>
          @endif
        @endif

      </div>
    </div>

    {{-- 入力フォーム --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">今年度の償却額</div>
      <div class="card-body">

        <form method="POST" action="#">
          @csrf

          <div class="mb-3">
            <label class="form-label">本年度の償却額（円）</label>
            <input type="number" name="depreciation_amount" class="form-control" required
              @if ($suggested_amount) value="{{ $suggested_amount }}" @endif>
          </div>

          <div class="d-grid gap-2 mt-4">
            <button class="btn btn-primary">減価償却費として登録する</button>
          </div>
        </form>

      </div>
    </div>

    <a href="{{ route('depreciation.assets') }}" class="btn btn-secondary">資産一覧へ戻る</a>

  </div>
@endsection
