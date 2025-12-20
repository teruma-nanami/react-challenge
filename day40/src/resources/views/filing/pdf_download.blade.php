@extends('layouts.app')

@section('content')
  <div class="container py-5 text-center">

    <h3 class="fw-bold mb-4">PDF 作成完了</h3>

    <p class="text-muted mb-4">
      確定申告書（収支内訳書・申告書 B）の PDF が生成されました。
    </p>

    {{-- 本来ここで response()->download() する --}}
    <a href="#" class="btn btn-success px-4">
      PDF をダウンロード（プロトタイプ）
    </a>

    <div class="mt-4">
      <a href="{{ route('filing.preview') }}" class="btn btn-outline-secondary">
        プレビューに戻る
      </a>
    </div>

  </div>
@endsection
