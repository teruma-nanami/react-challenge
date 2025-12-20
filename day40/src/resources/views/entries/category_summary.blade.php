@extends('layouts.app')

@section('content')
  @php
    /**
     * ------------------------------------------------------------
     * プロトタイプ用ダミーデータ
     * ------------------------------------------------------------
     */

    // 年度選択のダミー
    if (!isset($years)) {
        $years = [2024, 2025, 2026];
    }

    $selectedYear = request()->input('year', 2026);

    // 科目別集計のダミーデータ
    if (!isset($summary)) {
        $summary = [
            (object) [
                'category_name' => '通信費',
                'default_type' => 'Expense',
                'total_amount' => 25800,
                'count' => 12,
            ],
            (object) [
                'category_name' => '旅費交通費',
                'default_type' => 'Expense',
                'total_amount' => 13400,
                'count' => 7,
            ],
            (object) [
                'category_name' => '売上',
                'default_type' => 'Revenue',
                'total_amount' => 120000,
                'count' => 3,
            ],
        ];
    }
  @endphp


  <div class="container py-4">

    <h3 class="fw-bold mb-4">科目別集計</h3>

    {{-- 年度選択 --}}
    <form method="GET" action="{{ route('entries.category_summary') }}" class="row g-3 mb-4">
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


    {{-- 集計テーブル --}}
    <div class="card">
      <div class="card-body">

        <h5 class="fw-semibold mb-3">科目別一覧（{{ $selectedYear }}年度）</h5>

        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>科目名</th>
              <th>種別</th>
              <th class="text-end">合計額（税込）</th>
              <th class="text-end">件数</th>
            </tr>
          </thead>

          <tbody>
            @foreach ($summary as $row)
              <tr>
                <td>{{ $row->category_name }}</td>
                <td>
                  @if ($row->default_type === 'Revenue')
                    <span class="badge bg-success">収入</span>
                  @else
                    <span class="badge bg-secondary">支出</span>
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

    {{-- 戻るボタン --}}
    <a href="{{ route('entries.index') }}" class="btn btn-outline-secondary mt-3">
      取引一覧へ戻る
    </a>

  </div>
@endsection
