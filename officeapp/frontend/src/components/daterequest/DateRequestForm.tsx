// src/components/daterequest/DateRequestForm.tsx

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import type {
  DateRequestCreateInput,
  DateRequestSession,
} from "../../types/dateRequest";

type Props = {
  createLoading: boolean;
  onCreate: (payload: DateRequestCreateInput) => Promise<unknown>;
};

export default function DateRequestForm({ createLoading, onCreate }: Props) {
  const toast = useToast();

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [session, setSession] = useState<DateRequestSession>("full");
  const [reason, setReason] = useState("");

  const validate = (): string | null => {
    if (!startDate) return "開始日を入力してください";
    if (!endDate) return "終了日を入力してください";
    if (!reason.trim()) return "理由は必須です";
    return null;
  };

  const buildPayload = (): DateRequestCreateInput => {
    return {
      start_date: startDate,
      end_date: endDate,
      session,
      reason: reason.trim(),
    };
  };

  const onSubmit = async () => {
    const err = validate();
    if (err) {
      toast({ status: "warning", title: err });
      return;
    }

    try {
      await onCreate(buildPayload());
      toast({ status: "success", title: "申請しました" });
      setReason("");
    } catch {
      // エラー表示は親（hook の onError / toast）側で出す想定なので握る
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <VStack align="stretch" spacing={4}>
        <Text fontWeight="bold">申請作成</Text>

        <HStack align="flex-end" spacing={4} flexWrap="wrap">
          <FormControl>
            <FormLabel>開始日</FormLabel>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>終了日</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>区分</FormLabel>
            <Select
              value={session}
              onChange={(e) => setSession(e.target.value as DateRequestSession)}
            >
              <option value="full">全日</option>
              <option value="am">午前</option>
              <option value="pm">午後</option>
            </Select>
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>理由</FormLabel>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="例：私用のため"
          />
        </FormControl>

        <Button colorScheme="blue" onClick={onSubmit} isLoading={createLoading}>
          申請する
        </Button>
      </VStack>
    </Box>
  );
}
