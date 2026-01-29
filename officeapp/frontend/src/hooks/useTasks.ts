// src/hooks/useTasks.ts
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import type { ApiResponse } from "../types/api";
import type { Task, TaskStatus } from "../types/task";
import { unwrapList } from "../utils/response";
import { useAuthReady } from "./useAuthReady";

type AddTaskParams = {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
};

export function useTasks(auth0UserId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authReady = useAuthReady();

  useEffect(() => {
    if (!authReady) return;
    fetchTasks();
  }, [authReady]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<ApiResponse<Task[]>>("/api/tasks", {
        headers: { "X-Auth0-User-Id": auth0UserId },
      });

      setTasks(unwrapList<Task>(res));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTask = async (params: AddTaskParams) => {
    if (!params.title.trim()) return;

    try {
      setSubmitting(true);
      setError(null);

      await apiFetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth0-User-Id": auth0UserId,
        },
        body: JSON.stringify({
          title: params.title,
          description: params.description.trim() || null,
          status: params.status,
          due_date: params.dueDate || null,
        }),
      });

      await fetchTasks();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const updateTaskStatus = async (task: Task, next: TaskStatus) => {
    try {
      setError(null);

      await apiFetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Auth0-User-Id": auth0UserId,
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: next,
          due_date: task.due_date,
        }),
      });

      await fetchTasks();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setError(null);

      await apiFetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: { "X-Auth0-User-Id": auth0UserId },
      });

      await fetchTasks();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    }
  };

  return {
    tasks,
    loading,
    submitting,
    error,
    addTask,
    updateTaskStatus,
    deleteTask,
  };
}
