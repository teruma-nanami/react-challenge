import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Box p={6}>
      {/* ヘッダー */}
      <Heading mb={6} color="brand.500">
        Dashboard
      </Heading>

      {/* サマリーカード */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Stat p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <StatLabel>今月の支出</StatLabel>
          <StatNumber color="brand.500">¥120,000</StatNumber>
        </Stat>
        <Stat p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <StatLabel>今月の収入</StatLabel>
          <StatNumber color="brand.500">¥200,000</StatNumber>
        </Stat>
        <Stat p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <StatLabel>残高</StatLabel>
          <StatNumber color="brand.500">¥80,000</StatNumber>
        </Stat>
      </SimpleGrid>

      {/* グラフエリア（仮置き） */}
      <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" mb={8}>
        <Heading size="md" mb={4}>
          カテゴリ別支出割合
        </Heading>
        <Box h="200px" bg="gray.100" borderRadius="md">
          {/* ここにグラフコンポーネントを後で追加 */}
        </Box>
      </Box>

      {/* 最近の支出リスト（仮置き） */}
      <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading size="md" mb={4}>
          最近の支出
        </Heading>
        <VStack align="stretch" spacing={2}>
          <Box p={2} bg="gray.50" borderRadius="md">
            12/01 食費 ¥1,200
          </Box>
          <Box p={2} bg="gray.50" borderRadius="md">
            12/02 交通費 ¥500
          </Box>
          <Box p={2} bg="gray.50" borderRadius="md">
            12/03 書籍 ¥2,000
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;
