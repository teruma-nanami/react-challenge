// src/components/tasks/TaskItem.tsx
import { Box, HStack, Text } from "@chakra-ui/react";

import type { Task, TaskStatus } from "../../types/task";
import PrimaryButton from "../ui/PrimaryButton";
import DangerButton from "../ui/DangerButton";
import CautionButton from "../ui/CautionButton";
import { formatYmd } from "../../utils/time";

type Props = {
  task: Task;
  onChangeStatus: (task: Task, status: TaskStatus) => void;
  onDelete: (taskId: number) => void;
};

function TaskItem({ task, onChangeStatus, onDelete }: Props) {
  return (
    <Box p={3} borderWidth="1px" borderRadius="lg">
      <HStack justify="space-between" align="start">
        <Box>
          <Text fontWeight="700">{task.title}</Text>

          {task.description && (
            <Text fontSize="sm" color="gray.600">
              {task.description}
            </Text>
          )}

          {task.due_date && (
            <Text fontSize="sm" color="gray.500">
              due: {formatYmd(task.due_date)}
            </Text>
          )}
        </Box>

        <HStack>
          {task.status !== "todo" && (
            <CautionButton
              size="sm"
              onClick={() => onChangeStatus(task, "todo")}
            >
              todoへ
            </CautionButton>
          )}

          {task.status !== "in_progress" && (
            <PrimaryButton
              size="sm"
              onClick={() => onChangeStatus(task, "in_progress")}
            >
              進行中へ
            </PrimaryButton>
          )}

          {task.status !== "done" && (
            <DangerButton
              size="sm"
              onClick={() => onChangeStatus(task, "done")}
            >
              完了へ
            </DangerButton>
          )}

          <DangerButton size="sm" onClick={() => onDelete(task.id)}>
            削除
          </DangerButton>
        </HStack>
      </HStack>
    </Box>
  );
}

export default TaskItem;
