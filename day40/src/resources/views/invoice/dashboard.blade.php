@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Invoice Dashboard</h1>
      <p class="text-muted mb-0">Track billing performance, outstanding balances, and payment trends.</p>
    </div>
    <div class="d-flex gap-2">
      <button class="btn btn-outline-secondary">Settings</button>
      <button class="btn btn-primary">Create invoice</button>
    </div>
  </div>

  <div class="row g-3 mb-4">
    <div class="col-lg-3 col-md-6">
      <div class="card text-bg-light h-100">
        <div class="card-body">
          <p class="text-muted mb-1">Invoices sent (30d)</p>
          <p class="h4 mb-0">42</p>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6">
      <div class="card text-bg-light h-100">
        <div class="card-body">
          <p class="text-muted mb-1">Outstanding AR</p>
          <p class="h4 mb-0">3,280,000</p>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6">
      <div class="card text-bg-light h-100">
        <div class="card-body">
          <p class="text-muted mb-1">Average payment time</p>
          <p class="h4 mb-0">18 days</p>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-6">
      <div class="card text-bg-light h-100">
        <div class="card-body">
          <p class="text-muted mb-1">Overdue invoices</p>
          <p class="h4 mb-0">6</p>
        </div>
      </div>
    </div>
  </div>

  <div class="card mb-4">
    <div class="card-header">Collections pipeline</div>
    <div class="card-body">
      <div class="progress" style="height: 24px;">
        <div class="progress-bar bg-success" style="width: 60%;">Paid</div>
        <div class="progress-bar bg-warning text-dark" style="width: 25%;">Due soon</div>
        <div class="progress-bar bg-danger" style="width: 15%;">Overdue</div>
      </div>
    </div>
  </div>

  <div class="row g-3">
    <div class="col-lg-7">
      <div class="card h-100">
        <div class="card-header">Recent invoices</div>
        <div class="table-responsive">
          <table class="table table-striped mb-0 align-middle">
            <thead class="table-light">
              <tr>
                <th scope="col">Invoice #</th>
                <th scope="col">Client</th>
                <th scope="col">Issued</th>
                <th scope="col" class="text-end">Amount</th>
                <th scope="col" class="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>INV-2031</td>
                <td>Hikari Retail</td>
                <td>2025-04-20</td>
                <td class="text-end">420,000</td>
                <td class="text-center"><span class="badge text-bg-success">Paid</span></td>
              </tr>
              <tr>
                <td>INV-2030</td>
                <td>Sumire Foods</td>
                <td>2025-04-17</td>
                <td class="text-end">280,000</td>
                <td class="text-center"><span class="badge text-bg-warning text-dark">Due soon</span></td>
              </tr>
              <tr>
                <td>INV-2026</td>
                <td>Blue Crane Ltd.</td>
                <td>2025-04-05</td>
                <td class="text-end">310,000</td>
                <td class="text-center"><span class="badge text-bg-danger">Overdue</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-lg-5">
      <div class="card h-100">
        <div class="card-header">Actions</div>
        <div class="card-body">
          <ul class="mb-3">
            <li>Send payment reminder to Blue Crane Ltd.</li>
            <li>Review draft invoice #2033.</li>
            <li>Enable automatic reminders for overdue invoices.</li>
          </ul>
          <button class="btn btn-outline-primary w-100">Go to entries</button>
        </div>
      </div>
    </div>
  </div>
@endsection
