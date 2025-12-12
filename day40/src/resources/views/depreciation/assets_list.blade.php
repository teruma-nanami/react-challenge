@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Depreciable Assets</h1>
      <p class="text-muted mb-0">View each fixed asset, its book value, and accumulated depreciation.</p>
    </div>
    <div class="d-flex gap-2">
      <button class="btn btn-outline-secondary">Import CSV</button>
      <button class="btn btn-primary">Add asset</button>
    </div>
  </div>

  <div class="card mb-4">
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-3">
          <label class="form-label" for="filterClass">Asset class</label>
          <select id="filterClass" class="form-select">
            <option selected>All classes</option>
            <option>Machinery</option>
            <option>Vehicles</option>
            <option>Leasehold improvements</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label" for="filterLocation">Location</label>
          <select id="filterLocation" class="form-select">
            <option selected>All locations</option>
            <option>Tokyo HQ</option>
            <option>Osaka Plant</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label" for="filterStatus">Status</label>
          <select id="filterStatus" class="form-select">
            <option selected>Any</option>
            <option>Depreciating</option>
            <option>Pending</option>
            <option>Disposed</option>
          </select>
        </div>
        <div class="col-md-3 d-flex align-items-end">
          <button class="btn btn-outline-primary w-100" type="button">Apply filters</button>
        </div>
      </div>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-striped align-middle">
      <thead class="table-light">
        <tr>
          <th scope="col">Asset</th>
          <th scope="col">Class</th>
          <th scope="col">In-service date</th>
          <th scope="col" class="text-end">Cost</th>
          <th scope="col" class="text-end">Accumulated</th>
          <th scope="col" class="text-end">Net book</th>
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
          <td class="text-end">560,000</td>
          <td class="text-end">2,240,000</td>
          <td class="text-center"><span class="badge text-bg-success">Depreciating</span></td>
          <td class="text-end"><button class="btn btn-sm btn-outline-secondary">Schedule</button></td>
        </tr>
        <tr>
          <td>Office renovation</td>
          <td>Leasehold improvements</td>
          <td>2025-02-02</td>
          <td class="text-end">900,000</td>
          <td class="text-end">75,000</td>
          <td class="text-end">825,000</td>
          <td class="text-center"><span class="badge text-bg-warning text-dark">Pending</span></td>
          <td class="text-end"><button class="btn btn-sm btn-outline-primary">Complete</button></td>
        </tr>
        <tr>
          <td>Company vehicles</td>
          <td>Vehicles</td>
          <td>2025-01-18</td>
          <td class="text-end">620,000</td>
          <td class="text-end">155,000</td>
          <td class="text-end">465,000</td>
          <td class="text-center"><span class="badge text-bg-success">Depreciating</span></td>
          <td class="text-end"><button class="btn btn-sm btn-outline-secondary">Schedule</button></td>
        </tr>
      </tbody>
    </table>
  </div>
@endsection
