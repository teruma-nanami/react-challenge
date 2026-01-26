import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { apiFetch } from "../lib/api";
import type { ApiResponse } from "../types/api";
import type { InventoryItem } from "../types/item";

function Inventory() {
  const navigate = useNavigate();

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<ApiResponse<InventoryItem[]>>("/api/items");
      setItems(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return (
      <Box>
        <Heading mb={4}>在庫管理</Heading>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box maxW="900px" mx="auto">
      <HStack justify="space-between" mb={4}>
        <Heading>在庫管理</Heading>
      </HStack>

      {error && (
        <Text mb={4} color="red.500">
          {error}
        </Text>
      )}

      <Box borderWidth="1px" borderRadius="xl" overflow="hidden">
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>SKU</Th>
              <Th>名前</Th>
              <Th isNumeric>在庫数</Th>
              <Th>Active</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((it) => (
              <Tr key={it.id}>
                <Td>{it.id}</Td>
                <Td>{it.sku ?? "-"}</Td>
                <Td>{it.name}</Td>
                <Td isNumeric>{it.quantity}</Td>
                <Td>
                  {it.is_active === true || it.is_active === 1 ? "Yes" : "No"}
                </Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/inventory/${it.id}`)}
                  >
                    詳細
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {items.length === 0 && (
        <Text mt={4} color="gray.500">
          アイテムがありません
        </Text>
      )}
    </Box>
  );
}

export default Inventory;
