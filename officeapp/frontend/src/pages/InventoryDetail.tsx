import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Spinner,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import { apiFetch } from "../lib/api";
import type { ApiResponse } from "../types/api";
import type { InventoryItem } from "../types/item";
import type { InventoryTransaction } from "../types/transaction";
import type { LaravelPagination } from "../types/pagination";

type TxType = "in" | "out";

function InventoryDetail() {
  const { id } = useParams();
  const itemId = Number(id);

  const navigate = useNavigate();

  const [item, setItem] = useState<InventoryItem | null>(null);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 入出庫フォーム
  const [txType, setTxType] = useState<TxType>("in");
  const [txQuantity, setTxQuantity] = useState<number>(1);
  const [txNote, setTxNote] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const isActive = useMemo(() => {
    if (!item) return false;
    return item.is_active === true || item.is_active === 1;
  }, [item]);

  const fetchItem = async () => {
    const res = await apiFetch<ApiResponse<InventoryItem>>(
      `/api/items/${itemId}`,
    );
    setItem(res.data);
  };

  const fetchTransactions = async () => {
    const res =
      await apiFetch<ApiResponse<LaravelPagination<InventoryTransaction>>>(
        "/api/transactions",
      );

    const filtered = res.data.data.filter(
      (t) => t.inventory_item_id === itemId,
    );
    setTransactions(filtered);
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!Number.isFinite(itemId)) {
        throw new Error("IDが不正です");
      }

      await Promise.all([fetchItem(), fetchTransactions()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  const createTransaction = async () => {
    if (!item) return;
    if (txQuantity <= 0) return;

    try {
      setSubmitting(true);
      setError(null);

      await apiFetch<ApiResponse<InventoryTransaction>>("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inventory_item_id: item.id,
          type: txType,
          quantity: txQuantity,
          note: txNote.trim() ? txNote : null,
        }),
      });

      setTxQuantity(1);
      setTxNote("");

      // 再取得（在庫数が変わる）
      await Promise.all([fetchItem(), fetchTransactions()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async () => {
    if (!item) return;

    try {
      setSubmitting(true);
      setError(null);

      await apiFetch<ApiResponse<InventoryItem>>(`/api/items/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.name,
          sku: item.sku,
          is_active: !isActive,
        }),
      });

      await fetchItem();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteItem = async () => {
    if (!item) return;

    // 「簡単に削除できないようにしたい」→ confirm を最低限
    const ok = window.confirm(
      "本当にこのアイテムを削除しますか？（復元できません）",
    );
    if (!ok) return;

    try {
      setSubmitting(true);
      setError(null);

      await apiFetch(`/api/items/${item.id}`, {
        method: "DELETE",
      });

      navigate("/inventory");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box>
        <Heading mb={4}>在庫詳細</Heading>
        <Spinner />
      </Box>
    );
  }

  if (!item) {
    return (
      <Box>
        <Heading mb={4}>在庫詳細</Heading>
        <Text color="red.500">{error ?? "Item not found"}</Text>
      </Box>
    );
  }

  return (
    <Box maxW="900px" mx="auto">
      <HStack justify="space-between" mb={4}>
        <Heading>在庫詳細</Heading>
        <Button variant="outline" onClick={() => navigate("/inventory")}>
          一覧へ戻る
        </Button>
      </HStack>

      {error && (
        <Text mb={4} color="red.500">
          {error}
        </Text>
      )}

      {/* アイテム基本情報 */}
      <Box p={4} borderWidth="1px" borderRadius="xl">
        <HStack justify="space-between" align="start">
          <Box>
            <Text fontSize="sm" color="gray.500">
              ID: {item.id}
            </Text>
            <Text fontSize="xl" fontWeight="800">
              {item.name}
            </Text>
            <Text color="gray.600">SKU: {item.sku ?? "-"}</Text>
            <Text mt={2} fontWeight="700">
              在庫数: {item.quantity}
            </Text>
          </Box>

          <VStack align="end">
            <Badge colorScheme={isActive ? "green" : "gray"}>
              {isActive ? "active" : "inactive"}
            </Badge>

            <Button
              size="sm"
              onClick={toggleActive}
              isLoading={submitting}
              loadingText="更新中"
            >
              {isActive ? "無効化する" : "有効化する"}
            </Button>

            <Button
              size="sm"
              colorScheme="red"
              variant="outline"
              onClick={deleteItem}
              isLoading={submitting}
            >
              削除（危険）
            </Button>
          </VStack>
        </HStack>
      </Box>

      <Divider my={6} />

      {/* 入出庫 */}
      <Box p={4} borderWidth="1px" borderRadius="xl">
        <Heading size="md" mb={3}>
          入出庫（履歴を追加）
        </Heading>

        <HStack align="end" spacing={4}>
          <FormControl>
            <FormLabel>種別</FormLabel>
            <Select
              value={txType}
              onChange={(e) => setTxType(e.target.value as TxType)}
            >
              <option value="in">入庫</option>
              <option value="out">出庫</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>数量</FormLabel>
            <Input
              type="number"
              min={1}
              value={txQuantity}
              onChange={(e) => setTxQuantity(Number(e.target.value))}
            />
          </FormControl>

          <FormControl flex={2}>
            <FormLabel>メモ</FormLabel>
            <Input
              value={txNote}
              onChange={(e) => setTxNote(e.target.value)}
              placeholder="任意（例：社内貸出）"
            />
          </FormControl>

          <Button
            colorScheme="blue"
            onClick={createTransaction}
            isLoading={submitting}
            loadingText="登録中"
          >
            登録
          </Button>
        </HStack>
      </Box>

      <Divider my={6} />

      {/* 履歴 */}
      <Box p={4} borderWidth="1px" borderRadius="xl">
        <Heading size="md" mb={3}>
          履歴
        </Heading>

        {transactions.length === 0 ? (
          <Text color="gray.500">履歴はありません</Text>
        ) : (
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>type</Th>
                  <Th isNumeric>qty</Th>
                  <Th>note</Th>
                  <Th>created</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((t) => (
                  <Tr key={t.id}>
                    <Td>{t.id}</Td>
                    <Td>{t.type}</Td>
                    <Td isNumeric>{t.quantity}</Td>
                    <Td>{t.note ?? "-"}</Td>
                    <Td>{t.created_at}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default InventoryDetail;
