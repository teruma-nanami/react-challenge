import { useEffect, useMemo, useState } from "react";
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
import { apiFetch } from "../lib/api";

/**
 * Laravel の共通レスポンス想定
 * { data: ... , message: "OK" }
 */
type ApiResponse<T> = {
  data: T;
  message: string;
};

/**
 * paginate の中身（LaravelのPaginator想定）
 * { data: [...], current_page:..., ... }
 */
type Paginated<T> = {
  data: T[];
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
};

/**
 * とにかく「Contact[]」を取り出すための正規化関数
 * - 非paginate: { data: Contact[] }
 * - paginate:   { data: { data: Contact[] ... } }
 * - 二重data:   { data: { data: { data: Contact[] } } } などにも耐える
 */
function extractContacts(payload: unknown): Contact[] {
  const p: any = payload;

  // 1) payload 自体が配列
  if (Array.isArray(p)) return p;

  // 2) { data: Contact[] }
  if (Array.isArray(p?.data)) return p.data;

  // 3) { data: { data: Contact[] } } (paginate)
  if (Array.isArray(p?.data?.data)) return p.data.data;

  // 4) { data: { data: { data: Contact[] } } }（万一）
  if (Array.isArray(p?.data?.data?.data)) return p.data.data.data;

  return [];
}

function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const safeContacts = useMemo(
    () => (Array.isArray(contacts) ? contacts : []),
    [contacts],
  );

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);

      // ここは「ApiResponse<何か>」として受ける（中身はextractContactsで吸収）
      const res = await apiFetch<ApiResponse<unknown>>("/api/contacts");

      // デバッグ（必要なら残してOK）
      console.log("contacts raw response:", res);

      const list = extractContacts(res);
      setContacts(list);
    } catch (err) {
      console.error(err);
      setError("お問い合わせ一覧の取得に失敗しました");
      setContacts([]); // 念のため
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: number) => {
    const ok = confirm("削除しますか？");
    if (!ok) return;

    await apiFetch<void>(`/api/contacts/${id}`, {
      method: "DELETE",
    });

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

      {safeContacts.length === 0 ? (
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
            {safeContacts.map((c) => (
              <Tr key={c.id}>
                <Td>{c.id}</Td>
                <Td>{c.subject}</Td>
                <Td>{c.category}</Td>
                <Td>{c.status}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      as={RouterLink}
                      to={`/contacts/internal/${c.id}`}
                      size="sm"
                      colorScheme="blue"
                    >
                      詳細
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
