@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Create Entry</h1>
      <p class="text-muted mb-0">Record a new journal entry by providing line items and supporting details.</p>
    </div>
    <a href="{{ route('entries.index') }}" class="btn btn-outline-secondary">Back to entries</a>
  </div>

  <form class="card">
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-3">
          <label for="entryDate" class="form-label">Entry date</label>
          <input type="date" class="form-control" id="entryDate" value="2025-04-18">
        </div>
        <div class="col-md-3">
          <label for="journal" class="form-label">Journal</label>
          <select id="journal" class="form-select">
            <option>General journal</option>
            <option>Sales journal</option>
            <option>Purchases journal</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="description" class="form-label">Description</label>
          <input type="text" id="description" class="form-control" placeholder="Describe the entry">
        </div>
        <div class="col-md-4">
          <label for="supportingDoc" class="form-label">Supporting document URL</label>
          <input type="url" id="supportingDoc" class="form-control" placeholder="https://...">
        </div>
        <div class="col-md-4">
          <label for="tags" class="form-label">Tags</label>
          <input type="text" id="tags" class="form-control" placeholder="closing, q2, payroll">
        </div>
        <div class="col-md-4 d-flex align-items-end">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="autoReverse">
            <label class="form-check-label" for="autoReverse">Auto-reverse next period</label>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered align-middle mb-0">
        <thead class="table-light">
          <tr>
            <th scope="col" style="width: 35%">Account</th>
            <th scope="col" style="width: 20%">Ledger</th>
            <th scope="col" class="text-end" style="width: 15%">Debit</th>
            <th scope="col" class="text-end" style="width: 15%">Credit</th>
            <th scope="col" style="width: 15%"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="text" class="form-control" value="Rent expense">
            </td>
            <td>
              <select class="form-select">
                <option>Operating expenses</option>
                <option>Administrative</option>
                <option>Marketing</option>
              </select>
            </td>
            <td class="text-end">
              <input type="number" class="form-control text-end" value="120000">
            </td>
            <td class="text-end">
              <input type="number" class="form-control text-end" value="0">
            </td>
            <td class="text-center">
              <button type="button" class="btn btn-sm btn-outline-secondary">Remove</button>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" class="form-control" value="Cash">
            </td>
            <td>
              <select class="form-select">
                <option>Cash and cash equivalents</option>
                <option>Savings</option>
              </select>
            </td>
            <td class="text-end">
              <input type="number" class="form-control text-end" value="0">
            </td>
            <td class="text-end">
              <input type="number" class="form-control text-end" value="120000">
            </td>
            <td class="text-center">
              <button type="button" class="btn btn-sm btn-outline-secondary">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-body border-top">
      <div class="d-flex justify-content-between align-items-center">
        <button type="button" class="btn btn-outline-secondary">Add line</button>
        <div class="text-end">
          <p class="mb-1">Debits: <strong>120,000</strong></p>
          <p class="mb-1">Credits: <strong>120,000</strong></p>
          <p class="mb-0 text-success">Balanced</p>
        </div>
      </div>
    </div>

    <div class="card-footer d-flex justify-content-end gap-2">
      <button type="button" class="btn btn-outline-secondary">Save draft</button>
      <button type="submit" class="btn btn-primary">Post entry</button>
    </div>
  </form>
@endsection
