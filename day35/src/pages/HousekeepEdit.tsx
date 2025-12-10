import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export default function HouseKeepEdit() {
  return (
    <Box p={6}>
      {/* ヘッダー */}
      <Heading mb={6} color="brand.500">
        支出編集
      </Heading>

      {/* フォーム */}
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>日付</FormLabel>
          <Input type="date" defaultValue="2025-12-01" />
        </FormControl>

        <FormControl>
          <FormLabel>カテゴリ</FormLabel>
          <Select defaultValue="food">
            <option value="food">食費</option>
            <option value="transport">交通費</option>
            <option value="entertainment">娯楽</option>
            <option value="other">その他</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>金額</FormLabel>
          <Input type="number" defaultValue="1200" />
        </FormControl>

        <FormControl>
          <FormLabel>メモ</FormLabel>
          <Textarea defaultValue="ランチ代" />
        </FormControl>

        <Button colorScheme="blue" size="lg">
          更新
        </Button>
      </VStack>
    </Box>
  );
}
