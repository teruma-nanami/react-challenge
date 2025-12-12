<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{ $title ?? config('app.name', 'Laravel') }}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <style>
    body {
      padding-top: 56px;
    }

    .sidebar {
      min-height: calc(100vh - 56px);
    }
  </style>
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="{{ url('/') }}">{{ config('app.name', 'Laravel') }}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topNav"
        aria-controls="topNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="topNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link" href="{{ route('dashboard.home') }}">Dashboard</a></li>
          <li class="nav-item"><a class="nav-link" href="{{ route('entries.index') }}">Entries</a></li>
          <li class="nav-item"><a class="nav-link" href="{{ route('filing.annual_summary') }}">Filing</a></li>
        </ul>

        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          @auth
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="userMenu" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">{{ auth()->user()->name ?? 'User' }}</a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                <li><a class="dropdown-item" href="{{ route('settings.profile') }}">Profile</a></li>
                <li>
                  <form method="POST" action="{{ route('logout') }}" class="d-inline">
                    @csrf
                    <button class="dropdown-item" type="submit">Logout</button>
                  </form>
                </li>
              </ul>
            </li>
          @else
            <li class="nav-item"><a class="nav-link" href="{{ route('login') }}">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="{{ route('register') }}">Register</a></li>
          @endauth

        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <div class="row justify-content-center">
      <aside class="col-12 d-block d-md-none bg-light sidebar py-2 mb-3">
        <nav class="nav flex-row flex-nowrap overflow-auto justify-content-start gap-2 px-2">
          <a class="nav-link" href="{{ route('dashboard.home') }}">Home</a>
          <a class="nav-link" href="{{ route('entries.index') }}">Entries</a>
          <a class="nav-link" href="{{ route('depreciation.assets') }}">Depreciation</a>
          <a class="nav-link" href="{{ route('filing.annual_summary') }}">Filing</a>
          <a class="nav-link" href="{{ route('chatbot.index') }}">Chatbot</a>
          <a class="nav-link" href="{{ route('settings.profile') }}">Settings</a>
        </nav>
      </aside>

      <main class="col-12 col-md-10 col-lg-8 px-md-4 py-4">
        @if (session('status'))
          <div class="alert alert-info">{{ session('status') }}</div>
        @endif

        @yield('content')
      </main>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>

</html>
