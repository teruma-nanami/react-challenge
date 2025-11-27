// src/pages/Thanks.tsx
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Thanks = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    // localStorage をクリア（必要に応じて）
    localStorage.removeItem("contact");
    navigate("/");
  };

  return (
    <Box maxW="600px" mx="auto" mt={10} p={6} textAlign="center">
      <VStack spacing={6}>
        <Heading size="lg" color="teal.600">
          お問い合わせありがとうございました
        </Heading>
        <Text fontSize="md" color="gray.600">
          ご入力いただいた内容を受け付けました。
        </Text>
        <Button colorScheme="teal" onClick={handleBackHome}>
          ホームへ戻る
        </Button>
      </VStack>
    </Box>
  );
};
export default Thanks;
