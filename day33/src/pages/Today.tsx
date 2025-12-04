import { Badge, Box, Divider, Flex, Heading, VStack } from "@chakra-ui/react";
import { HabitList } from "../components/HabitList";
import { AddTaskModal } from "../components/modal/AddTaskModal";
import { TaskList } from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";

export default function Today() {
  const { tasks, addTask, toggleTask, updateTask, deleteTask } = useTasks();

  return (
    <Box
      p={6}
      bg="yellow.50"
      borderRadius="md"
      boxShadow="md"
      maxW="800px" // 横幅制限（PC用）
      mx="auto" // 中央寄せ
    >
      {/* ページタイトル */}
      <Flex align="center" justify="space-between" mb={6}>
        <Heading size="lg" color="orange.900" textAlign="center" flex="1">
          今日のタスク一覧
        </Heading>
        <Box>
          <AddTaskModal addTask={addTask} />
        </Box>
      </Flex>

      <VStack align="stretch" spacing={8}>
        {/* 通常タスク */}
        <Box>
          <Heading size="md" mb={3} color="orange.500">
            本日のタスク <Badge colorScheme="yellow">Normal</Badge>
          </Heading>
          <TaskList
            tasks={tasks.filter((task) => !task.isDone)}
            toggleTask={toggleTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
          <Divider borderColor="yellow.200" />
        </Box>

        {/* 習慣タスク */}
        <Box>
          <Heading size="md" mb={3} color="orange.500">
            習慣タスク <Badge colorScheme="yellow">Habit</Badge>
          </Heading>
          <HabitList />
          <Divider borderColor="yellow.200" />
        </Box>

        {/* 完了済みタスク */}
        <Box>
          <Heading size="md" mb={3} color="orange.500">
            完了済み <Badge colorScheme="green">Done</Badge>
          </Heading>
          <TaskList
            tasks={tasks.filter((task) => task.isDone)}
            toggleTask={toggleTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
          <Divider borderColor="green.200" />
        </Box>
      </VStack>
    </Box>
  );
}
