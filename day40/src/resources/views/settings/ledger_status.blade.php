@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Ledger Status</h1>
      <p class="text-muted mb-0">Monitor open periods, closing state, and ledger locks.</p>
    </div>
    <button class="btn btn-outline-secondary">Run integrity check</button>
  </div>

  <div class="row g-3 mb-4">
    <div class="col-lg-4">
      <div class="card h-100">
        <div class="card-header">Current period</div>
        <div class="card-body">
          <p class="mb-1">April 2025</p>
          <span class="badge text-bg-success">Open</span>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card h-100">
        <div class="card-header">Next close date</div>
        <div class="card-body">
          <p class="mb-1">May 10, 2025</p>
          <p class="text-muted mb-0">Soft close scheduled with approvals required.</p>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card h-100">
        <div class="card-header">Locks</div>
        <div class="card-body">
          <p class="mb-1">General ledger: <strong>Unlocked</strong></p>
          <p class="mb-0">AP subledger: <strong>Locked</strong></p>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">Periods</div>
    <div class="table-responsive">
      <table class="table table-striped mb-0">
        <thead class="table-light">
          <tr>
            <th scope="col">Period</th>
            <th scope="col">Status</th>
            <th scope="col">Closed by</th>
            <th scope="col">Closed on</th>
            <th scope="col" class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mar 2025</td>
            <td><span class="badge text-bg-success">Closed</span></td>
            <td>Mai Sato</td>
            <td>2025-04-05</td>
            <td class="text-end"><button class="btn btn-sm btn-outline-secondary">Reopen</button></td>
          </tr>
          <tr>
            <td>Feb 2025</td>
            <td><span class="badge text-bg-success">Closed</span></td>
            <td>Kenji Tanaka</td>
            <td>2025-03-04</td>
            <td class="text-end"><button class="btn btn-sm btn-outline-secondary">Reopen</button></td>
          </tr>
          <tr>
            <td>Jan 2025</td>
            <td><span class="badge text-bg-secondary">Archived</span></td>
            <td>Mai Sato</td>
            <td>2025-02-02</td>
            <td class="text-end"><button class="btn btn-sm btn-outline-secondary" disabled>Archived</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
@endsection
