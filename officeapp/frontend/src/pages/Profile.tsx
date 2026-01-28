import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

import { apiFetch } from "../lib/api";
import type { ApiResponse } from "../types/api";
import type { User } from "../types/user";

function Profile() {
  const { user } = useAuth0();

  // 🔧 Auth0未使用期間の暫定
  const auth0UserId = user?.sub ?? "auth0|admin-user";

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  console.log("auth0UserId", auth0UserId);
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<ApiResponse<User>>("/api/profile", {
        headers: {
          "X-Auth0-User-Id": auth0UserId,
        },
      });

      setDisplayName(res.data.display_name ?? "");
      setEmail(res.data.email);
      setRole(res.data.role);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const submit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      await apiFetch<ApiResponse<User>>("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Auth0-User-Id": auth0UserId,
        },
        body: JSON.stringify({
          display_name: displayName || null,
          email,
          role,
        }),
      });

      await fetchProfile();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box>
        <Heading mb={4}>プロフィール</Heading>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box maxW="600px">
      <Heading mb={6}>プロフィール</Heading>

      {error && (
        <Text mb={4} color="red.500">
          {error}
        </Text>
      )}

      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>表示名</FormLabel>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>メールアドレス</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>ロール</FormLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">admin</option>
            <option value="member">member</option>
          </Select>
        </FormControl>

        <Button colorScheme="blue" onClick={submit} isLoading={submitting}>
          保存
        </Button>
      </VStack>
    </Box>
  );
}

export default Profile;
