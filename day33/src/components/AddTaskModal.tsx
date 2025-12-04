// src/components/modals/AddTaskModal.tsx
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { BaseModal } from "./BaseModal";
import { useBaseModal } from "./useBaseModal";

export const AddTaskModal = () => {
  const { tasks, addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const modal = useBaseModal();

  const handleSave = () => {
    const newTitle = title.trim();
    const newNote = note.trim();
    if (!newTitle) return;
    addTask({
      id: Date.now().toString(),
      title: newTitle,
      order: tasks.length,
      isDone: false,
      notes: newNote || undefined,
    });
    setTitle("");
    setNote("");
    modal.close();
  };

  return (
    <BaseModal
      trigger={<Button colorScheme="orange">+</Button>}
      isOpen={modal.isOpen}
      onOpen={modal.open}
      onClose={modal.close}
    >
      <ModalHeader>新しいタスク</ModalHeader>
      <ModalBody>
        <Input
          placeholder="タイトル"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          focusBorderColor="orange.400" // ← フォーカス時の枠線カラーを指定
        />
        <Textarea
          placeholder="メモ 入力は任意です"
          onChange={(e) => setNote(e.target.value)}
          value={note}
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
        <Button variant="ghost" ml={3} onClick={() => modal.close()}>
          キャンセル
        </Button>
      </ModalFooter>
    </BaseModal>
  );
};

export default AddTaskModal;
