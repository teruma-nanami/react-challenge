import { useEffect, useState } from "react";
import type { Todo } from "../types/todos";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:8080/api/todos", {
      headers: {
        Accept: "application/json",
        "X-Auth0-User-Id": "auth0|test-user",
      },
    });
    const data: Todo[] = await res.json();
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    setSubmitting(true);
    await fetch("http://localhost:8080/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Auth0-User-Id": "auth0|test-user",
      },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    setSubmitting(false);
    fetchTodos();
  };

  const toggleTodo = async (todo: Todo) => {
    await fetch(`http://localhost:8080/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Auth0-User-Id": "auth0|test-user",
      },
      body: JSON.stringify({
        is_completed: todo.is_completed ? 0 : 1,
      }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:8080/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "X-Auth0-User-Id": "auth0|test-user",
      },
    });
    fetchTodos();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const incompleteTodos = todos.filter(
  (todo) => !todo.is_completed
);

const completedTodos = todos.filter(
  (todo) => todo.is_completed
);

return (
  <div>
    <h1>Todo List</h1>

    <TodoForm
      title={title}
      submitting={submitting}
      onChange={setTitle}
      onSubmit={addTodo}
    />

    <h2>未完了</h2>
    {incompleteTodos.length === 0 ? (
      <p>未完了のTodoはありません</p>
    ) : (
      <TodoList
        todos={incompleteTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    )}

    <h2>完了</h2>
    {completedTodos.length === 0 ? (
      <p>完了したTodoはありません</p>
    ) : (
      <TodoList
        todos={completedTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    )}
  </div>
);
}

export default Todos;