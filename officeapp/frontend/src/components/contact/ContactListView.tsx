// src/components/contacts/ContactListView.tsx
import { Box, Button, Heading, HStack, Spinner, Text } from "@chakra-ui/react";
import type { Contact } from "../../types/contact";
import ContactListTable from "./ContactListTable";

type Props = {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
};

function ContactListView({ contacts, loading, error, onRetry }: Props) {
  const showEmpty = !loading && !error && contacts.length === 0;
  const showTable = !loading && !error && contacts.length > 0;

  return (
    <Box>
      <HStack justify="space-between" align="center" mb={4}>
        <Heading size="lg">お問い合わせ一覧</Heading>

        <Button
          size="sm"
          variant="outline"
          onClick={onRetry}
          isLoading={loading}
        >
          再読み込み
        </Button>
      </HStack>

      {error && (
        <Box>
          <Text color="red.500" mb={2}>
            {error}
          </Text>
          <Button size="sm" onClick={onRetry} isLoading={loading}>
            再試行
          </Button>
        </Box>
      )}

      {!error && loading && (
        <HStack spacing={2} color="gray.600">
          <Spinner size="sm" />
          <Text fontSize="sm">読み込み中...</Text>
        </HStack>
      )}

      {showEmpty && <Text>お問い合わせはありません</Text>}

      {showTable && <ContactListTable contacts={contacts} />}
    </Box>
  );
}

export default ContactListView;
