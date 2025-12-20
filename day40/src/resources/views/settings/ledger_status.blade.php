@extends('layouts.app')

@section('content')
  <div class="container py-4">

    <h3 class="fw-bold mb-4">帳簿ステータス確認</h3>

    {{-- プロトタイプ用ダミーデータ --}}
    @php
      if (!isset($ledgers)) {
          $ledgers = [
              (object) [
                  'fiscal_year' => 2024,
                  'status' => 'Draft',
                  'locked_at' => null,
              ],
              (object) [
                  'fiscal_year' => 2023,
                  'status' => 'Locked',
                  'locked_at' => '2024-03-31 23:59:00',
              ],
          ];
      }
    @endphp

    <div class="card mb-4">
      <div class="card-header fw-semibold">
        年度別帳簿一覧
      </div>
      <div class="card-body">

        <p class="text-muted">
          白色申告では年度ごとに 1 つの帳簿を作成します。提出後の帳簿はロックされ編集できません。
        </p>

        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th>年度</th>
              <th>ステータス</th>
              <th>ロック日時</th>
            </tr>
          </thead>
          <tbody>
            @foreach ($ledgers as $ledger)
              <tr>
                <td class="fw-bold">{{ $ledger->fiscal_year }} 年</td>
                <td>
                  @if ($ledger->status === 'Locked')
                    <span class="badge bg-secondary">ロック済み</span>
                  @else
                    <span class="badge bg-success">編集中</span>
                  @endif
                </td>
                <td>
                  @if ($ledger->locked_at)
                    {{ $ledger->locked_at }}
                  @else
                    <span class="text-muted">---</span>
                  @endif
                </td>
              </tr>
            @endforeach
          </tbody>
        </table>

      </div>
    </div>

    {{-- 年度追加（プロトタイプのため実装なし） --}}
    <div class="mb-4">
      <button class="btn btn-outline-primary w-100" disabled>
        ＋ 新しい年度を追加（準備中）
      </button>
      <small class="text-muted d-block mt-1">
        ※ 本番環境では翌年度の帳簿をここから作成できます。
      </small>
    </div>

    <a href="{{ route('dashboard.home') }}" class="btn btn-outline-secondary">
      ダッシュボードに戻る
    </a>

  </div>
@endsection
