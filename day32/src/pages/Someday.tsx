import { Badge, Box, Button, Divider, Heading, VStack } from "@chakra-ui/react";

export default function Someday() {
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
        いつかやるタスク一覧
      </Heading>

      <VStack align="stretch" spacing={8}>
        {/* 登録済みタスク */}
        <Box>
          <Heading size="md" mb={3} color="orange.500">
            登録済みのタスク <Badge colorScheme="yellow">List</Badge>
          </Heading>
          {/* SomedayItem をここに並べる */}
          <Divider borderColor="yellow.200" />
        </Box>

        {/* 新規作成ボタン */}
        <Box textAlign="center">
          <Button colorScheme="orange" size="lg">
            タスクを追加
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
