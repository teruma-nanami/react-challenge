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

export default function HousekeepAdd() {
  return (
    <Box p={6}>
      {/* ヘッダー */}
      <Heading mb={6} color="brand.500">
        支出追加
      </Heading>

      {/* フォーム */}
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>日付</FormLabel>
          <Input type="date" />
        </FormControl>

        <FormControl>
          <FormLabel>カテゴリ</FormLabel>
          <Select placeholder="カテゴリを選択">
            <option value="food">食費</option>
            <option value="transport">交通費</option>
            <option value="entertainment">娯楽</option>
            <option value="other">その他</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>金額</FormLabel>
          <Input type="number" placeholder="¥0" />
        </FormControl>

        <FormControl>
          <FormLabel>メモ</FormLabel>
          <Textarea placeholder="任意で入力してください" />
        </FormControl>

        <Button colorScheme="blue" size="lg">
          登録
        </Button>
      </VStack>
    </Box>
  );
}
