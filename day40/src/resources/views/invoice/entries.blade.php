@extends('layouts.app')

@section('content')
  @php
    /**
     * ------------------------------------------------------------
     * プロトタイプ用のダミーデータ
     * 実際は Controller から渡される値に置き換わる
     * ------------------------------------------------------------
     */

    // 年度一覧
    if (!isset($years)) {
        $years = [2024, 2025, 2026];
    }
    $selectedYear = request()->input('year', 2026);

    // カテゴリ一覧
    if (!isset($categories)) {
        $categories = [
            (object) ['id' => 1, 'category_name' => '通信費'],
            (object) ['id' => 2, 'category_name' => '旅費交通費'],
            (object) ['id' => 3, 'category_name' => '広告宣伝費'],
        ];
    }
    $selectedCategory = request()->input('category_id');

    // インボイス対象取引のダミー
    if (!isset($entries)) {
        $entries = [
            (object) [
                'id' => 501,
                'transaction_date' => '2026-01-05',
                'category_name' => '広告宣伝費',
                'amount_inc_tax' => 11000,
                'tax_category' => 'standard',
                'partner_name' => 'Google',
                'is_invoice_received' => true,
                'invoice_number' => 'T1234567890123',
            ],
            (object) [
                'id' => 502,
                'transaction_date' => '2026-01-10',
                'category_name' => '通信費',
                'amount_inc_tax' => 8800,
                'tax_category' => 'standard',
                'partner_name' => 'NTT',
                'is_invoice_received' => false,
                'invoice_number' => null,
            ],
        ];
    }
  @endphp



  <div class="container py-4">

    <h3 class="fw-bold mb-4">インボイス対象取引一覧（{{ $selectedYear }}年度）</h3>

    <p class="text-muted mb-3">
      課税取引（10% / 8%）のみを表示します。
      インボイス受領状況、登録番号の有無を確認できます。
    </p>


    {{-- ▼▼ フィルター ▼▼ --}}
    <form method="GET" action="{{ route('invoice.entries') }}" class="row g-3 mb-4">

      <div class="col-auto">
        <select name="year" class="form-select">
          @foreach ($years as $year)
            <option value="{{ $year }}" @selected($selectedYear == $year)>
              {{ $year }} 年度
            </option>
          @endforeach
        </select>
      </div>

      <div class="col-auto">
        <select name="category_id" class="form-select">
          <option value="">すべての科目</option>
          @foreach ($categories as $cat)
            <option value="{{ $cat->id }}" @selected($selectedCategory == $cat->id)>
              {{ $cat->category_name }}
            </option>
          @endforeach
        </select>
      </div>

      <div class="col-auto">
        <button class="btn btn-primary">絞り込み</button>
      </div>

    </form>



    {{-- ▼▼ 一覧 ▼▼ --}}
    <div class="card">
      <div class="card-header fw-semibold">
        インボイス対象取引
      </div>

      <div class="card-body p-0">

        <table class="table table-striped mb-0 align-middle">

          <thead>
            <tr>
              <th>日付</th>
              <th>科目</th>
              <th class="text-end">金額（税込）</th>
              <th>取引先</th>
              <th>課税区分</th>
              <th>登録番号</th>
              <th class="text-center">操作</th>
            </tr>
          </thead>

          <tbody>

            @forelse ($entries as $e)
              <tr>

                <td>{{ $e->transaction_date }}</td>

                <td>{{ $e->category_name }}</td>

                <td class="text-end">{{ number_format($e->amount_inc_tax) }} 円</td>

                <td>{{ $e->partner_name }}</td>

                <td>
                  <span class="badge bg-secondary">{{ $e->tax_category }}</span>
                </td>

                <td>
                  @if ($e->invoice_number)
                    <span class="text-dark">{{ $e->invoice_number }}</span>
                  @else
                    <span class="text-muted">なし</span>
                  @endif
                </td>

                <td class="text-center">
                  <a href="{{ route('entries.edit', $e->id) }}" class="btn btn-sm btn-outline-primary">
                    編集
                  </a>
                </td>

              </tr>

            @empty
              <tr>
                <td colspan="8" class="text-center text-muted py-4">
                  インボイス対象の取引はありません。
                </td>
              </tr>
            @endforelse

          </tbody>

        </table>

      </div>
    </div>



    {{-- ▼▼ 戻る ▼▼ --}}
    <a href="{{ route('invoice.dashboard') }}" class="btn btn-outline-secondary mt-3">
      インボイスダッシュボードに戻る
    </a>

  </div>
@endsection
