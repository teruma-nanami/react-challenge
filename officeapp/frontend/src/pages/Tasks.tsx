import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";

import { apiFetch } from "../lib/api";
import type { ApiResponse } from "../types/api";
import type { Task, TaskStatus } from "../types/task";

function Tasks() {
  // 🔥 Auth0なしで固定ユーザー（後でAuth0に戻す）
  const auth0UserId = "auth0|test-user";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] = useState<TaskStatus>("todo");
  const [dueDate, setDueDate] = useState(""); // input type=date は string

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<ApiResponse<Task[]>>("/api/tasks", {
        headers: {
          "X-Auth0-User-Id": auth0UserId,
        },
      });

      setTasks(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      setSubmitting(true);
      setError(null);

      await apiFetch<ApiResponse<Task>>("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth0-User-Id": auth0UserId,
        },
        body: JSON.stringify({
          title,
          description: description.trim() ? description : null,
          status,
          due_date: dueDate ? dueDate : null,
        }),
      });

      // フォームクリア
      setTitle("");
      setDescription("");
      setStatus("todo");
      setDueDate("");

      // 再取得
      fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const updateTaskStatus = async (task: Task, next: TaskStatus) => {
    try {
      setError(null);

      await apiFetch<ApiResponse<Task>>(`/api/tasks/${task.id}`, {
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

      fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setError(null);

      await apiFetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "X-Auth0-User-Id": auth0UserId,
        },
      });

      fetchTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  if (loading) {
    return (
      <Box>
        <Heading size="lg" mb={4}>
          Tasks
        </Heading>
        <Spinner />
      </Box>
    );
  }

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <Box maxW="800px" mx="auto">
      <Heading mb={4}>Tasks</Heading>

      {error && (
        <Text mb={4} color="red.500">
          {error}
        </Text>
      )}

      <Box p={4} borderWidth="1px" borderRadius="xl">
        <Heading size="md" mb={3}>
          タスク追加
        </Heading>

        <VStack spacing={3} align="stretch">
          <FormControl>
            <FormLabel>タイトル</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：請求書作成"
            />
          </FormControl>

          <FormControl>
            <FormLabel>詳細</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="任意"
              rows={3}
            />
          </FormControl>

          <HStack spacing={4} align="end">
            <FormControl>
              <FormLabel>ステータス</FormLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                <option value="todo">todo</option>
                <option value="in_progress">in_progress</option>
                <option value="done">done</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>期限</FormLabel>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </FormControl>

            <Button
              colorScheme="blue"
              onClick={addTask}
              isLoading={submitting}
              loadingText="追加中"
            >
              追加
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Divider my={6} />

      <Heading size="md" mb={2}>
        todo
      </Heading>
      {todoTasks.length === 0 ? (
        <Text color="gray.500" mb={4}>
          todoのタスクはありません
        </Text>
      ) : (
        <VStack align="stretch" spacing={2} mb={6}>
          {todoTasks.map((t) => (
            <Box key={t.id} p={3} borderWidth="1px" borderRadius="lg">
              <HStack justify="space-between" align="start">
                <Box>
                  <Text fontWeight="700">{t.title}</Text>
                  {t.description && (
                    <Text fontSize="sm" color="gray.600">
                      {t.description}
                    </Text>
                  )}
                  {t.due_date && (
                    <Text fontSize="sm" color="gray.500">
                      due: {t.due_date}
                    </Text>
                  )}
                </Box>

                <HStack>
                  <Button
                    size="sm"
                    onClick={() => updateTaskStatus(t, "in_progress")}
                  >
                    進行中へ
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => deleteTask(t.id)}
                  >
                    削除
                  </Button>
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}

      <Heading size="md" mb={2}>
        in_progress
      </Heading>
      {inProgressTasks.length === 0 ? (
        <Text color="gray.500" mb={4}>
          in_progressのタスクはありません
        </Text>
      ) : (
        <VStack align="stretch" spacing={2} mb={6}>
          {inProgressTasks.map((t) => (
            <Box key={t.id} p={3} borderWidth="1px" borderRadius="lg">
              <HStack justify="space-between" align="start">
                <Box>
                  <Text fontWeight="700">{t.title}</Text>
                  {t.description && (
                    <Text fontSize="sm" color="gray.600">
                      {t.description}
                    </Text>
                  )}
                  {t.due_date && (
                    <Text fontSize="sm" color="gray.500">
                      due: {t.due_date}
                    </Text>
                  )}
                </Box>

                <HStack>
                  <Button size="sm" onClick={() => updateTaskStatus(t, "todo")}>
                    todoへ
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => updateTaskStatus(t, "done")}
                  >
                    完了へ
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => deleteTask(t.id)}
                  >
                    削除
                  </Button>
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}

      <Heading size="md" mb={2}>
        done
      </Heading>
      {doneTasks.length === 0 ? (
        <Text color="gray.500">doneのタスクはありません</Text>
      ) : (
        <VStack align="stretch" spacing={2}>
          {doneTasks.map((t) => (
            <Box key={t.id} p={3} borderWidth="1px" borderRadius="lg">
              <HStack justify="space-between" align="start">
                <Box>
                  <Text fontWeight="700">{t.title}</Text>
                  {t.description && (
                    <Text fontSize="sm" color="gray.600">
                      {t.description}
                    </Text>
                  )}
                  {t.due_date && (
                    <Text fontSize="sm" color="gray.500">
                      due: {t.due_date}
                    </Text>
                  )}
                </Box>

                <HStack>
                  <Button
                    size="sm"
                    onClick={() => updateTaskStatus(t, "in_progress")}
                  >
                    戻す
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => deleteTask(t.id)}
                  >
                    削除
                  </Button>
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default Tasks;
