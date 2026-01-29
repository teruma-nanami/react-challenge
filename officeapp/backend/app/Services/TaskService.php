<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Database\Eloquent\Builder;

class TaskService
{
    public function getTasks(string $auth0UserId): Builder
    {
        return Task::query()
            ->where('auth0_user_id', $auth0UserId);
    }

    public function createTask(string $auth0UserId, array $data): Task
    {
        return Task::create([
            'auth0_user_id' => $auth0UserId,
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'] ?? 'todo',
            'due_date' => $data['due_date'] ?? null,
        ]);
    }

    public function updateTask(string $auth0UserId, int $taskId, array $data): Task
    {
        $task = Task::where('auth0_user_id', $auth0UserId)
            ->where('id', $taskId)
            ->firstOrFail();

        $task->update($data);

        return $task;
    }

    public function deleteTask(string $auth0UserId, int $taskId): void
    {
        Task::where('auth0_user_id', $auth0UserId)
            ->where('id', $taskId)
            ->firstOrFail()
            ->delete();
    }
}
