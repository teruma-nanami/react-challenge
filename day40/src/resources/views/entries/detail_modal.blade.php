@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-start mb-3">
    <div>
      <h1 class="h3 mb-1">Entry Detail</h1>
      <p class="text-muted mb-0">Review the posting, supporting documents, and audit trail for entry JE-2451.</p>
    </div>
    <div class="btn-group">
      <a href="{{ route('entries.edit', 2451) }}" class="btn btn-outline-secondary">Edit</a>
      <button class="btn btn-outline-secondary">Download PDF</button>
    </div>
  </div>

  <div class="row g-3 mb-4">
    <div class="col-lg-4">
      <div class="card h-100">
        <div class="card-header">Summary</div>
        <div class="card-body">
          <p class="mb-1"><strong>Date:</strong> 2025-04-18</p>
          <p class="mb-1"><strong>Prepared by:</strong> Kenji Tanaka</p>
          <p class="mb-1"><strong>Reviewed by:</strong> Mai Sato</p>
          <p class="mb-1"><strong>Status:</strong> <span class="badge text-bg-success">Posted</span></p>
          <p class="mb-0"><strong>Notes:</strong> Rent payment for HQ office.</p>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card h-100">
        <div class="card-header">Line items</div>
        <div class="table-responsive">
          <table class="table table-striped mb-0">
            <thead class="table-light">
              <tr>
                <th scope="col">Account</th>
                <th scope="col">Ledger</th>
                <th scope="col" class="text-end">Debit</th>
                <th scope="col" class="text-end">Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rent expense</td>
                <td>Operating expenses</td>
                <td class="text-end">120,000</td>
                <td class="text-end">0</td>
              </tr>
              <tr>
                <td>Cash</td>
                <td>Cash and cash equivalents</td>
                <td class="text-end">0</td>
                <td class="text-end">120,000</td>
              </tr>
            </tbody>
            <tfoot class="table-light">
              <tr>
                <th colspan="2" class="text-end">Totals</th>
                <th class="text-end">120,000</th>
                <th class="text-end">120,000</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="row g-3">
    <div class="col-lg-6">
      <div class="card h-100">
        <div class="card-header">Attachments</div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Lease-agreement.pdf
              <button class="btn btn-sm btn-outline-secondary">Open</button>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Bank-statement-apr.pdf
              <button class="btn btn-sm btn-outline-secondary">Open</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card h-100">
        <div class="card-header">Audit trail</div>
        <div class="card-body">
          <ul class="timeline list-unstyled mb-0">
            <li class="mb-3">
              <p class="mb-0"><strong>2025-04-18 09:10</strong> &ndash; Entry posted by Kenji Tanaka</p>
            </li>
            <li class="mb-3">
              <p class="mb-0"><strong>2025-04-17 20:55</strong> &ndash; Reviewed and approved by Mai Sato</p>
            </li>
            <li>
              <p class="mb-0"><strong>2025-04-17 20:10</strong> &ndash; Draft created by Kenji Tanaka</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
@endsection
