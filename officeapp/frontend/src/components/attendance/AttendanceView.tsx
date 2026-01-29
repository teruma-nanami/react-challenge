import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Divider,
  Button,
} from "@chakra-ui/react";

import type { Attendance } from "../../types/attendance";
import type { BreakTime } from "../../types/breakTime";

import PrimaryButton from "../ui/PrimaryButton";
import DangerButton from "../ui/DangerButton";
import CautionButton from "../ui/CautionButton";

type Props = {
  attendance: Attendance | null;
  breaks: BreakTime[];
  activeBreak: BreakTime | undefined;

  submitting: boolean;

  onCheckIn: () => void;
  onCheckOut: () => void;
  onStartBreak: () => void;
  onEndBreak: () => void;

  formatTime: (v: string | null | undefined) => string;
};

/**
 * BreakTime は UTC 文字列として返ってくる前提なので
 * 表示時に「UTCであること」を明示する
 */
function formatBreakTime(
  value: string | null | undefined,
  formatTime: (v: string | null | undefined) => string,
): string {
  if (!value) return "—";

  // すでに Z が付いているならそのまま
  if (value.endsWith("Z")) {
    return formatTime(value);
  }

  // Z が無い場合でも UTC として扱う
  return formatTime(`${value}Z`);
}

function AttendanceView({
  attendance,
  breaks,
  activeBreak,
  submitting,
  onCheckIn,
  onCheckOut,
  onStartBreak,
  onEndBreak,
  formatTime,
}: Props) {
  return (
    <Box>
      <Heading mb={4}>勤怠管理</Heading>

      {!attendance ? (
        <PrimaryButton onClick={onCheckIn} isLoading={submitting}>
          出勤
        </PrimaryButton>
      ) : (
        <VStack align="start" spacing={4}>
          <Text>出勤時刻：{formatTime(attendance.check_in_at)}</Text>

          <Text>
            退勤時刻：
            {attendance.check_out_at
              ? formatTime(attendance.check_out_at)
              : "未退勤"}
          </Text>

          {!attendance.check_out_at && (
            <HStack>
              {!activeBreak ? (
                <CautionButton onClick={onStartBreak} isLoading={submitting}>
                  休憩開始
                </CautionButton>
              ) : (
                <Button
                  colorScheme="orange"
                  onClick={onEndBreak}
                  isLoading={submitting}
                >
                  休憩終了
                </Button>
              )}

              <DangerButton onClick={onCheckOut} isLoading={submitting}>
                退勤
              </DangerButton>
            </HStack>
          )}

          <Divider />

          <Box>
            <Heading size="sm" mb={2}>
              本日の休憩履歴
            </Heading>

            {breaks.length === 0 ? (
              <Text fontSize="sm" color="gray.500">
                休憩はまだありません
              </Text>
            ) : (
              <VStack align="start" spacing={1}>
                {breaks.map((b, index) => {
                  return (
                    <Text key={b.id} fontSize="sm">
                      {index + 1}. {formatTime(b.break_start_at)} 〜{" "}
                      {b.break_end_at ? formatTime(b.break_end_at) : "休憩中"}
                    </Text>
                  );
                })}
              </VStack>
            )}
          </Box>
        </VStack>
      )}
    </Box>
  );
}

export default AttendanceView;
