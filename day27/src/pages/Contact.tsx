// src/pages/Contact.tsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // localStorage に保存
    localStorage.setItem("contact", JSON.stringify({ name, email, message }));
    // 確認ページへ遷移
    navigate("/confirm");
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={10}
      p={6}
      borderWidth="1px"
      borderRadius="md"
    >
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>お名前</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="山田太郎"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>お問い合わせ内容</FormLabel>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="お問い合わせ内容を入力してください"
          />
        </FormControl>

        <Button colorScheme="teal" onClick={handleSubmit}>
          確認画面へ
        </Button>
      </VStack>
    </Box>
  );
};

export default Contact;
