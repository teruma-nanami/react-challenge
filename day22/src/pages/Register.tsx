import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { Register } = useAuth();
  const navigate = useNavigate();

  const userRegister = () => {
    Register(username, password);
    navigate("/");
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading mb={6} size="md" textAlign="center">
        新規登録
      </Heading>
      <FormControl mb={4} isRequired>
        <FormLabel>ユーザー名</FormLabel>
        <Input
          placeholder="ユーザー名を入力"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4} isRequired>
        <FormLabel>パスワード</FormLabel>
        <Input
          type="password"
          placeholder="パスワードを入力"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="purple"
        width="full"
        onClick={userRegister}
        disabled={!username || !password}
      >
        登録
      </Button>
      <Text mt={4} textAlign="center">
        すでにアカウントをお持ちの方は{" "}
        <Link as={RouterLink} to="/login" color="purple.500" fontWeight="bold">
          ログイン
        </Link>
      </Text>
    </Box>
  );
}
