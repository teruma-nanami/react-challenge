@extends('layouts.app')

@section('content')
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h1 class="h3 mb-1">Profile & Preferences</h1>
      <p class="text-muted mb-0">Update your contact details, security settings, and notification preferences.</p>
    </div>
    <button class="btn btn-outline-secondary">View audit log</button>
  </div>

  <div class="row g-3">
    <div class="col-lg-6">
      <div class="card h-100">
        <div class="card-header">Contact information</div>
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label for="profileName" class="form-label">Full name</label>
              <input type="text" id="profileName" class="form-control" value="Mai Sato">
            </div>
            <div class="mb-3">
              <label for="profileEmail" class="form-label">Email</label>
              <input type="email" id="profileEmail" class="form-control" value="mai.sato@example.com">
            </div>
            <div class="mb-3">
              <label for="profilePhone" class="form-label">Phone</label>
              <input type="tel" id="profilePhone" class="form-control" value="03-1234-5678">
            </div>
            <div class="mb-3">
              <label for="profileLanguage" class="form-label">Preferred language</label>
              <select id="profileLanguage" class="form-select">
                <option>Japanese</option>
                <option>English</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary">Save changes</button>
          </form>
        </div>
      </div>
    </div>

    <div class="col-lg-6">
      <div class="card h-100">
        <div class="card-header">Security</div>
        <div class="card-body">
          <p class="mb-3">Keep your account secure with multi-factor authentication.</p>
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" id="mfaEnabled" checked>
            <label class="form-check-label" for="mfaEnabled">Enable MFA via authenticator app</label>
          </div>
          <button class="btn btn-outline-secondary mb-3">Reset password</button>
          <p class="text-muted small mb-2">Trusted devices</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              MacBook Pro &ndash; Tokyo
              <button class="btn btn-sm btn-outline-danger">Remove</button>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Pixel 8 &ndash; Last used 2 days ago
              <button class="btn btn-sm btn-outline-danger">Remove</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="card mt-4">
    <div class="card-header">Notifications</div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label">Email alerts</label>
          <select class="form-select">
            <option>All updates</option>
            <option>Important only</option>
            <option>Off</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Slack integration</label>
          <select class="form-select">
            <option>Daily summary</option>
            <option>Only urgent</option>
            <option>Off</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Approvals</label>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="notifyApprovals" checked>
            <label class="form-check-label" for="notifyApprovals">Notify me when approvals are required</label>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection
