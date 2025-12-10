import { useDisclosure } from "@chakra-ui/react";

export const useBaseModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return { isOpen, open: onOpen, close: onClose };
};
