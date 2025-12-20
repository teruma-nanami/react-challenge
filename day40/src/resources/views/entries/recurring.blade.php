@extends('layouts.app')

@section('content')

  @php
    /**
     * ------------------------------------------------------------
     * プロトタイプ用ダミーデータ
     * ------------------------------------------------------------
     */

    if (!isset($categories)) {
        $categories = [
            (object) ['id' => 1, 'category_name' => '通信費'],
            (object) ['id' => 2, 'category_name' => '雑費'],
            (object) ['id' => 3, 'category_name' => 'サブスクリプション'],
        ];
    }

    if (!isset($recurring)) {
        $recurring = [
            (object) [
                'id' => 1,
                'name' => 'ChatGPT Plus',
                'amount_inc_tax' => 3000,
                'category_name' => 'サブスクリプション',
                'billing_day' => 15,
                'description' => 'OpenAIの有料プラン',
            ],
            (object) [
                'id' => 2,
                'name' => 'Wi-Fi（光回線）',
                'amount_inc_tax' => 4500,
                'category_name' => '通信費',
                'billing_day' => 1,
                'description' => '',
            ],
        ];
    }
  @endphp

  <div class="container py-4">

    <h3 class="fw-bold mb-4">定期取引（サブスクリプション）管理</h3>

    <p class="text-muted">
      毎月決まって発生する費用を登録することで、取引入力をスムーズにできます。<br>
      現時点のプロトタイプでは自動登録は行われません。
    </p>


    {{-- 新規登録フォーム --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">新しい定期取引を追加</div>
      <div class="card-body">

        @if ($errors->any())
          <div class="alert alert-danger">
            <ul class="mb-0">
              @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
              @endforeach
            </ul>
          </div>
        @endif

        <form method="POST" action="{{ route('entries.recurring.store') }}">
          @csrf

          {{-- 名称 --}}
          <div class="mb-3">
            <label class="form-label fw-semibold">名称</label>
            <input type="text" name="name" class="form-control" placeholder="例：ChatGPT、光回線 など" required>
          </div>

          {{-- 金額（税込） --}}
          <div class="mb-3">
            <label class="form-label fw-semibold">金額（税込）</label>
            <input type="number" name="amount_inc_tax" class="form-control" placeholder="例：3000" required>
          </div>

          {{-- 科目 --}}
          <div class="mb-3">
            <label class="form-label fw-semibold">科目</label>
            <select name="category_id" class="form-select" required>
              <option value="" disabled selected>選択してください</option>
              @foreach ($categories as $category)
                <option value="{{ $category->id }}">{{ $category->category_name }}</option>
              @endforeach
            </select>
          </div>

          {{-- 支払日 --}}
          <div class="mb-3">
            <label class="form-label fw-semibold">支払日</label>
            <input type="number" min="1" max="28" name="billing_day" class="form-control"
              placeholder="1〜28 のいずれか" required>
            <small class="text-muted">
              ※ 29〜31日は月によって存在しないため 1〜28 の範囲で指定します。
            </small>
          </div>

          {{-- メモ --}}
          <div class="mb-3">
            <label class="form-label fw-semibold">メモ（任意）</label>
            <textarea name="description" class="form-control" rows="2"></textarea>
          </div>

          <button type="submit" class="btn btn-success">追加する</button>
        </form>
      </div>
    </div>



    {{-- 登録済み定期取引一覧 --}}
    <div class="card">
      <div class="card-header fw-semibold">登録済みの定期取引</div>
      <div class="card-body">

        @if (empty($recurring))
          <p class="text-muted">登録されている定期取引はありません。</p>
        @else
          <table class="table table-striped align-middle">
            <thead>
              <tr>
                <th>名称</th>
                <th>科目</th>
                <th class="text-end">金額（税込）</th>
                <th class="text-end">支払日</th>
                <th>メモ</th>
                <th class="text-end">操作</th>
              </tr>
            </thead>

            <tbody>
              @foreach ($recurring as $item)
                <tr>
                  <td>{{ $item->name }}</td>
                  <td>{{ $item->category_name }}</td>
                  <td class="text-end">{{ number_format($item->amount_inc_tax) }} 円</td>
                  <td class="text-end">{{ $item->billing_day }} 日</td>
                  <td>{{ $item->description ?: '（なし）' }}</td>

                  <td class="text-end">

                    {{-- 削除 --}}
                    <form method="POST" action="{{ route('entries.recurring.destroy', $item->id) }}"
                      style="display: inline;">
                      @csrf
                      @method('DELETE')
                      <button type="submit" class="btn btn-outline-danger btn-sm">
                        削除
                      </button>
                    </form>

                  </td>
                </tr>
              @endforeach
            </tbody>

          </table>
        @endif

      </div>
    </div>


    <a href="{{ route('entries.index') }}" class="btn btn-outline-secondary mt-3">
      取引一覧に戻る
    </a>

  </div>

@endsection
