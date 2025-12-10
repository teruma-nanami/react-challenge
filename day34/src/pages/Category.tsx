import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/react";

export default function Category() {
  return (
    <Box p={6}>
      {/* ヘッダー */}
      <Heading mb={6} color="brand.500">
        カテゴリ管理
      </Heading>

      {/* 新規追加フォーム */}
      <VStack spacing={4} align="stretch" mb={8}>
        <FormControl>
          <FormLabel>新しいカテゴリ名</FormLabel>
          <Input placeholder="例: 食費" />
        </FormControl>
        <Button colorScheme="blue">追加</Button>
      </VStack>

      {/* カテゴリ一覧 */}
      <Heading size="md" mb={4}>
        登録済みカテゴリ
      </Heading>
      <List spacing={3}>
        <ListItem>
          <HStack justify="space-between">
            <Box>食費</Box>
            <Button size="sm" colorScheme="red" variant="outline">
              削除
            </Button>
          </HStack>
        </ListItem>
        <ListItem>
          <HStack justify="space-between">
            <Box>交通費</Box>
            <Button size="sm" colorScheme="red" variant="outline">
              削除
            </Button>
          </HStack>
        </ListItem>
        <ListItem>
          <HStack justify="space-between">
            <Box>娯楽</Box>
            <Button size="sm" colorScheme="red" variant="outline">
              削除
            </Button>
          </HStack>
        </ListItem>
      </List>
    </Box>
  );
}
