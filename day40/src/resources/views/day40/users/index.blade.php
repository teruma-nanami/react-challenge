@extends('layouts.layout')

@section('content')
<h1>Users</h1>
<p><a class="btn btn-primary" href="#">Create User</a></p>
<table class="table table-sm">
  <thead>
    <tr><th>ID</th><th>Name</th><th>Email</th><th></th></tr>
  </thead>
  <tbody>
    {{-- Items will be rendered by controller/view data --}}
  </tbody>
</table>
@endsection
