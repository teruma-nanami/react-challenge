import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import type { Task } from "../types/Task";
import { UpdateTaskModal } from "./modal/UpdateTaskModal";

type Props = {
  tasks: Task[];
  toggleTask: (id: string) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
};

export const TaskList = ({
  tasks,
  toggleTask,
  updateTask,
  deleteTask,
}: Props) => {
  return (
    <Box>
      {tasks.map((task: Task) => (
        <Flex
          key={task.id}
          borderWidth="1px"
          borderRadius="md"
          p={4}
          mb={2}
          align="center"
          justify="space-between"
        >
          {/* 左側：タイトルとメモ */}
          <Box>
            <Checkbox
              isChecked={task.isDone}
              onChange={() => toggleTask(task.id)}
              colorScheme="orange"
            >
              {task.title}
            </Checkbox>
            {task.notes && (
              <Text fontSize="sm" color="gray.500" mt={1}>
                {task.notes}
              </Text>
            )}
          </Box>

          {/* 右側：操作ボタン */}
          <HStack spacing={2}>
            {!task.isDone && (
              <UpdateTaskModal task={task} updateTask={updateTask} />
            )}
            <IconButton
              aria-label="削除"
              icon={<DeleteIcon />}
              size="sm"
              colorScheme="red"
              onClick={() => deleteTask(task.id)}
            />
          </HStack>
        </Flex>
      ))}
    </Box>
  );
};
