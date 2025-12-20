@extends('layouts.app')

@section('content')
  @php
    // ★ 年度のダミーデータ（正式導入前）
    $years = [2024, 2025, 2026];
    $currentYear = 2026;

    // ★ 取引一覧のダミーデータ（未接続時用）
    // 本番では controller から渡される
    if (!isset($entries)) {
        $entries = [
            (object) [
                'id' => 1,
                'transaction_date' => '2026-01-05',
                'category' => (object) ['category_name' => '旅費交通費'],
                'amount_inc_tax' => 1200,
                'description' => '電車代',
            ],
            (object) [
                'id' => 2,
                'transaction_date' => '2026-01-12',
                'category' => (object) ['category_name' => '通信費'],
                'amount_inc_tax' => 980,
                'description' => 'Wi-Fi料金（日割）',
            ],
        ];
    }
  @endphp

  <div class="container py-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">取引一覧</h3>

      <a href="{{ route('entries.create') }}" class="btn btn-primary">
        ＋ 新しい取引を追加
      </a>
    </div>

    {{-- 年度選択 --}}
    <form method="GET" class="mb-4">
      <div class="row g-2 align-items-center">
        <div class="col-auto">
          <label for="fiscal_year" class="col-form-label fw-semibold">年度：</label>
        </div>
        <div class="col-auto">
          <select name="fiscal_year" id="fiscal_year" class="form-select">
            @foreach ($years as $year)
              <option value="{{ $year }}" @selected($year == $currentYear)>
                {{ $year }}年度
              </option>
            @endforeach
          </select>
        </div>
        <div class="col-auto">
          <button class="btn btn-secondary">表示</button>
        </div>
      </div>
    </form>

    {{-- 取引テーブル --}}
    <div class="card shadow-sm">
      <div class="card-body p-0">
        <table class="table mb-0">
          <thead>
            <tr>
              <th>日付</th>
              <th>項目</th>
              <th>金額（税込）</th>
              <th>摘要</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            @forelse ($entries as $entry)
              <tr>
                <td>{{ $entry->transaction_date }}</td>
                <td>{{ $entry->category->category_name }}</td>
                <td>{{ number_format($entry->amount_inc_tax) }}円</td>
                <td>{{ $entry->description }}</td>
                <td>
                  <a href="{{ route('entries.edit', $entry->id) }}" class="btn btn-sm btn-outline-primary">
                    編集
                  </a>
                </td>
              </tr>
            @empty
              <tr>
                <td colspan="5" class="text-center py-3 text-muted">
                  取引がありません
                </td>
              </tr>
            @endforelse
          </tbody>
        </table>
      </div>
    </div>

  </div>
@endsection
