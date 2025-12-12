@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Category Summary</h1>
      <p class="text-muted mb-0">Track spending and income grouped by category for the selected period.</p>
    </div>
    <div class="d-flex gap-2">
      <input type="month" class="form-control" value="2025-04">
      <button class="btn btn-outline-secondary">Compare to last year</button>
    </div>
  </div>

  <div class="row g-3 mb-4">
    <div class="col-lg-4">
      <div class="card h-100">
        <div class="card-header">Highlights</div>
        <div class="card-body">
          <p class="mb-1"><strong>Top expense:</strong> Payroll (980,000)</p>
          <p class="mb-1"><strong>Fastest growth:</strong> Marketing (+18%)</p>
          <p class="mb-0"><strong>Variance to plan:</strong> -5% below budget</p>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card h-100">
        <div class="card-header">Spending mix</div>
        <div class="card-body">
          <div class="progress mb-3" style="height: 32px;">
            <div class="progress-bar bg-primary" role="progressbar" style="width: 35%;">Payroll 35%</div>
            <div class="progress-bar bg-success" role="progressbar" style="width: 28%;">COGS 28%</div>
            <div class="progress-bar bg-warning text-dark" role="progressbar" style="width: 20%;">Rent 20%</div>
            <div class="progress-bar bg-info text-dark" role="progressbar" style="width: 17%;">Other 17%</div>
          </div>
          <p class="text-muted mb-0">Visual placeholder for charting library.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-striped align-middle">
      <thead class="table-light">
        <tr>
          <th scope="col">Category</th>
          <th scope="col" class="text-end">Current period</th>
          <th scope="col" class="text-end">Prior period</th>
          <th scope="col" class="text-end">Variance</th>
          <th scope="col" class="text-end">Variance %</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Payroll</td>
          <td class="text-end">980,000</td>
          <td class="text-end">920,000</td>
          <td class="text-end">60,000</td>
          <td class="text-end text-danger">6.5%</td>
        </tr>
        <tr>
          <td>Rent</td>
          <td class="text-end">120,000</td>
          <td class="text-end">120,000</td>
          <td class="text-end">0</td>
          <td class="text-end">0%</td>
        </tr>
        <tr>
          <td>Marketing</td>
          <td class="text-end">82,000</td>
          <td class="text-end">69,500</td>
          <td class="text-end">12,500</td>
          <td class="text-end text-danger">18.0%</td>
        </tr>
        <tr>
          <td>Sales revenue</td>
          <td class="text-end">1,420,500</td>
          <td class="text-end">1,355,200</td>
          <td class="text-end">65,300</td>
          <td class="text-end text-success">4.8%</td>
        </tr>
      </tbody>
    </table>
  </div>
@endsection
