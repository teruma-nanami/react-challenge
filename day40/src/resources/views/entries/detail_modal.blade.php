@extends('layouts.app')

@section('content')
  @php
    /**
     * ------------------------------------------------------------
     * プロトタイプ用ダミーデータ
     * ------------------------------------------------------------
     */

    if (!isset($user)) {
        $user = (object) [
            'profile' => (object) [
                'invoice_enabled' => false,
            ],
        ];
    }

    if (!isset($entry)) {
        $entry = (object) [
            'id' => 1,
            'transaction_date' => '2026-01-15',
            'category_name' => '通信費',
            'tax_category' => 'standard', // standard / reduced / non-taxable
            'invoice_number' => null,
            'amount_inc_tax' => 1580,
            'description' => 'ダミーの通信費です（プロトタイプ用）',
            'is_capitalized' => false,
            'created_at' => '2026-01-15 10:00:00',
            'updated_at' => '2026-01-16 12:00:00',
        ];
    }

    // 税区分の表示名
    $taxLabels = [
        'standard' => '標準税率（10%）',
        'reduced' => '軽減税率（8%）',
        'non-taxable' => '非課税',
    ];
  @endphp


  <div class="container py-4">

    <h3 class="fw-bold mb-4">取引の詳細</h3>

    <div class="card">
      <div class="card-body">

        <h5 class="fw-semibold mb-3">{{ $entry->category_name }}（ID: {{ $entry->id }}）</h5>

        {{-- 取引基本情報 --}}
        <table class="table">
          <tbody>
            <tr>
              <th style="width: 200px;">日付</th>
              <td>{{ $entry->transaction_date }}</td>
            </tr>

            <tr>
              <th>科目名</th>
              <td>{{ $entry->category_name }}</td>
            </tr>

            @if ($user->profile->invoice_enabled)
              <tr>
                <th>税区分</th>
                <td>{{ $taxLabels[$entry->tax_category] ?? '-' }}</td>
              </tr>

              <tr>
                <th>インボイス登録番号</th>
                <td>{{ $entry->invoice_number ?? '（未入力）' }}</td>
              </tr>
            @endif

            <tr>
              <th>金額（税込）</th>
              <td>{{ number_format($entry->amount_inc_tax) }} 円</td>
            </tr>

            <tr>
              <th>摘要</th>
              <td>{{ $entry->description ?: '（なし）' }}</td>
            </tr>

            <tr>
              <th>固定資産扱い</th>
              <td>
                @if ($entry->is_capitalized)
                  <span class="badge bg-danger">10万円以上（減価償却対象）</span>
                @else
                  <span class="badge bg-secondary">対象外</span>
                @endif
              </td>
            </tr>

            <tr>
              <th>登録日時</th>
              <td>{{ $entry->created_at }}</td>
            </tr>

            <tr>
              <th>更新日時</th>
              <td>{{ $entry->updated_at }}</td>
            </tr>

          </tbody>
        </table>


        {{-- ボタン群 --}}
        <div class="d-flex gap-2 mt-4">

          <a href="{{ route('entries.edit', $entry->id) }}" class="btn btn-primary">
            編集する
          </a>

          <form method="POST" action="{{ route('entries.destroy', $entry->id) }}">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-outline-danger">
              削除する
            </button>
          </form>

          <a href="{{ route('entries.index') }}" class="btn btn-outline-secondary ms-auto">
            一覧に戻る
          </a>

        </div>

      </div>
    </div>

  </div>
@endsection
