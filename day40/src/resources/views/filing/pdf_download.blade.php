@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Filing PDF Package</h1>
      <p class="text-muted mb-0">Download the compiled submission or individual schedules.</p>
    </div>
    <a href="{{ route('filing.preview') }}" class="btn btn-outline-secondary">Back to preview</a>
  </div>

  <div class="card mb-4">
    <div class="card-body">
      <p class="mb-2">Choose a package to download. Files are generated on demand and stored for 24 hours.</p>
      <div class="d-flex gap-2">
        <button class="btn btn-primary">Download full package (12 MB)</button>
        <button class="btn btn-outline-secondary">Send via email</button>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">Individual files</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Corporate Tax Return.pdf
        <button class="btn btn-sm btn-outline-secondary">Download</button>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Schedules.zip
        <button class="btn btn-sm btn-outline-secondary">Download</button>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Supporting-documents.zip
        <button class="btn btn-sm btn-outline-secondary">Download</button>
      </li>
    </ul>
  </div>
@endsection
