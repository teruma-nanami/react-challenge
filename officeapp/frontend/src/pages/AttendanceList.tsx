import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
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
import { apiFetch } from "../lib/api";
import type { Attendance } from "../types/attendance";
import type { TimeRequestCreateInput, TimeRequest } from "../types/timeRequest";

export default function AttendanceList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 成功表示（POSTした結果を見せる）
  const [lastCreated, setLastCreated] = useState<TimeRequest | null>(null);

  // 勤怠一覧
  const [attendances, setAttendances] = useState<Attendance[]>([]);

  // modal
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Attendance | null>(null);

  // form in modal
  const [requestedInAt, setRequestedInAt] = useState("");
  const [requestedOutAt, setRequestedOutAt] = useState("");
  const [reason, setReason] = useState("");

  const canSubmit = useMemo(() => {
    return (
      Boolean(selected) &&
      Boolean(requestedInAt) &&
      Boolean(requestedOutAt) &&
      reason.trim().length > 0
    );
  }, [selected, requestedInAt, requestedOutAt, reason]);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch("/api/attendances");
      setAttendances(res as Attendance[]);
    } catch (e: any) {
      setError(e?.message ?? "failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (a: Attendance) => {
    setSelected(a);
    setLastCreated(null); // モーダルを開くたびに成功表示をリセット

    // 初期値：現在の勤怠時刻を入れておく（datetime-local 用に整形）
    setRequestedInAt(toDateTimeLocal(a.check_in_at));
    setRequestedOutAt(a.check_out_at ? toDateTimeLocal(a.check_out_at) : "");

    setReason("");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelected(null);
    setRequestedInAt("");
    setRequestedOutAt("");
    setReason("");
  };

  const submit = async () => {
    if (!selected) return;

    setLoading(true);
    setError(null);

    try {
      if (!requestedInAt || !requestedOutAt) {
        throw new Error(
          "requested_check_in_at / requested_check_out_at are required",
        );
      }
      if (!reason.trim()) {
        throw new Error("reason is required");
      }

      const payload: TimeRequestCreateInput = {
        requested_check_in_at: requestedInAt,
        requested_check_out_at: requestedOutAt,
        reason,
      };

      const created = await apiFetch(
        `/api/attendances/${selected.id}/time-requests`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      // 申請できたことが分かるように表示
      setLastCreated(created as TimeRequest);

      // フォームはそのまま残す（再編集したい時があるので）
      // closeModal(); ← 自動で閉じたければこれに戻す
    } catch (e: any) {
      setError(e?.message ?? "failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={6}>
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <Heading size="md">勤怠一覧（時刻修正申請）</Heading>
          <Button onClick={load} isLoading={loading}>
            Reload
          </Button>
        </HStack>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Box borderWidth="1px" borderRadius="md" p={4}>
          <Text fontWeight="bold" mb={3}>
            勤怠一覧
          </Text>

          {attendances.length === 0 ? (
            <Text>勤怠がありません</Text>
          ) : (
            <VStack align="stretch" spacing={3}>
              {attendances.map((a) => (
                <Box key={a.id} borderWidth="1px" borderRadius="md" p={3}>
                  <HStack justify="space-between" align="start">
                    <Box>
                      <Text fontWeight="bold">
                        {a.work_date}（attendance_id: {a.id}）
                      </Text>
                      <Text fontSize="sm" opacity={0.85}>
                        check_in: {a.check_in_at}
                      </Text>
                      <Text fontSize="sm" opacity={0.85}>
                        check_out: {a.check_out_at ?? "-"}
                      </Text>
                    </Box>

                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => openModal(a)}
                      isLoading={loading}
                    >
                      詳細 / 修正申請
                    </Button>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </VStack>

      <Modal isOpen={isOpen} onClose={closeModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>勤怠詳細 / 時刻修正申請</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {selected && (
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="bold">
                    {selected.work_date}（attendance_id: {selected.id}）
                  </Text>
                  <Text fontSize="sm" opacity={0.85}>
                    現在 check_in: {selected.check_in_at}
                  </Text>
                  <Text fontSize="sm" opacity={0.85}>
                    現在 check_out: {selected.check_out_at ?? "-"}
                  </Text>
                </Box>

                {lastCreated && (
                  <Alert status="success">
                    <AlertIcon />
                    申請しました（request_id: {lastCreated.id} / status:{" "}
                    {lastCreated.status}）
                  </Alert>
                )}

                <Box borderWidth="1px" borderRadius="md" p={3}>
                  <Text fontWeight="bold" mb={3}>
                    修正申請フォーム
                  </Text>

                  <VStack align="stretch" spacing={3}>
                    <Box>
                      <Text fontSize="sm" mb={1}>
                        requested_check_in_at
                      </Text>
                      <Input
                        type="datetime-local"
                        value={requestedInAt}
                        onChange={(e) => setRequestedInAt(e.target.value)}
                      />
                    </Box>

                    <Box>
                      <Text fontSize="sm" mb={1}>
                        requested_check_out_at
                      </Text>
                      <Input
                        type="datetime-local"
                        value={requestedOutAt}
                        onChange={(e) => setRequestedOutAt(e.target.value)}
                      />
                    </Box>

                    <Box>
                      <Text fontSize="sm" mb={1}>
                        reason
                      </Text>
                      <Textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                      />
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            )}
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button variant="ghost" onClick={closeModal} isLoading={loading}>
                閉じる
              </Button>
              <Button
                colorScheme="blue"
                onClick={submit}
                isDisabled={!canSubmit}
                isLoading={loading}
              >
                申請する
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

/**
 * ISO文字列などを datetime-local の形式 (YYYY-MM-DDTHH:mm) に寄せる
 */
function toDateTimeLocal(isoLike: string): string {
  const d = new Date(isoLike);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}
