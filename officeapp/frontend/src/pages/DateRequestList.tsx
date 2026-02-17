// src/pages/DateRequestList.tsx

import { useCallback, useEffect } from "react";
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

import { useDateRequestList } from "../hooks/useDateRequestList";
import DateRequestModal from "../components/daterequest/DateRequestModal";
import DateRequestListRow from "../components/daterequest/DateRequestListRow";
import type {
  DateRequestSession,
  DateRequestStatus,
} from "../types/dateRequest";
import { formatJst, formatYmd } from "../utils/time";

function toJaStatus(status: DateRequestStatus | string) {
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

function toJaSession(session: DateRequestSession | string | null | undefined) {
  switch (session) {
    case "full":
      return "全日";
    case "am":
      return "午前";
    case "pm":
      return "午後";
    default:
      return session ?? "—";
  }
}

export default function DateRequestList() {
  const toast = useToast();

  const handleError = useCallback(
    (title: string, error?: unknown) => {
      toast({
        status: "error",
        title,
        description: error ? String(error) : undefined,
      });
    },
    [toast],
  );

  const {
    // list
    items,
    loading,
    fetchList,

    // admin
    isAdmin,
    fetchProfile,

    // modal
    detailOpen,
    selected,
    openDetail,
    closeDetail,

    // reject input
    rejectReason,
    setRejectReason,

    // actions
    actionLoading,
    approve,
    reject,
  } = useDateRequestList({
    onError: handleError,
  });

  useEffect(() => {
    void fetchProfile();
    void fetchList();
  }, [fetchProfile, fetchList]);

  const handleReload = () => {
    void fetchList();
  };

  const onApprove = async () => {
    if (!selected) return;
    if (!isAdmin) {
      toast({ status: "error", title: "管理者のみ操作できます" });
      return;
    }
    if (selected.status !== "pending") return;

    try {
      await approve();
      toast({ status: "success", title: "承認しました" });
    } catch {
      // エラーtoastは hook 側（onError）で出す想定
    }
  };

  const onReject = async () => {
    if (!selected) return;
    if (!isAdmin) {
      toast({ status: "error", title: "管理者のみ操作できます" });
      return;
    }
    if (selected.status !== "pending") return;

    if (!rejectReason.trim()) {
      toast({ status: "error", title: "却下理由は必須です" });
      return;
    }

    try {
      await reject();
      toast({ status: "success", title: "却下しました" });
    } catch {
      // エラーtoastは hook 側（onError）で出す想定
    }
  };

  return (
    <Box>
      <HStack justify="space-between" align="center" mb={4}>
        <Heading size="md">休日申請一覧</Heading>

        <Button
          size="sm"
          variant="outline"
          onClick={handleReload}
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
              <Th>期間</Th>
              <Th>区分</Th>
              <Th>ステータス</Th>
              <Th>理由</Th>
              <Th textAlign="right">詳細</Th>
            </Tr>
          </Thead>

          <Tbody>
            {items.map((r) => (
              <DateRequestListRow
                key={r.id}
                item={r}
                onOpenDetail={openDetail}
                formatDate={formatYmd}
                formatDateTime={formatJst}
                toJaSession={toJaSession}
                toJaStatus={toJaStatus}
              />
            ))}

            {items.length === 0 && !loading && (
              <Tr>
                <Td colSpan={6}>
                  <Text color="gray.600" py={4}>
                    申請はまだありません。
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      <DateRequestModal
        isOpen={detailOpen}
        onClose={closeDetail}
        selected={selected}
        isAdmin={isAdmin}
        rejectReason={rejectReason}
        onChangeRejectReason={setRejectReason}
        actionLoading={actionLoading}
        onApprove={onApprove}
        onReject={onReject}
        formatDate={formatYmd}
        formatDateTime={formatJst}
        toJaSession={toJaSession}
        toJaStatus={toJaStatus}
      />
    </Box>
  );
}
