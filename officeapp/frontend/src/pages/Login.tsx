import { useEffect } from "react";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // ログイン済みならアプリ側のトップへ
      navigate("/attendance", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Box>
        <Heading mb={2}>Login</Heading>
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box>
      <VStack align="start" spacing={4}>
        <Heading size="lg">ログイン</Heading>
        <Text color="gray.600">続行するにはログインしてください。</Text>

        <Button colorScheme="blue" onClick={() => loginWithRedirect()}>
          Auth0でログイン
        </Button>
      </VStack>
    </Box>
  );
}

export default Login;
