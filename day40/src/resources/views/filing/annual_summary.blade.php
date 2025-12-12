@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Annual Summary</h1>
      <p class="text-muted mb-0">Snapshot of taxable income, deductions, and payments for the fiscal year.</p>
    </div>
    <div class="d-flex gap-2">
      <button class="btn btn-outline-secondary">Download CSV</button>
      <a href="{{ route('filing.preview') }}" class="btn btn-primary">Review filing</a>
    </div>
  </div>

  <div class="row g-3 mb-4">
    <div class="col-lg-4">
      <div class="card h-100">
        <div class="card-header">Income</div>
        <div class="card-body">
          <p class="mb-1">Gross receipts: <strong>38,500,000</strong></p>
          <p class="mb-1">Non-operating income: <strong>2,150,000</strong></p>
          <p class="mb-0">Adjustments: <strong>-450,000</strong></p>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card h-100">
        <div class="card-header">Deductions</div>
        <div class="card-body">
          <p class="mb-1">Operating expenses: <strong>21,400,000</strong></p>
          <p class="mb-1">Payroll deductions: <strong>9,850,000</strong></p>
          <p class="mb-0">Other deductions: <strong>1,260,000</strong></p>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card h-100">
        <div class="card-header">Tax position</div>
        <div class="card-body">
          <p class="mb-1">Taxable income: <strong>8,040,000</strong></p>
          <p class="mb-1">Estimated tax: <strong>1,326,600</strong></p>
          <p class="mb-0 text-success">Payments to date: <strong>1,350,000</strong></p>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">Quarterly breakdown</div>
    <div class="table-responsive">
      <table class="table table-striped mb-0">
        <thead class="table-light">
          <tr>
            <th scope="col">Quarter</th>
            <th scope="col" class="text-end">Revenue</th>
            <th scope="col" class="text-end">Expenses</th>
            <th scope="col" class="text-end">Taxable income</th>
            <th scope="col" class="text-end">Estimated tax</th>
            <th scope="col" class="text-end">Payments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Q1</td>
            <td class="text-end">9,450,000</td>
            <td class="text-end">7,350,000</td>
            <td class="text-end">2,100,000</td>
            <td class="text-end">346,500</td>
            <td class="text-end">350,000</td>
          </tr>
          <tr>
            <td>Q2</td>
            <td class="text-end">10,140,000</td>
            <td class="text-end">8,010,000</td>
            <td class="text-end">2,130,000</td>
            <td class="text-end">351,450</td>
            <td class="text-end">350,000</td>
          </tr>
          <tr>
            <td>Q3</td>
            <td class="text-end">10,560,000</td>
            <td class="text-end">8,120,000</td>
            <td class="text-end">2,440,000</td>
            <td class="text-end">402,600</td>
            <td class="text-end">350,000</td>
          </tr>
          <tr>
            <td>Q4 (projected)</td>
            <td class="text-end">10,900,000</td>
            <td class="text-end">8,030,000</td>
            <td class="text-end">2,870,000</td>
            <td class="text-end">485,550</td>
            <td class="text-end">300,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
@endsection
