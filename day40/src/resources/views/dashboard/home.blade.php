@extends('layouts.app')

@section('content')
  <h1>Dashboard</h1>

  <div class="list-group mt-4">
    <a class="list-group-item list-group-item-action" href="{{ url('/') }}">Welcome</a>
    <a class="list-group-item list-group-item-action" href="{{ route('setup.initial') }}">Setup - Initial</a>
    <a class="list-group-item list-group-item-action" href="{{ route('login') }}">Login</a>
    <a class="list-group-item list-group-item-action" href="{{ route('register') }}">Register</a>
    <a class="list-group-item list-group-item-action" href="{{ route('password.request') }}">Password Reset</a>
    <a class="list-group-item list-group-item-action" href="{{ route('dashboard.notifications') }}">Dashboard -
      Notifications</a>
    <a class="list-group-item list-group-item-action" href="{{ route('entries.index') }}">Entries</a>
    <a class="list-group-item list-group-item-action" href="{{ route('entries.create') }}">Create Entry</a>
    <a class="list-group-item list-group-item-action" href="{{ route('depreciation.assets') }}">Depreciation - Assets</a>
    <a class="list-group-item list-group-item-action" href="{{ route('depreciation.wizard') }}">Depreciation - Wizard</a>
    <a class="list-group-item list-group-item-action" href="{{ route('filing.annual_summary') }}">Filing - Annual
      Summary</a>
    <a class="list-group-item list-group-item-action" href="{{ route('filing.deduction_input') }}">Filing -
      Deductions</a>
    <a class="list-group-item list-group-item-action" href="{{ route('filing.entries_summary') }}">Filing - Entries
      Summary</a>
    <a class="list-group-item list-group-item-action" href="{{ route('filing.preview') }}">Filing - Preview</a>
    <a class="list-group-item list-group-item-action" href="{{ route('filing.pdf_download') }}">Filing - PDF Download</a>
    <a class="list-group-item list-group-item-action" href="{{ route('invoice.dashboard') }}">Invoice Dashboard</a>
    <a class="list-group-item list-group-item-action" href="{{ route('invoice.entries') }}">Invoice Entries</a>
    <a class="list-group-item list-group-item-action" href="{{ route('chatbot.index') }}">Chatbot</a>
    <a class="list-group-item list-group-item-action" href="{{ route('settings.profile') }}">Settings - Profile</a>
    <a class="list-group-item list-group-item-action" href="{{ route('settings.ledger_status') }}">Settings - Ledger
      Status</a>
  </div>
@endsection
