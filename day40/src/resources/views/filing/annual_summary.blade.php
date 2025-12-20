@extends('layouts.app')

@section('content')
  @php
    /**
     * ------------------------------------------------------------
     * プロトタイプ用ダミーデータ
     * ------------------------------------------------------------
     */

    // 年度選択用
    if (!isset($years)) {
        $years = [2024, 2025, 2026];
    }
    $selectedYear = request()->input('year', 2026);

    // 収入と経費のダミー合計
    if (!isset($summary)) {
        $summary = (object) [
            'total_revenue' => 250000,
            'total_expense' => 98000,
            'profit' => 250000 - 98000,
        ];
    }

    // 科目別集計（収支内訳書に必要）
    if (!isset($categoriesSummary)) {
        $categoriesSummary = [
            (object) [
                'category_name' => '売上',
                'default_type' => 'Revenue',
                'total_amount' => 250000,
                'count' => 5,
            ],
            (object) [
                'category_name' => '通信費',
                'default_type' => 'Expense',
                'total_amount' => 15800,
                'count' => 12,
            ],
            (object) [
                'category_name' => '旅費交通費',
                'default_type' => 'Expense',
                'total_amount' => 8200,
                'count' => 7,
            ],
            (object) [
                'category_name' => '消耗品費',
                'default_type' => 'Expense',
                'total_amount' => 74000,
                'count' => 9,
            ],
        ];
    }
  @endphp


  <div class="container py-4">

    <h3 class="fw-bold mb-4">年間損益まとめ（{{ $selectedYear }}年度）</h3>

    {{-- 年度選択フォーム --}}
    <form method="GET" action="{{ route('filing.annual_summary') }}" class="row g-3 mb-4">
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
        <button type="submit" class="btn btn-primary">表示</button>
      </div>
    </form>


    {{-- 損益概要 --}}
    <div class="card mb-4">
      <div class="card-body">

        <h5 class="fw-semibold mb-3">年間損益</h5>

        <table class="table align-middle">
          <tbody>
            <tr>
              <th class="w-25">収入合計</th>
              <td class="text-end fw-bold text-success">{{ number_format($summary->total_revenue) }} 円</td>
            </tr>
            <tr>
              <th>経費合計</th>
              <td class="text-end fw-bold text-danger">{{ number_format($summary->total_expense) }} 円</td>
            </tr>
            <tr>
              <th>所得（収入 − 経費）</th>
              <td class="text-end fw-bold">
                {{ number_format($summary->profit) }} 円
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>



    {{-- 科目別集計 --}}
    <div class="card">
      <div class="card-header fw-semibold">科目別集計</div>
      <div class="card-body">

        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>科目名</th>
              <th>種別</th>
              <th class="text-end">年間合計（税込）</th>
              <th class="text-end">件数</th>
            </tr>
          </thead>

          <tbody>
            @foreach ($categoriesSummary as $row)
              <tr>
                <td>{{ $row->category_name }}</td>

                <td>
                  @if ($row->default_type === 'Revenue')
                    <span class="badge bg-success">収入</span>
                  @else
                    <span class="badge bg-secondary">経費</span>
                  @endif
                </td>

                <td class="text-end">{{ number_format($row->total_amount) }} 円</td>
                <td class="text-end">{{ $row->count }}</td>
              </tr>
            @endforeach
          </tbody>
        </table>

      </div>
    </div>

    {{-- 戻る --}}
    <a href="{{ route('dashboard.home') }}" class="btn btn-outline-secondary mt-3">
      ダッシュボードに戻る
    </a>

  </div>
@endsection
