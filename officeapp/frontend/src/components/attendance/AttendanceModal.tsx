// src/components/attendance/AttendanceModal.tsx
import { useMemo } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import type { Attendance } from "../../types/attendance";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  attendance: Attendance | null;

  reqCheckIn: string;
  reqCheckOut: string;
  reqReason: string;

  onChangeReqCheckIn: (value: string) => void;
  onChangeReqCheckOut: (value: string) => void;
  onChangeReqReason: (value: string) => void;

  onSubmit: () => Promise<void>;
  submitting: boolean;

  formatWorkDate: (value: string | null | undefined) => string;
  formatTime: (value: string | null | undefined) => string;
};

function isValidDateTimeLocal(value: string): boolean {
  // datetime-local は "YYYY-MM-DDTHH:mm" が基本
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value);
}

export default function AttendanceModal({
  isOpen,
  onClose,
  attendance,
  reqCheckIn,
  reqCheckOut,
  reqReason,
  onChangeReqCheckIn,
  onChangeReqCheckOut,
  onChangeReqReason,
  onSubmit,
  submitting,
  formatWorkDate,
  formatTime,
}: Props) {
  const reasonTrimmed = useMemo(() => reqReason.trim(), [reqReason]);

  const isTimeOrderInvalid = useMemo(() => {
    if (!reqCheckIn || !reqCheckOut) return false;
    if (!isValidDateTimeLocal(reqCheckIn) || !isValidDateTimeLocal(reqCheckOut))
      return false;
    return reqCheckIn > reqCheckOut;
  }, [reqCheckIn, reqCheckOut]);

  const canSubmit = useMemo(() => {
    if (!attendance) return false;
    if (submitting) return false;
    if (!reqCheckIn) return false;
    if (!reasonTrimmed) return false;
    if (isTimeOrderInvalid) return false;
    return true;
  }, [attendance, submitting, reqCheckIn, reasonTrimmed, isTimeOrderInvalid]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      closeOnOverlayClick={!submitting}
      closeOnEsc={!submitting}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>勤怠詳細 / 時刻修正申請</ModalHeader>
        <ModalCloseButton isDisabled={submitting} />

        <ModalBody>
          {!attendance ? (
            <Text>選択された勤怠がありません。</Text>
          ) : (
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontSize="sm" color="gray.600">
                  日付
                </Text>
                <Text fontWeight="700">
                  {formatWorkDate(attendance.work_date)}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600">
                  現在の時刻
                </Text>
                <Text>出勤：{formatTime(attendance.check_in_at)}</Text>
                <Text>退勤：{formatTime(attendance.check_out_at)}</Text>
              </Box>

              <Divider />

              <Box>
                <Heading size="sm" mb={2}>
                  時刻修正申請
                </Heading>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel fontSize="sm">出勤（修正後）</FormLabel>
                      <Input
                        type="datetime-local"
                        value={reqCheckIn}
                        onChange={(e) => onChangeReqCheckIn(e.target.value)}
                        isDisabled={submitting}
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl isInvalid={isTimeOrderInvalid}>
                      <FormLabel fontSize="sm">退勤（修正後）</FormLabel>
                      <Input
                        type="datetime-local"
                        value={reqCheckOut}
                        onChange={(e) => onChangeReqCheckOut(e.target.value)}
                        placeholder="未退勤なら空でOK"
                        isDisabled={submitting}
                      />
                      {isTimeOrderInvalid && (
                        <Text fontSize="xs" color="red.500" mt={1}>
                          退勤は出勤以降の時刻にしてください。
                        </Text>
                      )}
                    </FormControl>
                  </GridItem>
                </Grid>

                <FormControl mt={4} isRequired>
                  <FormLabel fontSize="sm">理由</FormLabel>
                  <Textarea
                    value={reqReason}
                    onChange={(e) => onChangeReqReason(e.target.value)}
                    placeholder="例：打刻漏れ、端末不具合 など"
                    isDisabled={submitting}
                  />
                </FormControl>

                <Text mt={2} fontSize="xs" color="gray.500">
                  ※ これは「申請」です。勤怠データの即時更新はしません。
                </Text>
              </Box>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={onClose} isDisabled={submitting}>
              閉じる
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => void onSubmit()}
              isLoading={submitting}
              isDisabled={!canSubmit}
            >
              申請する
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
