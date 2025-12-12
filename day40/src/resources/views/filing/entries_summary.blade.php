@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Entries Supporting Filing</h1>
      <p class="text-muted mb-0">Review journal entries tagged to this tax filing before submission.</p>
    </div>
    <div class="btn-group">
      <button class="btn btn-outline-secondary">Export</button>
      <button class="btn btn-outline-secondary">Mark as reviewed</button>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th scope="col">Entry</th>
          <th scope="col">Date</th>
          <th scope="col">Category</th>
          <th scope="col">Tagged deduction</th>
          <th scope="col" class="text-end">Amount</th>
          <th scope="col" class="text-center">Status</th>
          <th scope="col" class="text-end"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>JE-2451</td>
          <td>2025-04-18</td>
          <td>Rent</td>
          <td>Office lease deduction</td>
          <td class="text-end">120,000</td>
          <td class="text-center"><span class="badge text-bg-success">Posted</span></td>
          <td class="text-end">
            <a class="btn btn-sm btn-outline-secondary" href="{{ route('entries.detail', 2451) }}">Open</a>
          </td>
        </tr>
        <tr>
          <td>JE-2448</td>
          <td>2025-04-17</td>
          <td>R&D</td>
          <td>Research credit</td>
          <td class="text-end">320,000</td>
          <td class="text-center"><span class="badge text-bg-warning text-dark">In review</span></td>
          <td class="text-end">
            <a class="btn btn-sm btn-outline-secondary" href="{{ route('entries.detail', 2448) }}">Open</a>
          </td>
        </tr>
        <tr>
          <td>JE-2436</td>
          <td>2025-04-12</td>
          <td>Payroll</td>
          <td>Employment subsidy</td>
          <td class="text-end">450,000</td>
          <td class="text-center"><span class="badge text-bg-success">Posted</span></td>
          <td class="text-end">
            <a class="btn btn-sm btn-outline-secondary" href="{{ route('entries.detail', 2436) }}">Open</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="card mt-4">
    <div class="card-header">Review checklist</div>
    <div class="card-body">
      <ul class="mb-0">
        <li>All entries tie out to deduction schedules.</li>
        <li>Supporting documentation uploaded for each entry.</li>
        <li>Reviewer sign-off recorded within the last 7 days.</li>
      </ul>
    </div>
  </div>
@endsection
