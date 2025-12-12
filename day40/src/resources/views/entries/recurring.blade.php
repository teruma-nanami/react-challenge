@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Recurring Entries</h1>
      <p class="text-muted mb-0">Manage schedules that automatically post entries on your behalf.</p>
    </div>
    <button class="btn btn-primary">New schedule</button>
  </div>

  <div class="table-responsive mb-4">
    <table class="table align-middle">
      <thead class="table-light">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Frequency</th>
          <th scope="col">Next run</th>
          <th scope="col">Ledger</th>
          <th scope="col" class="text-center">Status</th>
          <th scope="col" class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Monthly rent</td>
          <td>Monthly on the 1st</td>
          <td>2025-05-01</td>
          <td>Operating expenses</td>
          <td class="text-center"><span class="badge text-bg-success">Active</span></td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-secondary">Preview</button>
            <button class="btn btn-sm btn-outline-secondary">Pause</button>
          </td>
        </tr>
        <tr>
          <td>Payroll accrual</td>
          <td>Bi-weekly on Friday</td>
          <td>2025-04-25</td>
          <td>Payroll</td>
          <td class="text-center"><span class="badge text-bg-warning text-dark">Needs review</span></td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-secondary">Preview</button>
            <button class="btn btn-sm btn-outline-primary">Resume</button>
          </td>
        </tr>
        <tr>
          <td>Loan interest</td>
          <td>Monthly on the last day</td>
          <td>2025-04-30</td>
          <td>Finance costs</td>
          <td class="text-center"><span class="badge text-bg-secondary">Paused</span></td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-secondary">Preview</button>
            <button class="btn btn-sm btn-outline-primary">Resume</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="card">
    <div class="card-header">Schedule detail</div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label" for="scheduleName">Name</label>
          <input type="text" id="scheduleName" class="form-control" placeholder="Monthly rent">
        </div>
        <div class="col-md-4">
          <label class="form-label" for="scheduleFrequency">Frequency</label>
          <select id="scheduleFrequency" class="form-select">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Quarterly</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label" for="scheduleStart">Start date</label>
          <input type="date" id="scheduleStart" class="form-control" value="2025-05-01">
        </div>
        <div class="col-12">
          <label class="form-label" for="scheduleNotes">Notes</label>
          <textarea class="form-control" id="scheduleNotes" rows="3" placeholder="Describe purpose and reviewers."></textarea>
        </div>
      </div>
      <div class="d-flex justify-content-end gap-2 mt-3">
        <button class="btn btn-outline-secondary" type="button">Discard</button>
        <button class="btn btn-primary" type="button">Save schedule</button>
      </div>
    </div>
  </div>
@endsection
