<?php

namespace App\Http\Controllers\Api;

use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;

class TaskController extends ApiController
{
    public function __construct(private TaskService $taskService) {}

    /**
     * GET /api/tasks
     */
    public function index(Request $request): JsonResponse
    {
        $tasks = $this->taskService->getTasks($this->auth0UserId($request));

        return $this->ok($tasks);
    }

    /**
     * POST /api/tasks
     */
    public function store(TaskRequest $request): JsonResponse
    {
        $task = $this->taskService->createTask($this->auth0UserId($request), $request->validated());

        return $this->created($task);
    }

    /**
     * PUT /api/tasks/{id}
     */

    public function update(TaskRequest $request, int $id): JsonResponse
    {
        $task = $this->taskService->updateTask($this->auth0UserId($request), $id, $request->validated());

        return $this->ok($task);
    }

    /**
     * DELETE /api/tasks/{id}
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $this->taskService->deleteTask($this->auth0UserId($request), $id);

        return $this->noContent();
    }
}
