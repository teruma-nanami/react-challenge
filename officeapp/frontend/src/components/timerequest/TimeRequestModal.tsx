// src/components/timerequest/TimeRequestModal.tsx

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
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

type TimeRequest = {
  id: number;
  user_id: number;
  attendance_id: number;

  requested_check_in_at: string;
  requested_check_out_at: string | null;

  reason: string;
  status: string; // pending / approved / rejected など
  reject_reason: string | null;

  created_at: string;
  updated_at: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;

  selected: TimeRequest | null;

  isAdmin: boolean;

  rejectReason: string;
  onChangeRejectReason: (v: string) => void;

  actionLoading: boolean;
  onApprove: () => void | Promise<void>;
  onReject: () => void | Promise<void>;

  fmt: (v: string | null | undefined) => string;
  toJaStatus: (status: string) => string;
};

export default function TimeRequestModal({
  isOpen,
  onClose,
  selected,
  isAdmin,
  rejectReason,
  onChangeRejectReason,
  actionLoading,
  onApprove,
  onReject,
  fmt,
  toJaStatus,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>時刻修正申請の詳細</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {!selected ? (
            <Text>選択された申請がありません。</Text>
          ) : (
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontSize="sm" color="gray.600">
                  申請日
                </Text>
                <Text fontWeight="700">{fmt(selected.created_at)}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600">
                  対象勤怠ID
                </Text>
                <Text fontWeight="700">{selected.attendance_id}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600">
                  ステータス
                </Text>
                <Text fontWeight="700">{toJaStatus(selected.status)}</Text>
              </Box>

              <Divider />

              <Box>
                <Text fontSize="sm" color="gray.600">
                  修正後 出勤
                </Text>
                <Text fontWeight="700">
                  {fmt(selected.requested_check_in_at)}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600">
                  修正後 退勤
                </Text>
                <Text fontWeight="700">
                  {selected.requested_check_out_at
                    ? fmt(selected.requested_check_out_at)
                    : "—"}
                </Text>
              </Box>

              <Divider />

              <Box>
                <Text fontSize="sm" color="gray.600" mb={1}>
                  理由
                </Text>
                <Text whiteSpace="pre-wrap">{selected.reason}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600" mb={1}>
                  却下理由
                </Text>
                <Text whiteSpace="pre-wrap">
                  {selected.reject_reason ?? "—"}
                </Text>
              </Box>

              {isAdmin ? (
                <>
                  <Divider />
                  <Box>
                    <Heading size="sm" mb={2}>
                      管理者操作
                    </Heading>

                    <FormControl>
                      <FormLabel fontSize="sm">
                        却下理由（却下時必須）
                      </FormLabel>
                      <Textarea
                        value={rejectReason}
                        onChange={(e) => onChangeRejectReason(e.target.value)}
                        placeholder="例：申請内容が不明確です。対象日時を確認してください。"
                      />
                    </FormControl>

                    <HStack mt={3} spacing={3} align="center">
                      <Button
                        colorScheme="green"
                        onClick={onApprove}
                        isLoading={actionLoading}
                        isDisabled={selected.status !== "pending"}
                      >
                        承認
                      </Button>

                      <Button
                        colorScheme="red"
                        onClick={onReject}
                        isLoading={actionLoading}
                        isDisabled={selected.status !== "pending"}
                      >
                        却下
                      </Button>

                      <Text fontSize="xs" color="gray.500">
                        ※ pending のときだけ操作可能
                      </Text>
                    </HStack>
                  </Box>
                </>
              ) : (
                <Text fontSize="sm" color="gray.500">
                  ※ 管理者のみ承認/却下できます
                </Text>
              )}
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
