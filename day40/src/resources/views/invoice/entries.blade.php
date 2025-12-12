@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Invoice Entries</h1>
      <p class="text-muted mb-0">See invoice line items that sync back to the ledger.</p>
    </div>
    <a href="{{ route('invoice.dashboard') }}" class="btn btn-outline-secondary">Back to invoice dashboard</a>
  </div>

  <form class="row g-2 mb-4">
    <div class="col-md-4">
      <label class="form-label" for="invoiceSearch">Search</label>
      <input type="text" id="invoiceSearch" class="form-control" placeholder="Invoice # or client">
    </div>
    <div class="col-md-3">
      <label class="form-label" for="invoiceStatus">Status</label>
      <select id="invoiceStatus" class="form-select">
        <option>Any</option>
        <option>Draft</option>
        <option>Sent</option>
        <option>Paid</option>
        <option>Overdue</option>
      </select>
    </div>
    <div class="col-md-3">
      <label class="form-label" for="invoiceDateRange">Date range</label>
      <input type="text" id="invoiceDateRange" class="form-control" placeholder="2025-04-01 – 2025-04-30">
    </div>
    <div class="col-md-2 d-flex align-items-end">
      <button class="btn btn-outline-primary w-100" type="button">Apply</button>
    </div>
  </form>

  <div class="table-responsive">
    <table class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <th scope="col">Invoice #</th>
          <th scope="col">Client</th>
          <th scope="col">Item</th>
          <th scope="col" class="text-end">Qty</th>
          <th scope="col" class="text-end">Unit price</th>
          <th scope="col" class="text-end">Line total</th>
          <th scope="col">Ledger account</th>
          <th scope="col" class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>INV-2031</td>
          <td>Hikari Retail</td>
          <td>Implementation services</td>
          <td class="text-end">40</td>
          <td class="text-end">10,500</td>
          <td class="text-end">420,000</td>
          <td>Revenue &gt; Services</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-secondary">View</button>
          </td>
        </tr>
        <tr>
          <td>INV-2030</td>
          <td>Sumire Foods</td>
          <td>Support retainer</td>
          <td class="text-end">1</td>
          <td class="text-end">280,000</td>
          <td class="text-end">280,000</td>
          <td>Revenue &gt; Services</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-secondary">View</button>
          </td>
        </tr>
        <tr>
          <td>INV-2026</td>
          <td>Blue Crane Ltd.</td>
          <td>Custom hardware</td>
          <td class="text-end">5</td>
          <td class="text-end">62,000</td>
          <td class="text-end">310,000</td>
          <td>Revenue &gt; Hardware</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-secondary">View</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
@endsection
