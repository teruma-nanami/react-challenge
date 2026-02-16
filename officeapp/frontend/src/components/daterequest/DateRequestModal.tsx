// src/components/daterequest/DataRequestModal.tsx

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
  useToast,
} from "@chakra-ui/react";
import type {
  DateRequest,
  DateRequestSession,
  DateRequestStatus,
} from "../../types/dateRequest";

type Props = {
  isOpen: boolean;
  onClose: () => void;

  selected: DateRequest | null;

  isAdmin: boolean;

  rejectReason: string;
  onChangeRejectReason: (v: string) => void;

  actionLoading: boolean;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;

  fmtDate: (v: string | null | undefined) => string;
  fmtDateTime: (v: string | null | undefined) => string;
  toJaSession: (v: DateRequestSession | string | null | undefined) => string;
  toJaStatus: (v: DateRequestStatus | string) => string;
};

export default function DataRequestModal({
  isOpen,
  onClose,
  selected,
  isAdmin,
  rejectReason,
  onChangeRejectReason,
  actionLoading,
  onApprove,
  onReject,
  fmtDate,
  fmtDateTime,
  toJaSession,
  toJaStatus,
}: Props) {
  const toast = useToast();

  const canAction = !!selected && selected.status === "pending";
  const rejectReasonOk = rejectReason.trim().length > 0;

  const handleReject = async () => {
    if (!isAdmin) {
      toast({ status: "error", title: "管理者のみ操作できます" });
      return;
    }
    if (!selected) return;

    if (!rejectReasonOk) {
      toast({ status: "error", title: "却下理由は必須です" });
      return;
    }

    await onReject();
  };

  const handleApprove = async () => {
    if (!isAdmin) {
      toast({ status: "error", title: "管理者のみ操作できます" });
      return;
    }
    if (!selected) return;

    await onApprove();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>休日申請の詳細</ModalHeader>
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
                <Text fontWeight="700">{fmtDateTime(selected.created_at)}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600">
                  期間
                </Text>
                <Text fontWeight="700">
                  {fmtDate(selected.start_date)} 〜 {fmtDate(selected.end_date)}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600">
                  区分
                </Text>
                <Text fontWeight="700">{toJaSession(selected.session)}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.600">
                  ステータス
                </Text>
                <Text fontWeight="700">{toJaStatus(selected.status)}</Text>
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
                  {selected.rejected_reason ?? "—"}
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
                        placeholder="例：申請内容が不明確です。対象日を確認してください。"
                      />
                    </FormControl>

                    <HStack mt={3} spacing={3} align="center">
                      <Button
                        colorScheme="green"
                        onClick={handleApprove}
                        isLoading={actionLoading}
                        isDisabled={!canAction}
                      >
                        承認
                      </Button>

                      <Button
                        colorScheme="red"
                        onClick={handleReject}
                        isLoading={actionLoading}
                        isDisabled={!canAction || !rejectReasonOk}
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
