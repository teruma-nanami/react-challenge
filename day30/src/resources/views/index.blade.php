<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Index</title>
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>
  {{-- 認証済みはJetstreamナビ、ゲストは簡易ナビを表示 --}}
  @auth
    @include('navigation-menu')
  @else
    @include('components.guest-navigation')
  @endauth

  <div class="p-6">
    test
  </div>
</body>

</html>
