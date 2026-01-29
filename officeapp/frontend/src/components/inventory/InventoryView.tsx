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
  HStack,
} from "@chakra-ui/react";

import type { InventoryItem } from "../../types/item";
import PrimaryButton from "../ui/PrimaryButton";
import InventoryAddModal from "./InventoryAddModal";
import InventoryRow from "./InventoryRow";
import { useInventoryForm } from "../../hooks/useInventoryForm";

type Props = {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;

  // modal control（Pageから受け取る）
  isAddModalOpen: boolean;
  submitting: boolean;
  onOpenAddModal: () => void;
  onCloseAddModal: () => void;

  onAddItem: (params: {
    sku: string;
    name: string;
    quantity: number;
    isActive: boolean;
  }) => Promise<void>;
};

function InventoryView({
  items,
  loading,
  error,
  isAddModalOpen,
  submitting,
  onOpenAddModal,
  onCloseAddModal,
  onAddItem,
}: Props) {
  const {
    sku,
    name,
    quantity,
    isActive,
    setSku,
    setName,
    setQuantity,
    setIsActive,
    submit,
  } = useInventoryForm(onAddItem, onCloseAddModal);

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
        <PrimaryButton onClick={onOpenAddModal}>商品追加</PrimaryButton>
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
            {items.map((item) => (
              <InventoryRow key={item.id} item={item} />
            ))}
          </Tbody>
        </Table>
      </Box>

      {items.length === 0 && (
        <Text mt={4} color="gray.500">
          アイテムがありません
        </Text>
      )}

      <InventoryAddModal
        isOpen={isAddModalOpen}
        isSubmitting={submitting}
        sku={sku}
        name={name}
        quantity={quantity}
        isActive={isActive}
        onChangeSku={setSku}
        onChangeName={setName}
        onChangeQuantity={setQuantity}
        onChangeIsActive={setIsActive}
        onSubmit={submit}
        onClose={onCloseAddModal}
      />
    </Box>
  );
}

export default InventoryView;
