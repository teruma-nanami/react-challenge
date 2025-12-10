// src/pages/Home.tsx
import { Box, Button, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

type ContactData = {
  name: string;
  email: string;
  message: string;
};

const Home = () => {
  const [contacts, setContacts] = useState<ContactData[]>([]);

  useEffect(() => {
    // localStorage からデータを読み込む
    const data = localStorage.getItem("contact");
    if (data) {
      // 単一データを配列に変換（将来的に複数件対応も可能）
      setContacts([JSON.parse(data)]);
    }
  }, []);

  return (
    <Box maxW="800px" mx="auto" mt={10} p={6}>
      <Heading size="lg" mb={6}>
        お問い合わせ一覧
      </Heading>

      {contacts.length === 0 ? (
        <Text color="gray.500">まだお問い合わせはありません。</Text>
      ) : (
        <VStack spacing={6} align="stretch">
          {contacts.map((c, index) => (
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              shadow="sm"
            >
              <Text fontWeight="bold">お名前: {c.name}</Text>
              <Text>メール: {c.email}</Text>
              <Divider my={2} />
              <Text whiteSpace="pre-wrap">{c.message}</Text>
            </Box>
          ))}
        </VStack>
      )}

      <Button as={RouterLink} to="/contact" colorScheme="teal" mt={8}>
        新しいお問い合わせを作成
      </Button>
    </Box>
  );
};

export default Home;
