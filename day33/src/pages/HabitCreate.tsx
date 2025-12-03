import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";

export default function HabitCreate() {
  return (
    <Box
      p={6}
      bg="yellow.50"
      borderRadius="md"
      boxShadow="md"
      maxW="800px"
      mx="auto"
    >
      {/* ページタイトル */}
      <Heading size="lg" mb={6} color="orange.900" textAlign="center">
        習慣の新規作成
      </Heading>

      <VStack align="stretch" spacing={6}>
        {/* 習慣名 */}
        <FormControl>
          <FormLabel color="orange.500">習慣名</FormLabel>
          <Input placeholder="例: 散歩" focusBorderColor="orange.400" />
        </FormControl>

        {/* 頻度 */}
        <FormControl>
          <FormLabel color="orange.500">頻度</FormLabel>
          <Select placeholder="選択してください" focusBorderColor="orange.400">
            <option value="daily">毎日</option>
            <option value="weekly">毎週</option>
            <option value="monthly">毎月</option>
            {/* <option value="custom">カスタム</option> */}
          </Select>
        </FormControl>

        {/* 曜日選択 */}
        <FormControl>
          <FormLabel color="orange.500">曜日</FormLabel>
          <SimpleGrid columns={7} spacing={2}>
            <Checkbox value="sun" colorScheme="orange">
              日
            </Checkbox>
            <Checkbox value="mon" colorScheme="orange">
              月
            </Checkbox>
            <Checkbox value="tue" colorScheme="orange">
              火
            </Checkbox>
            <Checkbox value="wed" colorScheme="orange">
              水
            </Checkbox>
            <Checkbox value="thu" colorScheme="orange">
              木
            </Checkbox>
            <Checkbox value="fri" colorScheme="orange">
              金
            </Checkbox>
            <Checkbox value="sat" colorScheme="orange">
              土
            </Checkbox>
          </SimpleGrid>
        </FormControl>

        {/* 時間帯 */}
        <FormControl>
          <FormLabel color="orange.500">時間帯</FormLabel>
          <Select placeholder="選択してください" focusBorderColor="orange.400">
            <option value="morning">朝</option>
            <option value="afternoon">昼</option>
            <option value="evening">夜</option>
          </Select>
        </FormControl>

        {/* 保存ボタン */}
        <Button colorScheme="orange" size="lg" alignSelf="center">
          保存
        </Button>
      </VStack>
    </Box>
  );
}
