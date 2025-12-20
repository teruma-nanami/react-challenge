@extends('layouts.app')

@section('content')
  <div class="container py-5">
    <div class="row justify-content-center">
      {{-- 横幅を広めに調整（col-lg-7） --}}
      <div class="col-12 col-sm-10 col-md-9 col-lg-7">

        <div class="card shadow-sm rounded-3">
          <div class="card-header text-center bg-white border-bottom-0 pt-4">
            <h3 class="fw-bold mb-0">ユーザー登録</h3>
          </div>

          <div class="card-body px-5 pb-4">

            {{-- エラーメッセージ --}}
            @if ($errors->any())
              <div class="alert alert-danger">
                <ul class="mb-0">
                  @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                  @endforeach
                </ul>
              </div>
            @endif

            <form method="POST" action="{{ route('register') }}">
              @csrf

              {{-- 名前 --}}
              <div class="mb-3">
                <label for="name" class="form-label fw-semibold">名前</label>
                <input id="name" type="text" name="name" value="{{ old('name') }}" required autofocus
                  class="form-control form-control-lg rounded-3" placeholder="山田 太郎">
              </div>

              {{-- メールアドレス --}}
              <div class="mb-3">
                <label for="email" class="form-label fw-semibold">メールアドレス</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required
                  class="form-control form-control-lg rounded-3" placeholder="you@example.com">
              </div>

              {{-- パスワード --}}
              <div class="mb-3">
                <label for="password" class="form-label fw-semibold">パスワード</label>
                <input id="password" type="password" name="password" required
                  class="form-control form-control-lg rounded-3" placeholder="8文字以上推奨">
              </div>

              {{-- パスワード確認 --}}
              <div class="mb-4">
                <label for="password_confirmation" class="form-label fw-semibold">パスワード（確認）</label>
                <input id="password_confirmation" type="password" name="password_confirmation" required
                  class="form-control form-control-lg rounded-3" placeholder="もう一度入力してください">
              </div>

              {{-- 送信ボタン --}}
              <button type="submit" class="btn btn-success btn-lg w-100 rounded-3">
                登録する
              </button>

            </form>

            {{-- ログインへのリンク --}}
            <div class="mt-4 text-center">
              <small class="text-muted">
                すでにアカウントをお持ちですか？
                <a href="{{ route('login') }}" class="text-decoration-none fw-semibold">ログインはこちら</a>
              </small>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
@endsection
