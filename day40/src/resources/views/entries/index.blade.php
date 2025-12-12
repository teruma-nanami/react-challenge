@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Entries</h1>
      <p class="text-muted mb-0">Monitor recent journal entries, apply filters, and export for review.</p>
    </div>
    <div class="d-flex gap-2">
      <a href="{{ route('entries.create') }}" class="btn btn-primary">New entry</a>
      <button class="btn btn-outline-secondary">Export CSV</button>
    </div>
  </div>

  <form class="row g-2 align-items-end mb-4">
    <div class="col-md-3">
      <label for="filterDateRange" class="form-label">Date range</label>
      <input type="text" class="form-control" id="filterDateRange" placeholder="2025-04-01 to 2025-04-30">
    </div>
    <div class="col-md-3">
      <label for="filterCategory" class="form-label">Category</label>
      <select class="form-select" id="filterCategory">
        <option selected>All categories</option>
        <option>Sales</option>
        <option>Expenses</option>
        <option>Payroll</option>
        <option>Taxes</option>
      </select>
    </div>
    <div class="col-md-2">
      <label for="filterLedger" class="form-label">Ledger</label>
      <select class="form-select" id="filterLedger">
        <option selected>All ledgers</option>
        <option>General</option>
        <option>Subsidiary</option>
      </select>
    </div>
    <div class="col-md-2">
      <label for="filterStatus" class="form-label">Status</label>
      <select class="form-select" id="filterStatus">
        <option selected>Any</option>
        <option>Draft</option>
        <option>Posted</option>
        <option>Locked</option>
      </select>
    </div>
    <div class="col-md-2">
      <button type="button" class="btn btn-outline-primary w-100">Apply</button>
    </div>
  </form>

  <div class="table-responsive">
    <table class="table table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Entry #</th>
          <th scope="col">Description</th>
          <th scope="col">Ledger</th>
          <th scope="col" class="text-end">Debit</th>
          <th scope="col" class="text-end">Credit</th>
          <th scope="col" class="text-center">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2025-04-18</td>
          <td>JE-2451</td>
          <td>Monthly rent payment</td>
          <td>Operating expenses</td>
          <td class="text-end">120,000</td>
          <td class="text-end">120,000</td>
          <td class="text-center"><span class="badge text-bg-success">Posted</span></td>
          <td class="text-end">
            <a href="{{ route('entries.detail', 2451) }}" class="btn btn-sm btn-link">View</a>
            <a href="{{ route('entries.edit', 2451) }}" class="btn btn-sm btn-outline-secondary">Edit</a>
          </td>
        </tr>
        <tr>
          <td>2025-04-17</td>
          <td>JE-2448</td>
          <td>Stripe payout reconciliation</td>
          <td>Sales</td>
          <td class="text-end">450,280</td>
          <td class="text-end">450,280</td>
          <td class="text-center"><span class="badge text-bg-warning">Review</span></td>
          <td class="text-end">
            <a href="{{ route('entries.detail', 2448) }}" class="btn btn-sm btn-link">View</a>
            <a href="{{ route('entries.edit', 2448) }}" class="btn btn-sm btn-outline-secondary">Edit</a>
          </td>
        </tr>
        <tr>
          <td>2025-04-15</td>
          <td>JE-2440</td>
          <td>Payroll accrual</td>
          <td>Payroll</td>
          <td class="text-end">980,000</td>
          <td class="text-end">980,000</td>
          <td class="text-center"><span class="badge text-bg-secondary">Locked</span></td>
          <td class="text-end">
            <a href="{{ route('entries.detail', 2440) }}" class="btn btn-sm btn-link">View</a>
            <button class="btn btn-sm btn-outline-secondary" disabled>Locked</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <nav class="mt-3" aria-label="Pagination">
    <ul class="pagination justify-content-end">
      <li class="page-item disabled"><span class="page-link">Previous</span></li>
      <li class="page-item active"><span class="page-link">1</span></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
@endsection
