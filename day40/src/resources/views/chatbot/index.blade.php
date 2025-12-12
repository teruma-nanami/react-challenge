@extends('layouts.app')

@section('content')
  <div class="row g-3">
    <div class="col-lg-4 order-lg-2">
      <div class="card h-100">
        <div class="card-header">Suggested prompts</div>
        <div class="card-body">
          <ul class="list-unstyled mb-0">
            <li class="mb-2"><button class="btn btn-sm btn-outline-secondary w-100">Summarize April transactions</button>
            </li>
            <li class="mb-2"><button class="btn btn-sm btn-outline-secondary w-100">Explain variance in payroll</button>
            </li>
            <li class="mb-2"><button class="btn btn-sm btn-outline-secondary w-100">List tax filing tasks this
                week</button></li>
            <li><button class="btn btn-sm btn-outline-secondary w-100">Generate invoice email</button></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card h-100">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>
            <h1 class="h5 mb-0">Copilot Assistant</h1>
            <small class="text-muted">Ask questions about ledgers, filings, or configuration.</small>
          </div>
          <span class="badge text-bg-info text-dark">Prototype</span>
        </div>
        <div class="card-body d-flex flex-column" style="min-height: 420px;">
          <div class="flex-grow-1 overflow-auto mb-3">
            <div class="mb-3">
              <div class="fw-bold">You</div>
              <div class="text-muted">Show me high-value expenses in April.</div>
            </div>
            <div class="mb-3">
              <div class="fw-bold">Assistant</div>
              <div class="text-muted">Top two categories were Payroll (980,000) and Rent (120,000). Variance vs plan is
                +6.5% for Payroll.</div>
            </div>
            <div class="mb-3">
              <div class="fw-bold">You</div>
              <div class="text-muted">Set a reminder to review the tax return draft.</div>
            </div>
            <div>
              <div class="fw-bold">Assistant</div>
              <div class="text-muted">Reminder scheduled for 2025-04-22 09:00 with Mai Sato.</div>
            </div>
          </div>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Ask about filings, ledgers, or settings">
            <button class="btn btn-primary" type="button">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection
