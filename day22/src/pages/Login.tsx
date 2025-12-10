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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const userLogin = () => {
    const success = login(username, password);
    if (success) {
      navigate("/");
    } else {
      alert("ユーザー名かパスワードが違います");
    }
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
        ログイン
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
        onClick={userLogin}
        disabled={!username || !password}
      >
        ログイン
      </Button>
      <Text mt={4} textAlign="center">
        アカウントをお持ちでない方は{" "}
        <Link
          as={RouterLink}
          to="/register"
          color="purple.500"
          fontWeight="bold"
        >
          新規登録
        </Link>
      </Text>
    </Box>
  );
}
