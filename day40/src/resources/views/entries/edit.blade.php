@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Edit Entry</h1>
      <p class="text-muted mb-0">Make adjustments to an existing journal entry. Locked periods prevent posting new totals.
      </p>
    </div>
    <div class="d-flex gap-2">
      <a href="{{ route('entries.index') }}" class="btn btn-outline-secondary">Back</a>
      <button class="btn btn-outline-danger">Void entry</button>
    </div>
  </div>

  <div class="alert alert-warning" role="alert">
    This entry affects a period under review. Changes will trigger approval from the accounting manager.
  </div>

  <form class="card">
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-3">
          <label for="editEntryDate" class="form-label">Entry date</label>
          <input type="date" id="editEntryDate" class="form-control" value="2025-04-15">
        </div>
        <div class="col-md-3">
          <label for="editJournal" class="form-label">Journal</label>
          <select id="editJournal" class="form-select">
            <option selected>General journal</option>
            <option>Sales journal</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="editDescription" class="form-label">Description</label>
          <input type="text" id="editDescription" class="form-control" value="Payroll accrual adjustment">
        </div>
        <div class="col-md-4">
          <label for="editReviewer" class="form-label">Reviewer</label>
          <select id="editReviewer" class="form-select">
            <option>Mai Sato</option>
            <option>Kenji Tanaka</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="editAttachments" class="form-label">Supporting doc URL</label>
          <input type="url" id="editAttachments" class="form-control" placeholder="https://...">
        </div>
        <div class="col-md-4">
          <label for="editReference" class="form-label">Reference number</label>
          <input type="text" id="editReference" class="form-control" value="Approval-3098">
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-sm table-striped mb-0">
        <thead class="table-light">
          <tr>
            <th scope="col">Account</th>
            <th scope="col">Ledger</th>
            <th scope="col" class="text-end">Debit</th>
            <th scope="col" class="text-end">Credit</th>
            <th scope="col" class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" class="form-control" value="Salaries payable"></td>
            <td>
              <select class="form-select">
                <option>Payroll</option>
                <option>Operations</option>
              </select>
            </td>
            <td class="text-end">
              <input type="number" class="form-control text-end" value="980000">
            </td>
            <td class="text-end">
              <input type="number" class="form-control text-end" value="0">
            </td>
            <td class="text-center">
              <button type="button" class="btn btn-sm btn-outline-secondary">Split</button>
            </td>
          </tr>
          <tr>
            <td><input type="text" class="form-control" value="Payroll expense"></td>
            <td>
              <select class="form-select">
                <option>Payroll</option>
                <option>Administrative</option>
              </select>
            </td>
            <td class="text-end">
              <input type="number" class="form-control text-end" value="0">
            </td>
            <td class="text-end">
              <input type="number" class="form-control text-end" value="980000">
            </td>
            <td class="text-center">
              <button type="button" class="btn btn-sm btn-outline-secondary">Split</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-body border-top">
      <div class="row g-3">
        <div class="col-md-8">
          <label for="editNotes" class="form-label">Internal notes</label>
          <textarea id="editNotes" class="form-control" rows="3" placeholder="Summarize why this change is needed."></textarea>
        </div>
        <div class="col-md-4">
          <div class="border rounded p-3 bg-light">
            <p class="mb-1">Debits: <strong>980,000</strong></p>
            <p class="mb-1">Credits: <strong>980,000</strong></p>
            <p class="mb-0 text-success">Balanced</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card-footer d-flex justify-content-end gap-2">
      <button type="button" class="btn btn-outline-secondary">Save draft</button>
      <button type="submit" class="btn btn-primary">Submit for approval</button>
    </div>
  </form>
@endsection
