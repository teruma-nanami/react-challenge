@extends('layouts.layout')

@section('content')
<h1>Category #{{ $id ?? '' }}</h1>
<pre>{{ json_encode($model ?? [], JSON_PRETTY_PRINT) }}</pre>
<p><a class="btn btn-secondary" href="{{ url()->previous() }}">Back</a></p>
@endsection
