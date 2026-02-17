// src/pages/TimeRequestList.tsx

import { useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { formatJst } from "../utils/time";
import { useTimeRequestList } from "../hooks/useTimeRequestList";
import TimeRequestModal from "../components/timerequest/TimeRequestModal";
import TimeRequestListRow from "../components/timerequest/TimeRequestListRow";

function fmt(v: string | null | undefined) {
  if (!v) return "—";
  const iso = v.endsWith("Z") ? v : `${v}Z`;
  return formatJst(iso);
}

function toJaStatus(status: string) {
  switch (status) {
    case "pending":
      return "申請中";
    case "approved":
      return "承認";
    case "rejected":
      return "却下";
    default:
      return status;
  }
}

export default function TimeRequestList() {
  const toast = useToast();

  const {
    items,
    loading,
    fetchList,

    isAdmin,
    fetchProfile,

    detailOpen,
    selected,
    openDetail,
    closeDetail,

    rejectReason,
    setRejectReason,

    actionLoading,
    approve,
    reject,
  } = useTimeRequestList({
    onError: (title, error) => {
      toast({
        status: "error",
        title,
        description: error ? String(error) : undefined,
      });
    },
  });

  useEffect(() => {
    fetchProfile();
    fetchList().catch(() => {
      // toast は hook の onError 側で出る
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <HStack justify="space-between" align="center" mb={4}>
        <Heading size="md">時刻修正申請一覧</Heading>

        <Button
          size="sm"
          variant="outline"
          onClick={() => fetchList()}
          isLoading={loading}
        >
          再読込
        </Button>
      </HStack>

      {loading && (
        <HStack mb={3} spacing={2} color="gray.600">
          <Spinner size="sm" />
          <Text fontSize="sm">読み込み中...</Text>
        </HStack>
      )}

      <Box borderWidth="1px" borderRadius="lg" overflowX="auto">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>申請日</Th>
              <Th>対象勤怠ID</Th>
              <Th>修正後 出勤</Th>
              <Th>修正後 退勤</Th>
              <Th>ステータス</Th>
              <Th>理由</Th>
              <Th textAlign="right">詳細</Th>
            </Tr>
          </Thead>

          <Tbody>
            {items.map((r) => (
              <TimeRequestListRow
                key={r.id}
                item={r}
                onOpenDetail={openDetail}
                fmt={fmt}
                toJaStatus={toJaStatus}
              />
            ))}

            {items.length === 0 && !loading && (
              <Tr>
                <Td colSpan={7}>
                  <Text color="gray.600" py={4}>
                    申請はまだありません。
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      <TimeRequestModal
        isOpen={detailOpen}
        onClose={closeDetail}
        selected={selected}
        isAdmin={isAdmin}
        rejectReason={rejectReason}
        onChangeRejectReason={setRejectReason}
        actionLoading={actionLoading}
        onApprove={approve}
        onReject={reject}
        fmt={fmt}
        toJaStatus={toJaStatus}
      />
    </Box>
  );
}
