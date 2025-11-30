<nav class="bg-white border-b border-gray-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center">
        <a href="/" class="text-gray-900 font-semibold">Home</a>
      </div>
      <div class="flex items-center gap-4">
        @if (Route::has('login'))
          <a href="{{ route('login') }}" class="text-sm text-gray-700 hover:text-gray-900">{{ __('Log in') }}</a>
        @endif
        @if (Route::has('register'))
          <a href="{{ route('register') }}" class="text-sm text-blue-600 hover:text-blue-800">{{ __('Register') }}</a>
        @endif
      </div>
    </div>
  </div>
</nav>
