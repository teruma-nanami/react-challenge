<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\TaskRequest;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends ApiController
{
    public function __construct(private TaskService $taskService) {}

    /**
     * Auth0 user id 取得（Controller内共通）
     */
    private function auth0UserIdFromRequest(Request $request): string
    {
        return $this->auth0UserId($request);
    }

    /**
     * GET /api/tasks
     */
    public function index(Request $request): JsonResponse
    {
        $auth0UserId = $this->auth0UserId($request);

        $tasks = $this->taskService
            ->getTasks($auth0UserId)
            ->orderByDesc('created_at')
            ->get();

        return $this->ok($tasks);
    }

    /**
     * POST /api/tasks
     */
    public function store(TaskRequest $request): JsonResponse
    {
        $task = $this->taskService->createTask(
            $this->auth0UserIdFromRequest($request),
            $request->validated()
        );

        return $this->created($task);
    }

    /**
     * PUT /api/tasks/{id}
     */
    public function update(TaskRequest $request, int $id): JsonResponse
    {
        $task = $this->taskService->updateTask(
            $this->auth0UserIdFromRequest($request),
            $id,
            $request->validated()
        );

        return $this->ok($task);
    }

    /**
     * DELETE /api/tasks/{id}
     */
    public function destroy(Request $request, int $id): Response
    {
        $this->taskService->deleteTask(
            $this->auth0UserIdFromRequest($request),
            $id
        );

        return $this->deletedResponse();
    }
}
