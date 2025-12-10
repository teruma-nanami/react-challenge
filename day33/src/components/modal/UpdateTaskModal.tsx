import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import type { Task } from "../../types/Task";
import { BaseModal } from "./BaseModal";
import { useBaseModal } from "./useBaseModal";

type Props = {
  task: Task;
  updateTask: (task: Task) => void;
};

export const UpdateTaskModal = ({ task, updateTask }: Props) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const modal = useBaseModal();

  const handleSave = () => {
    const newTitle = title.trim();
    const newNote = note.trim();
    if (!newTitle) return;
    updateTask({
      ...task,
      title: newTitle,
      notes: newNote || undefined,
    });
    modal.close();
  };
  return (
    <BaseModal
      trigger={
        <IconButton
          aria-label="編集"
          size="sm"
          icon={<EditIcon />}
          colorScheme="orange"
        />
      }
      isOpen={modal.isOpen}
      onOpen={modal.open}
      onClose={modal.close}
    >
      <ModalHeader>タスクを更新</ModalHeader>
      <ModalBody>
        <Input
          placeholder={task.title}
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
