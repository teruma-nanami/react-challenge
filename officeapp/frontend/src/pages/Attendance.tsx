import { useEffect, useMemo, useState } from "react";
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
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";

import { apiFetch } from "../lib/api";
import type { Attendance } from "../types/attendance";
import type { BreakTime } from "../types/breakTime";

import AttendanceView from "../components/attendance/AttendanceView";
import { formatJst } from "../utils/time";

function formatTime(value: string | null | undefined): string {
  if (!value) return "—";

  // BreakTime が "Z" 無しで来ても UTC として扱う
  const iso = value.endsWith("Z") ? value : `${value}Z`;
  return formatJst(iso);
}

function formatWorkDate(yyyyMMdd: string) {
  if (!yyyyMMdd) return "—";
  return yyyyMMdd.replaceAll("-", "/");
}

// datetime-local 用（ブラウザのローカル時間＝JST前提）
// ISO(UTC) -> "YYYY-MM-DDTHH:mm"（ローカル）
function isoToLocalInput(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso.endsWith("Z") ? iso : `${iso}Z`);
  if (Number.isNaN(d.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

// "YYYY-MM-DDTHH:mm"（ローカル） -> ISO(UTC) string
function localInputToIso(localValue: string): string {
  // new Date("YYYY-MM-DDTHH:mm") はローカルとして解釈される
  const d = new Date(localValue);
  return d.toISOString();
}

// ★ today API の戻りを「Attendance|null」に正規化
function normalizeTodayAttendance(payload: unknown): Attendance | null {
  if (!payload) return null;
  if (Array.isArray(payload)) return null;
  if (typeof payload !== "object") return null;

  const p = payload as any;
  if (typeof p.id !== "number") return null;
  if (typeof p.work_date !== "string") return null;

  return p as Attendance;
}

type TimeRequestPayload = {
  requested_check_in_at: string;
  requested_check_out_at: string | null;
  reason: string;
};

export default function AttendancePage() {
  const toast = useToast();

  // ===== 当日（勤怠＋休憩） =====
  const [today, setToday] = useState<Attendance | null>(null);
  const [breaks, setBreaks] = useState<BreakTime[]>([]);
  const [todayLoading, setTodayLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ===== 一覧 =====
  const [list, setList] = useState<Attendance[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  // ===== 詳細モーダル（時刻修正申請） =====
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<Attendance | null>(null);
  const [reqCheckIn, setReqCheckIn] = useState<string>("");
  const [reqCheckOut, setReqCheckOut] = useState<string>("");
  const [reqReason, setReqReason] = useState<string>("");
  const [requestSubmitting, setRequestSubmitting] = useState(false);

  const activeBreak = useMemo(() => {
    return breaks.find(
      (b) => b.break_end_at === null || b.break_end_at === undefined,
    );
  }, [breaks]);

  const fetchBreaks = async (attendanceId: number) => {
    const b = await apiFetch<BreakTime[]>(
      `/api/attendances/${attendanceId}/break-times`,
      { method: "GET" },
    );
    setBreaks(b);
  };

  const fetchToday = async () => {
    setTodayLoading(true);
    try {
      const raw = await apiFetch<unknown>("/api/attendances/today", {
        method: "GET",
      });

      const data = normalizeTodayAttendance(raw);

      setToday(data);

      if (data?.id) {
        await fetchBreaks(data.id);
      } else {
        setBreaks([]);
      }
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "当日勤怠の取得に失敗しました",
        description: String(e),
      });
    } finally {
      setTodayLoading(false);
    }
  };

  const fetchList = async () => {
    setListLoading(true);
    try {
      const qs = new URLSearchParams();
      if (from) qs.set("from", from);
      if (to) qs.set("to", to);

      const path =
        qs.toString().length > 0
          ? `/api/attendances?${qs.toString()}`
          : "/api/attendances";

      const data = await apiFetch<Attendance[]>(path, { method: "GET" });
      setList(data);
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "勤怠一覧の取得に失敗しました",
        description: String(e),
      });
    } finally {
      setListLoading(false);
    }
  };

  const onCheckIn = async () => {
    setSubmitting(true);
    try {
      await apiFetch<Attendance>("/api/attendances/check-in", {
        method: "POST",
      });
      toast({ status: "success", title: "出勤打刻しました" });
      await fetchToday();
      await fetchList();
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "出勤打刻に失敗しました",
        description: String(e),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onCheckOut = async () => {
    setSubmitting(true);
    try {
      await apiFetch<Attendance>("/api/attendances/check-out", {
        method: "POST",
      });
      toast({ status: "success", title: "退勤打刻しました" });
      await fetchToday();
      await fetchList();
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "退勤打刻に失敗しました",
        description: String(e),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onStartBreak = async () => {
    if (!today?.id) return;

    setSubmitting(true);
    try {
      await apiFetch("/api/break-times/start", { method: "POST" });
      toast({ status: "success", title: "休憩を開始しました" });
      await fetchBreaks(today.id);
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "休憩開始に失敗しました",
        description: String(e),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onEndBreak = async () => {
    if (!today?.id) return;
    if (!activeBreak?.id) return;

    setSubmitting(true);
    try {
      await apiFetch(`/api/break-times/${activeBreak.id}/end`, {
        method: "PUT",
      });
      toast({ status: "success", title: "休憩を終了しました" });
      await fetchBreaks(today.id);
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "休憩終了に失敗しました",
        description: String(e),
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ===== 一覧：詳細モーダルを開く =====
  const openDetail = (a: Attendance) => {
    setSelected(a);

    // 申請フォーム初期値：現在値を入れておく（修正しやすい）
    setReqCheckIn(isoToLocalInput(a.check_in_at));
    setReqCheckOut(isoToLocalInput(a.check_out_at));

    setReqReason("");
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setSelected(null);
  };

  // ===== 時刻修正申請（申請＝TimeRequest作成） =====
  const submitTimeRequest = async () => {
    if (!selected?.id) return;

    // 出勤は必須。退勤は任意（未退勤なら空でもOK）
    if (!reqCheckIn) {
      toast({ status: "error", title: "出勤時刻（修正後）は必須です" });
      return;
    }
    if (!reqReason.trim()) {
      toast({ status: "error", title: "理由は必須です" });
      return;
    }

    const payload: TimeRequestPayload = {
      requested_check_in_at: localInputToIso(reqCheckIn),
      requested_check_out_at: reqCheckOut ? localInputToIso(reqCheckOut) : null,
      reason: reqReason.trim(),
    };

    setRequestSubmitting(true);
    try {
      await apiFetch(`/api/attendances/${selected.id}/time-requests`, {
        method: "POST",
        body: payload,
      });

      toast({ status: "success", title: "時刻修正申請を送信しました" });

      // 一覧を更新（必要なら）
      await fetchList();

      closeDetail();
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "申請に失敗しました",
        description: String(e),
      });
    } finally {
      setRequestSubmitting(false);
    }
  };

  useEffect(() => {
    fetchToday();
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack align="stretch" spacing={6}>
      <Heading size="md">勤怠</Heading>

      {/* ===== 当日（勤怠＋休憩） ===== */}
      <Box>
        <HStack justify="space-between" align="center" mb={3}>
          <Heading size="sm">当日の勤怠</Heading>

          <HStack>
            <Button
              size="sm"
              variant="outline"
              onClick={fetchToday}
              isLoading={todayLoading}
            >
              再読込
            </Button>
          </HStack>
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

      {/* ===== 一覧 ===== */}
      <Box>
        <HStack justify="space-between" align="center" mb={3}>
          <Heading size="sm">勤怠一覧</Heading>

          <Button
            size="sm"
            variant="outline"
            onClick={fetchList}
            isLoading={listLoading}
          >
            再読込
          </Button>
        </HStack>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={4}
          mb={4}
        >
          <GridItem>
            <FormControl>
              <FormLabel fontSize="sm">From</FormLabel>
              <Input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel fontSize="sm">To</FormLabel>
              <Input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem display="flex" alignItems="end" justifyContent="flex-end">
            <Button
              colorScheme="blue"
              onClick={fetchList}
              isLoading={listLoading}
              w={{ base: "100%", md: "auto" }}
            >
              絞り込み
            </Button>
          </GridItem>
        </Grid>

        <Box borderWidth="1px" borderRadius="lg" overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>日付</Th>
                <Th>出勤</Th>
                <Th>退勤</Th>
                <Th textAlign="right">詳細</Th>
              </Tr>
            </Thead>

            <Tbody>
              {list.map((a) => (
                <Tr key={a.id}>
                  <Td fontWeight="700">{formatWorkDate(a.work_date)}</Td>
                  <Td>{a.check_in_at ? formatTime(a.check_in_at) : "—"}</Td>
                  <Td>{a.check_out_at ? formatTime(a.check_out_at) : "—"}</Td>
                  <Td textAlign="right">
                    <Button size="sm" onClick={() => openDetail(a)}>
                      詳細
                    </Button>
                  </Td>
                </Tr>
              ))}

              {list.length === 0 && (
                <Tr>
                  <Td colSpan={4}>
                    <Text color="gray.600" py={4}>
                      データがありません。
                    </Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>

        {listLoading && (
          <HStack mt={3} spacing={2} color="gray.600">
            <Spinner size="sm" />
            <Text fontSize="sm">読み込み中...</Text>
          </HStack>
        )}
      </Box>

      {/* ===== 詳細モーダル（時刻修正申請） ===== */}
      <Modal isOpen={detailOpen} onClose={closeDetail} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>勤怠詳細 / 時刻修正申請</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {!selected ? (
              <Text>選択された勤怠がありません。</Text>
            ) : (
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontSize="sm" color="gray.600">
                    日付
                  </Text>
                  <Text fontWeight="700">
                    {formatWorkDate(selected.work_date)}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="sm" color="gray.600">
                    現在の時刻
                  </Text>
                  <Text>
                    出勤：
                    {selected.check_in_at
                      ? formatTime(selected.check_in_at)
                      : "—"}
                  </Text>
                  <Text>
                    退勤：
                    {selected.check_out_at
                      ? formatTime(selected.check_out_at)
                      : "—"}
                  </Text>
                </Box>

                <Divider />

                <Box>
                  <Heading size="sm" mb={2}>
                    修正申請（申請）
                  </Heading>

                  <Grid
                    templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                    gap={4}
                  >
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel fontSize="sm">出勤（修正後）</FormLabel>
                        <Input
                          type="datetime-local"
                          value={reqCheckIn}
                          onChange={(e) => setReqCheckIn(e.target.value)}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel fontSize="sm">退勤（修正後）</FormLabel>
                        <Input
                          type="datetime-local"
                          value={reqCheckOut}
                          onChange={(e) => setReqCheckOut(e.target.value)}
                          placeholder="未退勤なら空でOK"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <FormControl mt={4} isRequired>
                    <FormLabel fontSize="sm">理由</FormLabel>
                    <Textarea
                      value={reqReason}
                      onChange={(e) => setReqReason(e.target.value)}
                      placeholder="例：打刻漏れ、端末不具合 など"
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
              <Button variant="ghost" onClick={closeDetail}>
                閉じる
              </Button>
              <Button
                colorScheme="blue"
                onClick={submitTimeRequest}
                isLoading={requestSubmitting}
                isDisabled={!selected}
              >
                申請する
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
