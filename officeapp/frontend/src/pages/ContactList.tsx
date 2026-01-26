import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import type { Contact } from "../types/contact";
import { apiFetch } from "../lib/api"; // あなたの api.ts の場所に合わせて調整

function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<{ data: Contact[]; message: string }>(
        "/api/contacts",
      );

      setContacts(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: number) => {
    const ok = confirm("削除しますか？");
    if (!ok) return;

    await apiFetch(`/api/contacts/${id}`, {
      method: "DELETE",
    });

    // 削除後に再取得（確実）
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return (
      <Box>
        <Heading size="lg" mb={4}>
          お問い合わせ一覧
        </Heading>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Heading size="lg" mb={4}>
          お問い合わせ一覧
        </Heading>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="lg" mb={4}>
        お問い合わせ一覧
      </Heading>

      {contacts.length === 0 ? (
        <Text>お問い合わせはありません</Text>
      ) : (
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
                    <Button
                      as={RouterLink}
                      to={`/contacts/${c.id}`}
                      size="sm"
                      colorScheme="blue"
                    >
                      詳細
                    </Button>

                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => deleteContact(c.id)}
                    >
                      削除
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default ContactList;
