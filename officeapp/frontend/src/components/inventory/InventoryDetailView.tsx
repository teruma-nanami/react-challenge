// src/components/inventory/InventoryDetailView.tsx
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
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
import { useNavigate } from "react-router-dom";

import type { InventoryItem } from "../../types/item";
import type { InventoryTransaction } from "../../types/transaction";

import FormField from "../ui/FormField";
import PrimaryButton from "../ui/PrimaryButton";
import DangerButton from "../ui/DangerButton";
import CautionButton from "../ui/CautionButton";

type TxType = "in" | "out";

type Props = {
  item: InventoryItem | null;
  transactions: InventoryTransaction[];

  loading: boolean;
  submitting: boolean;
  error: string | null;

  isActive: boolean;

  // 入出庫フォーム
  txType: TxType;
  txQuantity: number;
  txNote: string;

  onChangeTxType: (v: TxType) => void;
  onChangeTxQuantity: (v: number) => void;
  onChangeTxNote: (v: string) => void;

  onCreateTransaction: () => void;
  onToggleActive: () => void;
  onDeleteItem: () => void;
};

function InventoryDetailView({
  item,
  transactions,
  loading,
  submitting,
  error,
  isActive,
  txType,
  txQuantity,
  txNote,
  onChangeTxType,
  onChangeTxQuantity,
  onChangeTxNote,
  onCreateTransaction,
  onToggleActive,
  onDeleteItem,
}: Props) {
  const navigate = useNavigate();

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

      {/* ===== 基本情報 ===== */}
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

            <CautionButton
              size="sm"
              onClick={onToggleActive}
              isLoading={submitting}
            >
              {isActive ? "無効化する" : "有効化する"}
            </CautionButton>

            <DangerButton
              size="sm"
              onClick={onDeleteItem}
              isLoading={submitting}
            >
              削除（危険）
            </DangerButton>
          </VStack>
        </HStack>
      </Box>

      <Divider my={6} />

      {/* ===== 入出庫 ===== */}
      <Box p={4} borderWidth="1px" borderRadius="xl">
        <Heading size="md" mb={3}>
          入出庫（履歴を追加）
        </Heading>

        <HStack align="end" spacing={4}>
          <FormField
            label="種別"
            type="select"
            value={txType}
            onChange={(v) => onChangeTxType(v as TxType)}
          >
            <option value="in">入庫</option>
            <option value="out">出庫</option>
          </FormField>

          <FormField
            label="数量"
            inputType="number"
            value={String(txQuantity)}
            onChange={(v) => onChangeTxQuantity(Number(v))}
          />

          <FormField
            label="メモ"
            value={txNote}
            onChange={onChangeTxNote}
            placeholder="任意（例：社内貸出）"
          />

          <PrimaryButton onClick={onCreateTransaction} isLoading={submitting}>
            登録
          </PrimaryButton>
        </HStack>
      </Box>

      <Divider my={6} />

      {/* ===== 履歴 ===== */}
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

export default InventoryDetailView;
