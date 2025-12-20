@extends('layouts.app')

@section('content')
  <div class="container py-5">
    <div class="row justify-content-center">
      {{-- 横幅を大きめに調整（col-lg-7） --}}
      <div class="col-12 col-sm-10 col-md-9 col-lg-7">

        <div class="card shadow-sm rounded-3">
          <div class="card-header text-center bg-white border-bottom-0 pt-4">
            <h3 class="fw-bold mb-0">ログイン</h3>
          </div>

          <div class="card-body px-5 pb-4">

            {{-- エラー表示 --}}
            @if ($errors->any())
              <div class="alert alert-danger">
                <ul class="mb-0">
                  @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                  @endforeach
                </ul>
              </div>
            @endif

            <form method="POST" action="{{ route('login') }}">
              @csrf

              <div class="mb-3">
                <label for="email" class="form-label fw-semibold">メールアドレス</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus
                  class="form-control form-control-lg rounded-3" placeholder="you@example.com">
              </div>

              <div class="mb-3">
                <label for="password" class="form-label fw-semibold">パスワード</label>
                <input id="password" type="password" name="password" required
                  class="form-control form-control-lg rounded-3" placeholder="••••••••">
              </div>

              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="remember" name="remember">
                  <label class="form-check-label small" for="remember">ログイン情報を記憶する</label>
                </div>
                <a href="{{ route('password.request') }}" class="small text-decoration-none">
                  パスワードをお忘れですか？
                </a>
              </div>

              <button type="submit" class="btn btn-primary btn-lg w-100 rounded-3">
                ログイン
              </button>
            </form>

            <div class="mt-4 text-center">
              <small class="text-muted">
                アカウントをお持ちではありませんか？
                <a href="{{ route('register') }}" class="text-decoration-none fw-semibold">新規登録はこちら</a>
              </small>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
@endsection
