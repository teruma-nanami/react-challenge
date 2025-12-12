@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Filing Preview</h1>
      <p class="text-muted mb-0">Double-check the generated forms and schedules before submission.</p>
    </div>
    <div class="btn-group">
      <a href="{{ route('filing.pdf_download') }}" class="btn btn-outline-secondary">Download PDF</a>
      <button class="btn btn-primary">Submit filing</button>
    </div>
  </div>

  <div class="card mb-4">
    <div class="card-header">Return summary</div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-4">
          <p class="text-muted mb-1">Taxable income</p>
          <p class="h4 mb-0">8,040,000</p>
        </div>
        <div class="col-md-4">
          <p class="text-muted mb-1">Total tax</p>
          <p class="h4 mb-0">1,326,600</p>
        </div>
        <div class="col-md-4">
          <p class="text-muted mb-1">Payments to date</p>
          <p class="h4 mb-0">1,350,000</p>
        </div>
      </div>
    </div>
  </div>

  <div class="row g-3">
    <div class="col-lg-7">
      <div class="card h-100">
        <div class="card-header">Generated forms</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Corporate Tax Return (Form A)
            <span class="badge text-bg-success">Ready</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Local Inhabitant Tax
            <span class="badge text-bg-success">Ready</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Consumption Tax Schedule
            <span class="badge text-bg-warning text-dark">Review</span>
          </li>
        </ul>
        <div class="card-body">
          <button class="btn btn-outline-secondary">Open in new tab</button>
        </div>
      </div>
    </div>
    <div class="col-lg-5">
      <div class="card h-100">
        <div class="card-header">Outstanding tasks</div>
        <div class="card-body">
          <ul class="mb-3">
            <li>Attach signed board approval document.</li>
            <li>Confirm bank account for refund.</li>
            <li>Upload FX translation worksheet.</li>
          </ul>
          <button class="btn btn-outline-primary w-100">Mark tasks complete</button>
        </div>
      </div>
    </div>
  </div>
@endsection
