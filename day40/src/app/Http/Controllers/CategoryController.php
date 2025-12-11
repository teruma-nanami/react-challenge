<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
  protected $service;

  public function __construct(CategoryService $service)
  {
    $this->service = $service;
  }

  public function index()
  {
    return response()->json($this->service->list());
  }

  public function show($id)
  {
    return response()->json($this->service->get($id));
  }

  public function store(Request $request)
  {
    $item = $this->service->create($request->all());
    return response()->json($item, 201);
  }

  public function update(Request $request, $id)
  {
    return response()->json($this->service->update($id, $request->all()));
  }

  public function destroy($id)
  {
    $this->service->delete($id);
    return response()->noContent();
  }
}
