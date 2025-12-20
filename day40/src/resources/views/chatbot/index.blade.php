@extends('layouts.app')

@section('content')
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-10 col-lg-8">

        <h4 class="fw-bold mb-3 text-center">チャットサポート</h4>

        {{-- チャット表示領域（固定ではなく、Bootstrap の縦積み） --}}
        <div class="mb-4">

          {{-- ボットのメッセージ例 --}}
          <div class="d-flex mb-3">
            <div class="card">
              <div class="card-body py-2 px-3">
                こんにちは！ご質問があればお答えします。
              </div>
            </div>
          </div>

          {{-- ユーザーのメッセージ例 --}}
          <div class="d-flex justify-content-end mb-3">
            <div class="card bg-success-subtle">
              <div class="card-body py-2 px-3">
                経費の入力方法を教えてください。
              </div>
            </div>
          </div>

        </div>

        {{-- 入力欄（POST 用のフォーム） --}}
        <form method="POST" action="#">
          @csrf
          <div class="input-group">
            <input type="text" name="message" class="form-control" placeholder="メッセージを入力..." required>
            <button type="submit" class="btn btn-primary">送信</button>
          </div>
        </form>

      </div>
    </div>
  </div>
@endsection
