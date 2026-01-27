import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isAuthenticated) {
    return (
      <Box textAlign="center" mt={20}>
        <Heading size="md">すでにログインしています</Heading>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        bg="white"
        p={10}
        borderRadius="xl"
        boxShadow="lg"
        textAlign="center"
        minW="360px"
      >
        <VStack spacing={6}>
          <Heading size="lg">Office App</Heading>

          <Text color="gray.600">ログインしてシステムを利用してください</Text>

          <Button
            colorScheme="blue"
            size="lg"
            width="100%"
            onClick={() => loginWithRedirect()}
          >
            Login with Auth0
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default Login;
