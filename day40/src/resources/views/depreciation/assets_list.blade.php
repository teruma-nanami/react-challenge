@extends('layouts.app')

@section('content')
  <div class="container py-4">

    <h3 class="fw-bold mb-4">原価消却資産一覧</h3>

    <p class="text-muted">
      10万円以上の資産で、経費計上から除外されたものが表示されます。
      償却方法の設定は「原価消却ウィザード」から行えます。
    </p>

    {{-- プロトタイプ用ダミーデータ --}}
    @php
      if (!isset($assets)) {
          $assets = [
              (object) [
                  'id' => 1,
                  'transaction_date' => '2024-03-12',
                  'description' => 'ノートPC（MacBook Air）',
                  'amount_inc_tax' => 165000,
                  'useful_life' => 3,
                  'remaining_amount' => 110000,
              ],
              (object) [
                  'id' => 2,
                  'transaction_date' => '2024-06-22',
                  'description' => '業務用モニター',
                  'amount_inc_tax' => 55000,
                  'useful_life' => null,
                  'remaining_amount' => null,
              ],
          ];
      }
    @endphp


    <div class="card">
      <div class="card-header fw-semibold">
        資産一覧
      </div>

      <div class="card-body p-0">

        <table class="table mb-0 align-middle">
          <thead class="table-light">
            <tr>
              <th>購入日</th>
              <th>内容</th>
              <th class="text-end">金額（税込）</th>
              <th class="text-center">償却年数</th>
              <th class="text-center">未償却残高</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            @foreach ($assets as $asset)
              <tr>
                <td>{{ $asset->transaction_date }}</td>

                <td>{{ $asset->description }}</td>

                <td class="text-end">
                  {{ number_format($asset->amount_inc_tax) }} 円
                </td>

                <td class="text-center">
                  @if ($asset->useful_life)
                    {{ $asset->useful_life }} 年
                  @else
                    <span class="text-muted">未設定</span>
                  @endif
                </td>

                <td class="text-center">
                  @if ($asset->remaining_amount)
                    {{ number_format($asset->remaining_amount) }} 円
                  @else
                    <span class="text-muted">---</span>
                  @endif
                </td>

                <td class="text-end">
                  <a href="{{ route('depreciation.wizard') }}?id={{ $asset->id }}"
                    class="btn btn-sm btn-outline-primary">
                    設定
                  </a>
                </td>
              </tr>
            @endforeach
          </tbody>

        </table>

      </div>
    </div>

    <div class="mt-3">
      <a href="{{ route('dashboard.home') }}" class="btn btn-outline-secondary">
        ダッシュボードに戻る
      </a>
    </div>

  </div>
@endsection
