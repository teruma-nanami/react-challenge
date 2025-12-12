@extends('layouts.app')

@section('content')
  <div class="row justify-content-center">
    <div class="col-12 col-sm-10 col-md-8 col-lg-6">
      <div class="card">
        <div class="card-header">ログイン</div>
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

          <form method="POST" action="{{ route('login') }}">
            @csrf

            <div class="mb-3">
              <label for="email" class="form-label">メールアドレス</label>
              <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus
                class="form-control">
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">パスワード</label>
              <input id="password" type="password" name="password" required class="form-control">
            </div>

            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="remember" name="remember">
              <label class="form-check-label" for="remember">ログイン情報を記憶する</label>
            </div>

            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">ログイン</button>
            </div>
          </form>
          <div class="mt-3 text-center">
            <small>アカウントをお持ちでないですか？ <a href="{{ route('register') }}">登録はこちら</a></small>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection
