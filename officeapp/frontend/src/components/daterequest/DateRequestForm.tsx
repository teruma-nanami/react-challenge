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
  DateRequest,
} from "../../types/dateRequest";

type Props = {
  createLoading: boolean;
  onCreate: (payload: DateRequestCreateInput) => Promise<DateRequest>;
};

export default function DateRequestForm({ createLoading, onCreate }: Props) {
  const toast = useToast();

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [session, setSession] = useState<DateRequestSession>("full");
  const [reason, setReason] = useState("");

  const normalizeDatesBySession = (
    s: DateRequestSession,
    start: string,
    end: string,
  ) => {
    if (s === "am" || s === "pm") {
      return { start, end: start };
    }
    return { start, end };
  };

  const validate = (start: string, end: string): string | null => {
    if (!start) return "開始日を入力してください";
    if (!end) return "終了日を入力してください";
    if (start > end) return "開始日は終了日以前にしてください";
    if (!reason.trim()) return "理由は必須です";
    return null;
  };

  const onSubmit = async () => {
    const normalized = normalizeDatesBySession(session, startDate, endDate);
    const err = validate(normalized.start, normalized.end);
    if (err) {
      toast({ status: "warning", title: err });
      return;
    }

    const payload: DateRequestCreateInput = {
      start_date: normalized.start,
      end_date: normalized.end,
      session,
      reason: reason.trim(),
    };

    try {
      await onCreate(payload);
      toast({ status: "success", title: "申請しました" });
      setReason("");
    } catch {
      // エラー表示は親（hook の onError / toast）側で出す想定なので握る
    }
  };

  const onChangeSession = (next: DateRequestSession) => {
    setSession(next);
    if (next === "am" || next === "pm") {
      setEndDate(startDate);
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
              onChange={(e) => {
                const v = e.target.value;
                setStartDate(v);
                if (session === "am" || session === "pm") {
                  setEndDate(v);
                }
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>終了日</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              isDisabled={session === "am" || session === "pm"}
            />
          </FormControl>

          <FormControl>
            <FormLabel>区分</FormLabel>
            <Select
              value={session}
              onChange={(e) =>
                onChangeSession(e.target.value as DateRequestSession)
              }
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

        <Button
          colorScheme="blue"
          onClick={onSubmit}
          isLoading={createLoading}
          isDisabled={createLoading}
        >
          申請する
        </Button>
      </VStack>
    </Box>
  );
}
