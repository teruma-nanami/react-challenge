@extends('layouts.app')

@section('title', 'パスワード再設定')

@section('content')
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">

        <div class="card shadow-sm">
          <div class="card-header text-center fw-bold">
            パスワード再設定
          </div>

          <div class="card-body">
            {{-- パスワードリセットリンク送信後のメッセージ --}}
            @if (session('status'))
              <div class="alert alert-success">
                {{ session('status') }}
              </div>
            @endif

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

            {{-- パスワードリセットフォーム --}}
            <form method="POST" action="{{ route('password.email') }}">
              @csrf

              <div class="mb-3">
                <label for="email" class="form-label">登録メールアドレス</label>
                <input type="email" id="email" name="email" class="form-control" value="{{ old('email') }}"
                  placeholder="you@example.com" required autofocus>
              </div>

              <button type="submit" class="btn btn-primary w-100">
                パスワード再設定リンクを送信
              </button>
            </form>

            <hr>

            <div class="text-center">
              <a href="{{ route('login') }}">ログイン画面へ戻る</a>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
@endsection
