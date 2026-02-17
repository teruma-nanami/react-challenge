// src/components/contacts/ContactListTable.tsx
import { Link as RouterLink } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import type {
  Contact,
  ContactCategory,
  ContactStatus,
} from "../../types/contact";

type Props = {
  contacts: Contact[];
};

function labelCategory(v: ContactCategory): string {
  if (v === "bug") return "不具合";
  if (v === "request") return "要望";
  return "その他";
}

function statusBadge(v: ContactStatus) {
  if (v === "new") return <Badge>new</Badge>;
  if (v === "in_progress")
    return <Badge colorScheme="orange">in_progress</Badge>;
  return <Badge colorScheme="green">closed</Badge>;
}

function ContactListTable({ contacts }: Props) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflowX="auto">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>件名</Th>
            <Th>カテゴリ</Th>
            <Th>ステータス</Th>
            <Th textAlign="right">操作</Th>
          </Tr>
        </Thead>

        <Tbody>
          {contacts.map((c) => (
            <Tr key={c.id}>
              <Td>{c.id}</Td>

              <Td maxW="420px">
                <Text noOfLines={1}>{c.subject}</Text>
              </Td>

              <Td>{labelCategory(c.category)}</Td>

              <Td>{statusBadge(c.status)}</Td>

              <Td textAlign="right">
                <HStack spacing={2} justify="flex-end">
                  <Button
                    as={RouterLink}
                    to={`/contacts/internal/${c.id}`}
                    size="sm"
                    colorScheme="blue"
                    variant="solid"
                  >
                    詳細
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}

          {contacts.length === 0 && (
            <Tr>
              <Td colSpan={5}>
                <Text color="gray.600" py={4}>
                  データがありません。
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}

export default ContactListTable;
