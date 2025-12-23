<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TodoService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;

class TodoController extends Controller
{
    public function __construct(
        private TodoService $todoService
    ) {}

    /**
     * GET /api/todos
     */
    public function index(Request $request): JsonResponse
    {
        $auth0UserId = $request->header('X-Auth0-User-Id');

        $todos = $this->todoService->getTodos($auth0UserId);

        return response()->json($todos);
    }

    /**
     * POST /api/todos
     */
    public function store(StoreTodoRequest $request): JsonResponse
    {
        $auth0UserId = $request->header('X-Auth0-User-Id');

        $todo = $this->todoService->createTodo(
            $auth0UserId,
            $request->input('title')
        );

        return response()->json($todo, 201);
    }

    /**
     * PUT /api/todos/{id}
     */
    public function update(UpdateTodoRequest $request, int $id): JsonResponse
    {
        $auth0UserId = $request->header('X-Auth0-User-Id');

        $todo = $this->todoService->updateTodo(
            $auth0UserId,
            $id,
            $request->only(['title', 'is_completed'])
        );

        return response()->json($todo);
    }

    /**
     * DELETE /api/todos/{id}
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $auth0UserId = $request->header('X-Auth0-User-Id');

        $this->todoService->deleteTodo($auth0UserId, $id);

        return response()->json(null, 204);
    }
}