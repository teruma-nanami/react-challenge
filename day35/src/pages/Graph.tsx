import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

export default function Graph() {
  return (
    <Box p={6}>
      {/* ヘッダー */}
      <Heading mb={6} color="brand.500">
        グラフ表示
      </Heading>

      {/* グラフカード群 */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* カテゴリ別支出割合 */}
        <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading size="md" mb={4}>
            カテゴリ別支出割合
          </Heading>
          <Box h="250px" bg="gray.100" borderRadius="md">
            {/* 円グラフコンポーネントをここに追加予定 */}
          </Box>
        </Box>

        {/* 月別支出推移 */}
        <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading size="md" mb={4}>
            月別支出推移
          </Heading>
          <Box h="250px" bg="gray.100" borderRadius="md">
            {/* 棒グラフコンポーネントをここに追加予定 */}
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
