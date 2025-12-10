import {
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

export default function HousekeepList() {
  const expenses = [
    { date: "2025-12-01", category: "食費", amount: 1200, memo: "ランチ代" },
    { date: "2025-12-02", category: "交通費", amount: 500, memo: "バス代" },
    { date: "2025-12-03", category: "日用品", amount: 800, memo: "洗剤" },
    { date: "2025-12-04", category: "娯楽", amount: 3000, memo: "映画" },
  ];

  // カテゴリごとの色マップ
  const categoryColors: Record<string, string> = {
    食費: "green",
    交通費: "blue",
    日用品: "orange",
    娯楽: "purple",
  };

  return (
    <Box p={6}>
      <Heading mb={6} color="brand.500">
        支出一覧
      </Heading>

      <Button colorScheme="blue" mb={4}>
        新規追加
      </Button>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
        {expenses.map((item, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            shadow="sm"
          >
            <Text fontWeight="bold" color="brand.500">
              {item.date}
            </Text>

            {/* カテゴリを背景色付きラベルに */}
            <Badge
              bg={`${categoryColors[item.category]}.500`}
              color="white"
              px={2}
              py={1}
              borderRadius="md"
              mt={2}
            >
              {item.category}
            </Badge>

            <Divider my={2} />

            <Text fontWeight="semibold">金額: {item.amount}円</Text>
            <Text>メモ: {item.memo}</Text>

            <HStack spacing={2} mt={3}>
              <Button size="sm" colorScheme="blue" variant="outline">
                編集
              </Button>
              <Button size="sm" colorScheme="red" variant="outline">
                削除
              </Button>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
