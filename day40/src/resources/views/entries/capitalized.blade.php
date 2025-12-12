@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Capitalized Entries</h1>
      <p class="text-muted mb-0">Track items that were capitalized to the balance sheet rather than expensed.</p>
    </div>
    <button class="btn btn-outline-secondary">Export asset register</button>
  </div>

  <div class="card mb-4">
    <div class="card-body d-flex justify-content-around text-center">
      <div>
        <p class="text-muted mb-1">Total assets capitalized this year</p>
        <p class="h4 mb-0">4,320,000</p>
      </div>
      <div>
        <p class="text-muted mb-1">Assets pending review</p>
        <p class="h4 mb-0">3</p>
      </div>
      <div>
        <p class="text-muted mb-1">Accumulated depreciation</p>
        <p class="h4 mb-0">-1,140,500</p>
      </div>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table align-middle">
      <thead class="table-light">
        <tr>
          <th scope="col">Asset</th>
          <th scope="col">Category</th>
          <th scope="col">Capitalized on</th>
          <th scope="col" class="text-end">Amount</th>
          <th scope="col">Useful life</th>
          <th scope="col" class="text-center">Status</th>
          <th scope="col" class="text-end"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Factory robot line</td>
          <td>Machinery</td>
          <td>2025-03-12</td>
          <td class="text-end">2,800,000</td>
          <td>7 years</td>
          <td class="text-center"><span class="badge text-bg-success">Depreciating</span></td>
          <td class="text-end"><button class="btn btn-sm btn-outline-secondary">View</button></td>
        </tr>
        <tr>
          <td>Office renovation</td>
          <td>Leasehold improvements</td>
          <td>2025-02-02</td>
          <td class="text-end">900,000</td>
          <td>5 years</td>
          <td class="text-center"><span class="badge text-bg-warning text-dark">Pending</span></td>
          <td class="text-end"><button class="btn btn-sm btn-outline-secondary">Review</button></td>
        </tr>
        <tr>
          <td>Company vehicles</td>
          <td>Vehicles</td>
          <td>2025-01-18</td>
          <td class="text-end">620,000</td>
          <td>4 years</td>
          <td class="text-center"><span class="badge text-bg-success">Depreciating</span></td>
          <td class="text-end"><button class="btn btn-sm btn-outline-secondary">View</button></td>
        </tr>
      </tbody>
    </table>
  </div>
@endsection
