// src/components/contacts/ContactListTable.tsx
import { Link as RouterLink } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, HStack } from "@chakra-ui/react";

import type { Contact } from "../../types/contact";
import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  contacts: Contact[];
};

function ContactListTable({ contacts }: Props) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>件名</Th>
          <Th>カテゴリ</Th>
          <Th>ステータス</Th>
          <Th>操作</Th>
        </Tr>
      </Thead>

      <Tbody>
        {contacts.map((c) => (
          <Tr key={c.id}>
            <Td>{c.id}</Td>
            <Td>{c.subject}</Td>
            <Td>{c.category}</Td>
            <Td>{c.status}</Td>
            <Td>
              <HStack spacing={2}>
                <PrimaryButton
                  as={RouterLink}
                  to={`/contacts/internal/${c.id}`}
                  size="sm"
                >
                  詳細
                </PrimaryButton>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ContactListTable;
