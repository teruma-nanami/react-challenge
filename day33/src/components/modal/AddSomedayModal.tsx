// src/components/modals/AddSomedayModal.tsx
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSomedays } from "../../hooks/useSomedays";
import type { Someday } from "../../types/Someday";
import { BaseModal } from "./BaseModal";
import { useBaseModal } from "./useBaseModal";

export const AddSomedayModal = () => {
  const { addSomeday } = useSomedays();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const modal = useBaseModal();

  const handleSave = () => {
    const newTitle = title.trim();
    const newNotes = notes.trim();
    if (!newTitle) return;

    const newSomeday: Someday = {
      id: Date.now().toString(),
      title: newTitle,
      description: newNotes || undefined,
      isDone: false,
      createdAt: new Date(),
    };

    addSomeday(newSomeday);

    setTitle("");
    setNotes("");
    modal.close();
  };

  return (
    <BaseModal
      trigger={<Button colorScheme="orange">Someday追加</Button>}
      isOpen={modal.isOpen}
      onOpen={modal.open}
      onClose={modal.close}
    >
      <ModalHeader>いつかやりたいこと</ModalHeader>
      <ModalBody>
        <Input
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          focusBorderColor="orange.400"
        />
        <Textarea
          placeholder="メモ 入力は任意です"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          mt={4}
          focusBorderColor="orange.400"
        />
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="orange"
          onClick={handleSave}
          isDisabled={!title.trim()}
        >
          保存
        </Button>
        <Button variant="ghost" ml={3} onClick={modal.close}>
          キャンセル
        </Button>
      </ModalFooter>
    </BaseModal>
  );
};

export default AddSomedayModal;
