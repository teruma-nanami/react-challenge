// src/components/contacts/ContactListView.tsx
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";

import type { Contact } from "../../types/contact";
import ContactListTable from "./ContactListTable";

type Props = {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
};

function ContactListView({ contacts, loading, error }: Props) {
  return (
    <Box>
      <Heading size="lg" mb={4}>
        お問い合わせ一覧
      </Heading>

      {loading && <Spinner />}

      {error && <Text color="red.500">{error}</Text>}

      {!loading && !error && contacts.length === 0 && (
        <Text>お問い合わせはありません</Text>
      )}

      {!loading && !error && contacts.length > 0 && (
        <ContactListTable contacts={contacts} />
      )}
    </Box>
  );
}

export default ContactListView;
