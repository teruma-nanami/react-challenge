import { Flex, Heading, Divider, Input, Box } from "@chakra-ui/react";
import { memo, useState } from "react";
import { Stack } from "@chakra-ui/react";
import { PrimaryButton } from "../Atoms/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";

export const Login = memo(() => {
  const [userId, setUserId] = useState("");
  const { login, loading } = useAuth();

  // <input> に文字が入力されたとき、その値を userId state に反映する関数を定義している
  // 型指定 React.ChangeEvent<HTMLInputElement> は、input 要素の変更イベントを表す型
  const onChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

    const onClickLogin = () => {
      login(userId);
    };

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Box w="400px" p="8" borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Heading as="h1" size="lg" mb="6" textAlign="center">
          Login
        </Heading>
        <Divider my={4} />
        <Stack>
          <Input placeholder="User ID" value={userId} onChange={onChangeUserId} />
          <PrimaryButton onClick={onClickLogin} disabled={userId === ""} isLoading={loading}>Login</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
