// src/components/tasks/TaskView.tsx
import { Box, Heading, Text, VStack, HStack, Divider } from "@chakra-ui/react";

import type { Task, TaskStatus } from "../../types/task";
import TaskAddModal from "./TaskAddModal";
import TaskItem from "./TaskItem";
import PrimaryButton from "../ui/PrimaryButton";

import { useTaskForm } from "../../hooks/useTaskForm";

type Props = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  submitting: boolean;

  onAddTask: (params: {
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: string;
  }) => Promise<void>;

  onUpdateStatus: (task: Task, next: TaskStatus) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

function TaskView({
  tasks,
  loading,
  error,
  submitting,
  onAddTask,
  onUpdateStatus,
  onDelete,
}: Props) {
  const form = useTaskForm(onAddTask);

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  const taskGroups: Array<[string, Task[]]> = [
    ["todo", todoTasks],
    ["in_progress", inProgressTasks],
    ["done", doneTasks],
  ];

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box maxW="800px" mx="auto">
      <HStack justify="space-between" mb={4}>
        <Heading>Tasks</Heading>
        <PrimaryButton onClick={form.open}>追加</PrimaryButton>
      </HStack>

      {error && (
        <Text mb={4} color="red.500">
          {error}
        </Text>
      )}

      <Divider my={4} />

      {taskGroups.map(([label, list]) => (
        <Box key={label} mb={6}>
          <Heading size="md" mb={2}>
            {label}
          </Heading>

          {list.length === 0 ? (
            <Text color="gray.500">{label} のタスクはありません</Text>
          ) : (
            <VStack align="stretch" spacing={2}>
              {list.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onChangeStatus={onUpdateStatus}
                  onDelete={onDelete}
                />
              ))}
            </VStack>
          )}
        </Box>
      ))}

      <TaskAddModal
        isOpen={form.isOpen}
        isSubmitting={submitting}
        title={form.title}
        description={form.description}
        status={form.status}
        dueDate={form.dueDate}
        onChangeTitle={form.setTitle}
        onChangeDescription={form.setDescription}
        onChangeStatus={form.setStatus}
        onChangeDueDate={form.setDueDate}
        onSubmit={form.submit}
        onClose={form.close}
      />
    </Box>
  );
}

export default TaskView;
