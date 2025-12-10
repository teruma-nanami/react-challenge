@extends('layouts.layout')

@section('content')
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">ユーザー登録</div>
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

          <form method="POST" action="{{ route('register') }}">
            @csrf

            <div class="mb-3">
              <label for="name" class="form-label">名前</label>
              <input id="name" type="text" name="name" value="{{ old('name') }}" required autofocus
                class="form-control">
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">メールアドレス</label>
              <input id="email" type="email" name="email" value="{{ old('email') }}" required
                class="form-control">
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">パスワード</label>
              <input id="password" type="password" name="password" required class="form-control">
            </div>

            <div class="mb-3">
              <label for="password_confirmation" class="form-label">パスワード（確認）</label>
              <input id="password_confirmation" type="password" name="password_confirmation" required
                class="form-control">
            </div>

            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-success">登録する</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
@endsection
