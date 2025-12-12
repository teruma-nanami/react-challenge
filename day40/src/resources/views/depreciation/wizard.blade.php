@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Depreciation Wizard</h1>
      <p class="text-muted mb-0">Walk through a step-by-step process to calculate depreciation for new assets.</p>
    </div>
    <a href="{{ route('depreciation.assets') }}" class="btn btn-outline-secondary">Back to assets</a>
  </div>

  <div class="card">
    <div class="card-header">
      <ul class="nav nav-pills card-header-pills">
        <li class="nav-item"><span class="nav-link active">1. Asset details</span></li>
        <li class="nav-item"><span class="nav-link disabled">2. Method</span></li>
        <li class="nav-item"><span class="nav-link disabled">3. Review</span></li>
      </ul>
    </div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-6">
          <label for="assetName" class="form-label">Asset name</label>
          <input type="text" id="assetName" class="form-control" placeholder="Thermal printer line">
        </div>
        <div class="col-md-3">
          <label for="assetClass" class="form-label">Class</label>
          <select id="assetClass" class="form-select">
            <option>Machinery</option>
            <option>IT equipment</option>
            <option>Vehicles</option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="assetLocation" class="form-label">Location</label>
          <select id="assetLocation" class="form-select">
            <option>Tokyo HQ</option>
            <option>Osaka Plant</option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="acquisitionDate" class="form-label">Acquisition date</label>
          <input type="date" id="acquisitionDate" class="form-control" value="2025-04-01">
        </div>
        <div class="col-md-3">
          <label for="serviceDate" class="form-label">In service date</label>
          <input type="date" id="serviceDate" class="form-control" value="2025-04-15">
        </div>
        <div class="col-md-3">
          <label for="assetCost" class="form-label">Cost</label>
          <input type="number" id="assetCost" class="form-control" value="450000">
        </div>
        <div class="col-md-3">
          <label for="salvageValue" class="form-label">Salvage value</label>
          <input type="number" id="salvageValue" class="form-control" value="0">
        </div>
        <div class="col-md-6">
          <label for="assetDescription" class="form-label">Description</label>
          <textarea id="assetDescription" class="form-control" rows="3" placeholder="Summarize how this asset is used."></textarea>
        </div>
        <div class="col-md-6">
          <label for="fundingSource" class="form-label">Funding source</label>
          <select id="fundingSource" class="form-select">
            <option>Cash</option>
            <option>Loan</option>
            <option>Leasing</option>
          </select>
        </div>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-end gap-2">
      <button class="btn btn-outline-secondary">Cancel</button>
      <button class="btn btn-primary">Next step</button>
    </div>
  </div>
@endsection
