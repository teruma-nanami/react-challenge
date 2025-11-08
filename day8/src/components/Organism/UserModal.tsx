import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  ModalFooter,
} from "@chakra-ui/react";
import { UserField } from "../Atoms/UserField";
import type { User } from "../../types/api/User";

type Props = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
};


export const UserModal = (Props: Props) => {

  const { user, isOpen, onClose, isAdmin} = Props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ユーザー情報
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Stack>
            <UserField label="ID" value={user.id} isReadOnly={!isAdmin} />
            <UserField label="名前" value={user.name} isReadOnly={!isAdmin} />
            <UserField label="ユーザー名" value={user.username} isReadOnly={!isAdmin} />
            <UserField label="メールアドレス" value={user.email} type="email" isReadOnly={!isAdmin} />
            <UserField label="電話番号" value={user.phone} type="tel" isReadOnly={!isAdmin} />
          </Stack>
        </ModalBody>
        {isAdmin && (
          <ModalFooter>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
