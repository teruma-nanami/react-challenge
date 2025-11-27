// src/pages/404.tsx
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h1"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        ページが見つかりません
      </Text>
      <Text color={"gray.500"} mb={6}>
        指定されたページは存在しないか、移動しました。
      </Text>

      <Button as={RouterLink} to="/" colorScheme="teal" variant="solid">
        ホームに戻る
      </Button>
    </Box>
  );
};

export default NotFound;
