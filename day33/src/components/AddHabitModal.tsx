// src/components/modals/AddHabitModal.tsx
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useHabits } from "../hooks/useHabits";
import type { Habit } from "../types/Habit"; // Habitだけexportされているのでこれをimport
import { BaseModal } from "./BaseModal";
import { useBaseModal } from "./useBaseModal";

export const AddHabitModal = () => {
  const { addHabit } = useHabits();
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState<Habit["frequency"]>("daily");
  const [weekly, setWeekly] = useState<Habit["weekly"]>([]);
  const [timeOfDay, setTimeOfDay] = useState<Habit["timeOfDay"]>("morning");
  const [notes, setNotes] = useState("");
  const modal = useBaseModal();

  const handleSave = () => {
    const newTitle = title.trim();
    const newNote = notes.trim();
    if (!newTitle) return;
    addHabit({
      id: Date.now().toString(),
      title: newTitle,
      frequency,
      weekly:
        frequency === "weekly" || frequency === "monthly" ? weekly : undefined,
      timeOfDay,
      notes: newNote || undefined,
    });
    setTitle("");
    setNotes("");
    modal.close();
  };

  return (
    <BaseModal
      trigger={<Button colorScheme="orange">習慣追加</Button>}
      isOpen={modal.isOpen}
      onOpen={modal.open}
      onClose={modal.close}
    >
      <ModalHeader>新しい習慣</ModalHeader>
      <ModalBody>
        {/* タイトル */}
        <Input
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          focusBorderColor="orange.400"
        />

        {/* 頻度選択 */}
        <Select
          mt={4}
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as Habit["frequency"])}
        >
          <option value="daily">毎日</option>
          <option value="weekly">毎週</option>
          <option value="monthly">毎月</option>
        </Select>

        {/* 毎週の場合のみ曜日選択 */}
        {(frequency === "weekly" || frequency === "monthly") && (
          <CheckboxGroup
            value={weekly ?? []}
            onChange={(values) => setWeekly(values as Habit["weekly"])}
          >
            <Stack direction="row" mt={4}>
              <Checkbox value="mon" colorScheme="orange">
                月
              </Checkbox>
              <Checkbox value="tue" colorScheme="orange">
                火
              </Checkbox>
              <Checkbox value="wed" colorScheme="orange">
                水
              </Checkbox>
              <Checkbox value="thu" colorScheme="orange">
                木
              </Checkbox>
              <Checkbox value="fri" colorScheme="orange">
                金
              </Checkbox>
              <Checkbox value="sat" colorScheme="orange">
                土
              </Checkbox>
              <Checkbox value="sun" colorScheme="orange">
                日
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        )}

        {/* 時間帯選択 */}
        <Select
          mt={4}
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(e.target.value as Habit["timeOfDay"])}
        >
          <option value="morning">朝</option>
          <option value="afternoon">昼</option>
          <option value="evening">夜</option>
        </Select>

        {/* メモ */}
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

export default AddHabitModal;
