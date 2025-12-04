import { Badge, Box, Divider, Heading, VStack } from "@chakra-ui/react";
import AddTaskModal from "../components/AddTaskModal";

export default function Today() {
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
      <Heading size="lg" mb={6} color="orange.900" textAlign="center">
        今日のタスク一覧
      </Heading>

      <AddTaskModal onSave={(title) => console.log(title)} />
      <VStack align="stretch" spacing={8}>
        {/* 通常タスク */}
        <Box>
          <Heading size="md" mb={3} color="orange.500">
            本日のタスク <Badge colorScheme="yellow">Normal</Badge>
          </Heading>
          {/* TaskItem をここに並べる */}
          <Divider borderColor="yellow.200" />
        </Box>

        {/* 習慣タスク */}
        <Box>
          <Heading size="md" mb={3} color="orange.500">
            習慣タスク <Badge colorScheme="yellow">Habit</Badge>
          </Heading>
          {/* HabitItem をここに並べる */}
          <Divider borderColor="yellow.200" />
        </Box>

        {/* 完了済みタスク */}
        <Box>
          <Heading size="md" mb={3} color="orange.500">
            完了済み <Badge colorScheme="green">Done</Badge>
          </Heading>
          {/* 完了した TaskItem をここに並べる */}
          <Divider borderColor="green.200" />
        </Box>
      </VStack>
    </Box>
  );
}
