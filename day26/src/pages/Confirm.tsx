// src/pages/Confirm.tsx
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Confirm = () => {
  const [contact, setContact] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("contact");
    if (data) {
      setContact(JSON.parse(data));
    }
  }, []);

  const handleBack = () => {
    navigate("/contact");
  };

  const handleSubmit = () => {
    // 本来ならここでサーバー送信処理を行う
    // 今回は localStorage に保持したまま完了ページへ遷移
    navigate("/thanks");
  };

  if (!contact) {
    return (
      <Box textAlign="center" mt={10}>
        <Text>お問い合わせ内容が見つかりません。</Text>
        <Button mt={4} colorScheme="teal" onClick={() => navigate("/contact")}>
          フォームへ戻る
        </Button>
      </Box>
    );
  }

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={10}
      p={6}
      borderWidth="1px"
      borderRadius="md"
    >
      <Heading size="md" mb={6}>
        お問い合わせ内容の確認
      </Heading>
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontWeight="bold">お名前</Text>
          <Text>{contact.name}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">メールアドレス</Text>
          <Text>{contact.email}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">お問い合わせ内容</Text>
          <Text whiteSpace="pre-wrap">{contact.message}</Text>
        </Box>

        <VStack spacing={4} mt={6}>
          <Button colorScheme="gray" onClick={handleBack} w="100%">
            修正する
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit} w="100%">
            送信する
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Confirm;
