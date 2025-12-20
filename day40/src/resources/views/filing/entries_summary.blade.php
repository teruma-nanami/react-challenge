@extends('layouts.app')

@section('content')
  @php
    /**
     * ------------------------------------------------------------
     * プロトタイプ用ダミーデータ（controller 接続前提）
     * ------------------------------------------------------------
     */

    // 年度（ledger）選択用
    if (!isset($years)) {
        $years = [2024, 2025, 2026];
    }
    $selectedYear = request()->input('year', 2026);

    // カテゴリ選択用
    if (!isset($categories)) {
        $categories = [
            (object) ['id' => 1, 'category_name' => '通信費'],
            (object) ['id' => 2, 'category_name' => '旅費交通費'],
            (object) ['id' => 3, 'category_name' => '消耗品費'],
        ];
    }
    $selectedCategory = request()->input('category_id');

    // 仕訳一覧（本来は Entry モデルから取得）
    if (!isset($entries)) {
        $entries = [
            (object) [
                'id' => 101,
                'transaction_date' => '2026-01-05',
                'category_name' => '通信費',
                'amount_inc_tax' => 1200,
                'tax_category' => 'standard',
                'partner_name' => 'NTT',
                'description' => 'インターネット代',
            ],
            (object) [
                'id' => 102,
                'transaction_date' => '2026-01-07',
                'category_name' => '旅費交通費',
                'amount_inc_tax' => 240,
                'tax_category' => 'non_tax',
                'partner_name' => '東京メトロ',
                'description' => '電車賃',
            ],
        ];
    }
  @endphp


  <div class="container py-4">

    <h3 class="fw-bold mb-4">仕訳データ集計（{{ $selectedYear }}年度）</h3>

    <p class="text-muted">
      確定申告書への転記前に、すべての取引データ（仕訳）を一覧で確認できます。
      このページでは、年度別・科目別の絞り込みが可能です。
    </p>


    {{-- ▼▼ フィルター（年度・科目） ▼▼ --}}
    <form method="GET" action="{{ route('filing.entries_summary') }}" class="row g-3 mb-4">

      <div class="col-auto">
        <select name="year" class="form-select">
          @foreach ($years as $year)
            <option value="{{ $year }}" @selected($year == $selectedYear)>
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


    {{-- ▼▼ 仕訳一覧テーブル ▼▼ --}}
    <div class="card">
      <div class="card-header fw-semibold">仕訳一覧</div>

      <div class="card-body p-0">

        <table class="table table-striped mb-0 align-middle">
          <thead>
            <tr>
              <th>日付</th>
              <th>科目</th>
              <th class="text-end">金額（税込）</th>
              <th>課税区分</th>
              <th>取引先</th>
              <th>摘要</th>
              <th class="text-center">操作</th>
            </tr>
          </thead>

          <tbody>

            @forelse ($entries as $e)
              <tr>
                <td>{{ $e->transaction_date }}</td>
                <td>{{ $e->category_name }}</td>
                <td class="text-end">{{ number_format($e->amount_inc_tax) }} 円</td>
                <td>
                  <span class="badge bg-secondary">{{ $e->tax_category }}</span>
                </td>
                <td>{{ $e->partner_name }}</td>
                <td>{{ $e->description }}</td>
                <td class="text-center">
                  <a href="{{ route('entries.edit', $e->id) }}" class="btn btn-sm btn-outline-primary">
                    編集
                  </a>
                </td>
              </tr>
            @empty
              <tr>
                <td colspan="7" class="text-center py-4 text-muted">
                  データがありません。
                </td>
              </tr>
            @endforelse

          </tbody>
        </table>

      </div>
    </div>


    {{-- ▼▼ 戻る ▼▼ --}}
    <a href="{{ route('dashboard.home') }}" class="btn btn-outline-secondary mt-3">
      ダッシュボードに戻る
    </a>

  </div>
@endsection
