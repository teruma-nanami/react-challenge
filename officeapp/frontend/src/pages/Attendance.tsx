// src/pages/Attendance.tsx
import { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import AttendanceView from "../components/attendance/AttendanceView";
import AttendanceModal from "../components/attendance/AttendanceModal";
import AttendanceList from "../components/attendance/AttendanceList";
import { useAttendance } from "../hooks/useAttendance";
import { formatJst, formatYmd } from "../utils/time";

function formatTime(value: string | null | undefined): string {
  return formatJst(value);
}

export default function Attendance() {
  const toast = useToast();

  const {
    // today
    today,
    breaks,
    activeBreak,
    todayLoading,
    fetchToday,

    // list
    list,
    listLoading,
    from,
    to,
    setFrom,
    setTo,
    fetchList,

    // actions
    submitting,
    onCheckIn,
    onCheckOut,
    onStartBreak,
    onEndBreak,

    // modal
    detailOpen,
    selected,
    reqCheckIn,
    reqCheckOut,
    reqReason,
    setReqCheckIn,
    setReqCheckOut,
    setReqReason,
    requestSubmitting,
    openDetail,
    closeDetail,
    submitTimeRequest,
  } = useAttendance({
    onError: (title, error) => {
      toast({
        status: "error",
        title,
        description: error ? String(error) : undefined,
      });
    },
    onSuccess: (title) => {
      toast({ status: "success", title });
    },
  });

  useEffect(() => {
    void fetchToday();
    void fetchList();
  }, [fetchToday, fetchList]);

  return (
    <VStack align="stretch" spacing={6}>
      <Heading size="md">勤怠</Heading>

      {/* ===== 当日（勤怠＋休憩） ===== */}
      <Box>
        <HStack justify="space-between" align="center" mb={3}>
          <Heading size="sm">当日の勤怠</Heading>

          <Button
            size="sm"
            variant="outline"
            onClick={() => void fetchToday()}
            isLoading={todayLoading}
          >
            再読込
          </Button>
        </HStack>

        <AttendanceView
          attendance={today}
          breaks={breaks}
          activeBreak={activeBreak}
          submitting={submitting}
          onCheckIn={onCheckIn}
          onCheckOut={onCheckOut}
          onStartBreak={onStartBreak}
          onEndBreak={onEndBreak}
          formatTime={formatTime}
        />

        {todayLoading && (
          <HStack mt={3} spacing={2} color="gray.600">
            <Spinner size="sm" />
            <Text fontSize="sm">読み込み中...</Text>
          </HStack>
        )}
      </Box>

      <Divider />

      {/* ===== 一覧（AttendanceList） ===== */}
      <AttendanceList
        list={list}
        listLoading={listLoading}
        from={from}
        to={to}
        onChangeFrom={setFrom}
        onChangeTo={setTo}
        onFetchList={fetchList}
        onOpenDetail={openDetail}
        formatWorkDate={formatYmd}
        formatTime={formatTime}
      />

      {/* ===== 詳細モーダル（時刻修正申請） ===== */}
      <AttendanceModal
        isOpen={detailOpen}
        onClose={closeDetail}
        attendance={selected}
        reqCheckIn={reqCheckIn}
        reqCheckOut={reqCheckOut}
        reqReason={reqReason}
        onChangeReqCheckIn={setReqCheckIn}
        onChangeReqCheckOut={setReqCheckOut}
        onChangeReqReason={setReqReason}
        onSubmit={submitTimeRequest}
        submitting={requestSubmitting}
        formatWorkDate={formatYmd}
        formatTime={formatTime}
      />
    </VStack>
  );
}
