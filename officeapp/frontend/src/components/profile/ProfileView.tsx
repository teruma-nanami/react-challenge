// src/components/profile/ProfileView.tsx
import { Box, Button, Spinner, VStack, Heading, Text } from "@chakra-ui/react";

import FormField from "../ui/FormField";

type Props = {
  // form values
  displayName: string;
  email: string;
  role: string;

  // setters
  onChangeDisplayName: (v: string) => void;
  onChangeEmail: (v: string) => void;
  onChangeRole: (v: string) => void;

  // ui state
  loading: boolean;
  submitting: boolean;
  error: string | null;

  // action
  onSubmit: () => void;
};

function ProfileView({
  displayName,
  email,
  role,
  onChangeDisplayName,
  onChangeEmail,
  onChangeRole,
  loading,
  submitting,
  error,
  onSubmit,
}: Props) {
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
        <FormField
          label="表示名"
          value={displayName}
          onChange={onChangeDisplayName}
          placeholder="表示名"
        />

        <FormField
          label="メールアドレス"
          isRequired
          inputType="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="example@example.com"
        />

        <FormField
          label="ロール"
          type="select"
          value={role}
          onChange={onChangeRole}
        >
          <option value="admin">admin</option>
          <option value="member">member</option>
        </FormField>

        <Button colorScheme="blue" onClick={onSubmit} isLoading={submitting}>
          保存
        </Button>
      </VStack>
    </Box>
  );
}

export default ProfileView;
