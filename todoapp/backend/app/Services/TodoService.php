<?php

namespace App\Services;

use App\Models\Todo;
use Illuminate\Support\Collection;

class TodoService
{
  public function getTodos(string $auth0UserId): Collection
  {
    return Todo::where('auth0_user_id', $auth0UserId)
      ->orderBy('created_at', 'desc')
      ->get();
  }

  public function createTodo(string $auth0UserId, string $title): Todo
  {
    return Todo::create([
      'auth0_user_id' => $auth0UserId,
      'title' => $title,
      'is_completed' => false,
    ]);
  }

  public function updateTodo(string $auth0UserId, int $todoId, array $data): Todo
  {
    $todo = Todo::where('auth0_user_id', $auth0UserId)
      ->where('id', $todoId)
      ->firstOrFail();

    $todo->update($data);

    return $todo;
  }

  public function deleteTodo(string $auth0UserId, int $todoId): void
  {
    Todo::where('auth0_user_id', $auth0UserId)
      ->where('id', $todoId)
      ->firstOrFail()
      ->delete();
  }
}