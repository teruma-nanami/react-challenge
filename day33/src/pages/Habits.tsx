import { Badge, Box, Divider, Heading, VStack } from "@chakra-ui/react";
import AddHabitModal from "../components/AddHabitModal";

export default function Habits() {
  return (
    <Box
      p={6}
      bg="yellow.50"
      borderRadius="md"
      boxShadow="md"
      maxW="800px" // PC用横幅制限
      mx="auto" // 中央寄せ
    >
      {/* ページタイトル */}
      <Heading size="lg" mb={6} color="orange.900" textAlign="center">
        習慣一覧
      </Heading>

      <VStack align="stretch" spacing={8}>
        {/* 登録済み習慣 */}
        <Box>
          <Heading size="md" mb={3} color="orange.500">
            登録済みの習慣 <Badge colorScheme="yellow">List</Badge>
          </Heading>
          {/* HabitItem をここに並べる */}
          <Divider borderColor="yellow.200" />
        </Box>

        {/* 新規作成ボタン */}
        <Box textAlign="center">
          <AddHabitModal />
        </Box>
      </VStack>
    </Box>
  );
}
