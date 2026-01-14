import { useEffect, useState } from "react";
import type { Todo } from "../types/todos";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { useAuth0 } from "@auth0/auth0-react";

function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, isLoading: authLoading } = useAuth0();
  const auth0UserId = user?.sub;

useEffect(() => {
  if (!auth0UserId) return;

  const loadTodos = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:8080/api/todos", {
      headers: {
        Accept: "application/json",
        "X-Auth0-User-Id": auth0UserId,
      },
    });

    const data: Todo[] = await res.json();
    setTodos(data);
    setLoading(false);
  };

  loadTodos();
}, [auth0UserId]);

  const fetchTodos = async () => {
    if (!auth0UserId) return;
    const res = await fetch("http://localhost:8080/api/todos", {
      headers: {
        Accept: "application/json",
        "X-Auth0-User-Id": auth0UserId,
      },
    });
    const data: Todo[] = await res.json();
    setTodos(data);
    setLoading(false);
  };

  const addTodo = async () => {
    if (!auth0UserId) return;
    if (!title.trim()) return;

    setSubmitting(true);
    await fetch("http://localhost:8080/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Auth0-User-Id": auth0UserId,
      },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    setSubmitting(false);
    fetchTodos();
  };

  const toggleTodo = async (todo: Todo) => {
    if (!auth0UserId) return;
    await fetch(`http://localhost:8080/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Auth0-User-Id": auth0UserId,
      },
      body: JSON.stringify({
        is_completed: todo.is_completed ? 0 : 1,
      }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    if (!auth0UserId) return;
    await fetch(`http://localhost:8080/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "X-Auth0-User-Id": auth0UserId,
      },
    });
    fetchTodos();
  };

if (authLoading) {
  return <div>Auth Loading...</div>;
}

if (loading) {
  return <div>Todos Loading...</div>;
}
  if (error) return <div>{error}</div>;

  const incompleteTodos = todos.filter((todo) => !todo.is_completed);

  const completedTodos = todos.filter((todo) => todo.is_completed);

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
