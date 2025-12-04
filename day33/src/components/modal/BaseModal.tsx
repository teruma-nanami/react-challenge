// BaseModal.tsx
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

type Props = {
  trigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const BaseModal = ({
  trigger,
  children,
  isOpen,
  onOpen,
  onClose,
}: Props) => {
  return (
    <>
      <span onClick={onOpen}>{trigger}</span>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};
