@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-start mb-4">
    <div>
      <h1 class="h3 mb-1">Initial Setup</h1>
      <p class="text-muted mb-0">Answer a few questions to tailor bookkeeping defaults before inviting your team.</p>
    </div>
    <a href="{{ route('dashboard.home') }}" class="btn btn-outline-secondary">Skip for now</a>
  </div>

  <div class="row g-4">
    <div class="col-lg-6">
      <div class="card h-100">
        <div class="card-header">Business Profile</div>
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label for="businessName" class="form-label">Business name</label>
              <input type="text" id="businessName" class="form-control" placeholder="Acme LLC">
            </div>
            <div class="mb-3">
              <label for="fiscalYearStart" class="form-label">Fiscal year start</label>
              <input type="date" id="fiscalYearStart" class="form-control">
            </div>
            <div class="mb-3">
              <label for="industry" class="form-label">Industry</label>
              <select id="industry" class="form-select">
                <option selected>Select industry</option>
                <option>Professional services</option>
                <option>Retail</option>
                <option>Manufacturing</option>
                <option>Hospitality</option>
              </select>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="invoiceModule">
              <label class="form-check-label" for="invoiceModule">Enable invoice module for this tenant</label>
            </div>
            <button type="button" class="btn btn-primary">Save profile</button>
          </form>
        </div>
      </div>
    </div>

    <div class="col-lg-6">
      <div class="card h-100">
        <div class="card-header">Default Accounts</div>
        <div class="card-body">
          <p class="text-muted">Choose the ledgers we should create by default. You can edit the chart of accounts later.
          </p>
          <div class="list-group mb-3">
            <label class="list-group-item d-flex justify-content-between align-items-center">
              <span>Cash and cash equivalents</span>
              <input class="form-check-input" type="checkbox" checked>
            </label>
            <label class="list-group-item d-flex justify-content-between align-items-center">
              <span>Accounts receivable</span>
              <input class="form-check-input" type="checkbox" checked>
            </label>
            <label class="list-group-item d-flex justify-content-between align-items-center">
              <span>Inventory</span>
              <input class="form-check-input" type="checkbox">
            </label>
            <label class="list-group-item d-flex justify-content-between align-items-center">
              <span>Taxes payable</span>
              <input class="form-check-input" type="checkbox" checked>
            </label>
          </div>
          <button type="button" class="btn btn-outline-primary">Apply defaults</button>
        </div>
      </div>
    </div>
  </div>

  <div class="card mt-4">
    <div class="card-header">Next steps</div>
    <div class="card-body">
      <ol class="mb-0">
        <li>Connect your primary bank feed.</li>
        <li>Import last year's trial balance.</li>
        <li>Invite teammates and assign roles.</li>
      </ol>
    </div>
  </div>
@endsection
