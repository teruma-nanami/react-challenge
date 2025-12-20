@extends('layouts.app')

@section('content')
  @php
    /**
     * ------------------------------------------------------------
     * プロトタイプ用ダミーデータ
     * 実際は Controller から $invoiceProfile を受け取る想定
     * ------------------------------------------------------------
     */
    if (!isset($invoiceProfile)) {
        $invoiceProfile = (object) [
            'invoice_enabled' => true,
            'invoice_number' => 'T1234567890123',
            'taxable_sales' => 350000,
            'taxable_purchases' => 120000,
            'transaction_count' => 18,
        ];
    }
  @endphp


  <div class="container py-4">

    <h3 class="fw-bold mb-4">インボイス管理</h3>

    @if (!$invoiceProfile->invoice_enabled)
      <div class="alert alert-warning">
        インボイス制度の登録が確認できません。
        設定ページから「インボイス登録」を有効にしてください。
      </div>
    @else
      {{-- ▼▼ 登録番号 ▼▼ --}}
      <div class="card mb-4">
        <div class="card-header fw-semibold">登録番号</div>
        <div class="card-body">

          <p class="mb-2">あなたのインボイス登録番号（適格請求書発行事業者番号）</p>

          <h5 class="fw-bold">{{ $invoiceProfile->invoice_number }}</h5>

          <p class="text-muted small">
            ※ 登録番号は設定ページで変更できます。
          </p>

        </div>
      </div>


      {{-- ▼▼ インボイス対象取引サマリー ▼▼ --}}
      <div class="card mb-4">
        <div class="card-header fw-semibold">インボイス対象取引サマリー</div>
        <div class="card-body">

          <table class="table align-middle mb-0">
            <tbody>
              <tr>
                <th class="w-50">課税売上（10%）</th>
                <td class="text-end fw-bold">
                  {{ number_format($invoiceProfile->taxable_sales) }} 円
                </td>
              </tr>
              <tr>
                <th>課税仕入（10%）</th>
                <td class="text-end fw-bold">
                  {{ number_format($invoiceProfile->taxable_purchases) }} 円
                </td>
              </tr>
              <tr>
                <th>インボイス対象取引数</th>
                <td class="text-end fw-bold">
                  {{ number_format($invoiceProfile->transaction_count) }} 件
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>


      {{-- ▼▼ メニューリンク ▼▼ --}}
      <div class="list-group mb-4">

        <a href="{{ route('invoice.entries') }}"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          インボイス対象の取引一覧
          <span class="badge bg-primary rounded-pill">{{ $invoiceProfile->transaction_count }}</span>
        </a>

        <a href="{{ route('entries.create') }}" class="list-group-item list-group-item-action">
          新しい取引を追加
        </a>

      </div>


      {{-- ▼▼ 戻るボタン ▼▼ --}}
      <a href="{{ route('dashboard.home') }}" class="btn btn-outline-secondary">
        ダッシュボードに戻る
      </a>
    @endif

  </div>
@endsection
