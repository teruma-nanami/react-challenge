// src/components/inventory/InventoryAddModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  VStack,
} from "@chakra-ui/react";

import PrimaryButton from "../ui/PrimaryButton";
import DangerButton from "../ui/DangerButton";
import FormField from "../ui/FormField";
import SwitchField from "../ui/SwitchField";

type Props = {
  isOpen: boolean;
  isSubmitting: boolean;

  // form values
  sku: string;
  name: string;
  quantity: number;
  isActive: boolean;

  // handlers
  onChangeSku: (v: string) => void;
  onChangeName: (v: string) => void;
  onChangeQuantity: (v: number) => void;
  onChangeIsActive: (v: boolean) => void;

  onSubmit: () => void;
  onClose: () => void;
};

function InventoryAddModal({
  isOpen,
  isSubmitting,
  sku,
  name,
  quantity,
  isActive,
  onChangeSku,
  onChangeName,
  onChangeQuantity,
  onChangeIsActive,
  onSubmit,
  onClose,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>商品追加</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormField
              label="SKU"
              value={sku}
              onChange={onChangeSku}
              placeholder="SKU（任意）"
            />

            <FormField
              label="商品名"
              isRequired
              value={name}
              onChange={onChangeName}
              placeholder="商品名"
            />

            <FormField
              label="在庫数"
              isRequired
              type="input"
              inputType="number"
              value={String(quantity)}
              onChange={(v) => onChangeQuantity(Number(v))}
            />

            <SwitchField
              label="Active"
              checked={isActive}
              onChange={onChangeIsActive}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <DangerButton variant="ghost" onClick={onClose}>
            キャンセル
          </DangerButton>

          <PrimaryButton onClick={onSubmit} isLoading={isSubmitting}>
            追加
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InventoryAddModal;
