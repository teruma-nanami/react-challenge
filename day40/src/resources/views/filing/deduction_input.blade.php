@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Deduction Input</h1>
      <p class="text-muted mb-0">Enter eligible deductions to reduce taxable income for this filing.</p>
    </div>
    <a href="{{ route('filing.entries_summary') }}" class="btn btn-outline-secondary">View supporting entries</a>
  </div>

  <form class="card">
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-6">
          <label for="deductionType" class="form-label">Deduction type</label>
          <select id="deductionType" class="form-select">
            <option>Research and development</option>
            <option>Depreciation</option>
            <option>Charitable contributions</option>
            <option>Loss carryforward</option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="deductionAmount" class="form-label">Amount</label>
          <input type="number" id="deductionAmount" class="form-control" value="320000">
        </div>
        <div class="col-md-3">
          <label for="deductionJurisdiction" class="form-label">Jurisdiction</label>
          <select id="deductionJurisdiction" class="form-select">
            <option>National</option>
            <option>Prefectural</option>
            <option>Municipal</option>
          </select>
        </div>
        <div class="col-12">
          <label for="deductionNotes" class="form-label">Notes</label>
          <textarea id="deductionNotes" class="form-control" rows="3"
            placeholder="Provide rationale and source documentation."></textarea>
        </div>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-end gap-2">
      <button type="button" class="btn btn-outline-secondary">Cancel</button>
      <button type="submit" class="btn btn-primary">Save deduction</button>
    </div>
  </form>

  <div class="card mt-4">
    <div class="card-header">Recorded deductions</div>
    <div class="table-responsive">
      <table class="table table-striped mb-0">
        <thead class="table-light">
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Jurisdiction</th>
            <th scope="col" class="text-end">Amount</th>
            <th scope="col">Notes</th>
            <th scope="col" class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Research and development</td>
            <td>National</td>
            <td class="text-end">320,000</td>
            <td>Prototype device materials for FY2025 program.</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-secondary">Edit</button>
              <button class="btn btn-sm btn-outline-danger">Remove</button>
            </td>
          </tr>
          <tr>
            <td>Charitable contributions</td>
            <td>Prefectural</td>
            <td class="text-end">120,000</td>
            <td>Approved donation to Osaka STEM foundation.</td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-secondary">Edit</button>
              <button class="btn btn-sm btn-outline-danger">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
@endsection
