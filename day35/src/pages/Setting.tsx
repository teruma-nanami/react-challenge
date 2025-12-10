import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Select,
  VStack,
} from "@chakra-ui/react";

export default function Setting() {
  return (
    <Box p={6}>
      {/* ヘッダー */}
      <Heading mb={6} color="brand.500">
        設定
      </Heading>

      <VStack spacing={6} align="stretch">
        {/* テーマカラー選択 */}
        <FormControl>
          <FormLabel>テーマカラー</FormLabel>
          <Select defaultValue="blue">
            <option value="blue">青</option>
            <option value="green">緑</option>
            <option value="red">赤</option>
          </Select>
        </FormControl>

        {/* データ初期化 */}
        <FormControl>
          <FormLabel>データ操作</FormLabel>
          <Button colorScheme="red" variant="solid">
            データを初期化
          </Button>
        </FormControl>
      </VStack>
    </Box>
  );
}
