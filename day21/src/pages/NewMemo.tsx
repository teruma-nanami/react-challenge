import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function NewMemo() {
  return (
    <Box>
      <Heading size="lg" mb={6}>
        新規メモ作成
      </Heading>

      <VStack align="stretch" spacing={5}>
        <FormControl>
          <FormLabel>タイトル</FormLabel>
          <Input placeholder="タイトルを入力" />
        </FormControl>

        <FormControl>
          <FormLabel>本文</FormLabel>
          <Textarea placeholder="本文を入力" rows={8} />
        </FormControl>

        <ButtonGroup>
          <Button colorScheme="teal">保存</Button>
          <Button variant="outline">クリア</Button>
          <Link as={RouterLink} to="/" ml={2}>
            キャンセル（一覧へ）
          </Link>
        </ButtonGroup>
      </VStack>
    </Box>
  );
}
