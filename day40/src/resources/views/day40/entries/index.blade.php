@extends('layouts.layout')

@section('content')
<h1>Entries</h1>
<p><a class="btn btn-primary" href="#">Create Entry</a></p>
<table class="table table-sm">
  <thead>
    <tr><th>ID</th><th>Ledger</th><th>Date</th><th>Amount</th><th></th></tr>
  </thead>
  <tbody></tbody>
</table>
@endsection
