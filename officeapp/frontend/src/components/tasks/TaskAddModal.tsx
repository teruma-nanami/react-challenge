// components/tasks/TaskAddModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  VStack,
  Box,
} from "@chakra-ui/react";

import type { TaskStatus } from "../../types/task";
import FormField from "../ui/FormField";
import PrimaryButton from "../ui/PrimaryButton";
import CautionButton from "../ui/CautionButton";

type Props = {
  isOpen: boolean;
  isSubmitting: boolean;

  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;

  onChangeTitle: (v: string) => void;
  onChangeDescription: (v: string) => void;
  onChangeStatus: (v: TaskStatus) => void;
  onChangeDueDate: (v: string) => void;

  onSubmit: () => void;
  onClose: () => void;
};

function TaskAddModal({
  isOpen,
  isSubmitting,
  title,
  description,
  status,
  dueDate,
  onChangeTitle,
  onChangeDescription,
  onChangeStatus,
  onChangeDueDate,
  onSubmit,
  onClose,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>タスク追加</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormField
              label="タイトル"
              isRequired
              value={title}
              onChange={onChangeTitle}
            />

            <FormField
              label="詳細"
              type="textarea"
              value={description}
              onChange={onChangeDescription}
            />

            <FormField
              label="ステータス"
              type="select"
              value={status}
              onChange={(v) => onChangeStatus(v as TaskStatus)}
            >
              <option value="todo">todo</option>
              <option value="in_progress">in_progress</option>
              <option value="done">done</option>
            </FormField>

            <FormField
              label="期限"
              inputType="date"
              value={dueDate}
              onChange={onChangeDueDate}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <CautionButton onClick={onClose}>キャンセル</CautionButton>
          <Box w={2} />
          <PrimaryButton onClick={onSubmit} isLoading={isSubmitting}>
            追加
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TaskAddModal;
