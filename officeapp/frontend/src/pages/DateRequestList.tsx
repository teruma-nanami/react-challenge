import { useEffect, useMemo, useState } from "react";
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
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { apiFetch } from "../lib/api";
import { formatJst } from "../utils/time";
import type {
  DateRequest,
  DateRequestSession,
  DateRequestStatus,
} from "../types/dateRequest";

type Profile = {
  id: number;
  role?: string; // admin / staff
};

/**
 * APIがもし start_date/end_date を datetime で返しても表示崩れしないように
 * "YYYY-MM-DD" だけに正規化して表示する
 */
function fmtDate(value: string | null | undefined) {
  if (!value) return "—";

  // "2026-02-11T00:00:00.000000Z" / "2026-02-11 00:00:00" / "2026-02-11"
  const ymd = value.includes("T")
    ? value.slice(0, 10)
    : value.includes(" ")
      ? value.split(" ")[0]
      : value;

  return ymd.replaceAll("-", "/");
}

function fmtDateTime(v: string | null | undefined) {
  if (!v) return "—";
  const iso = v.endsWith("Z") ? v : `${v}Z`;
  return formatJst(iso);
}

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

/**
 * バックエンドの返却が揺れても、フロントの型(DateRequest)に寄せて吸収する
 * - rejected_reason が正
 * - reject_reason で来た場合も rejected_reason に寄せる
 * - session が無い場合は full 扱い（表示のための暫定）
 */
function normalizeDateRequest(raw: any): DateRequest | null {
  if (!raw || typeof raw !== "object") return null;

  const id = raw.id;
  const user_id = raw.user_id;
  const start_date = raw.start_date;
  const end_date = raw.end_date;

  if (typeof id !== "number") return null;
  if (typeof user_id !== "number") return null;
  if (typeof start_date !== "string") return null;
  if (typeof end_date !== "string") return null;

  const session = (raw.session ?? "full") as DateRequestSession;
  const status = (raw.status ?? "pending") as DateRequestStatus;

  const rejected_reason = (raw.rejected_reason ?? raw.reject_reason ?? null) as
    | string
    | null;

  const reason = typeof raw.reason === "string" ? raw.reason : "";

  const created_at = typeof raw.created_at === "string" ? raw.created_at : "";
  const updated_at = typeof raw.updated_at === "string" ? raw.updated_at : "";

  return {
    id,
    user_id,
    start_date,
    end_date,
    session,
    reason,
    status,
    rejected_reason,
    created_at,
    updated_at,
  };
}

export default function DateRequestList() {
  const toast = useToast();

  const [items, setItems] = useState<DateRequest[]>([]);
  const [loading, setLoading] = useState(false);

  // 管理者判定（/api/profile を利用）
  const [profile, setProfile] = useState<Profile | null>(null);
  const isAdmin = useMemo(() => profile?.role === "admin", [profile]);

  // 詳細モーダル
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<DateRequest | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const me = await apiFetch<Profile>("/api/profile", { method: "GET" });
      setProfile(me);
    } catch {
      setProfile(null);
    }
  };

  const fetchList = async () => {
    setLoading(true);
    try {
      const raw = await apiFetch<unknown>("/api/date-requests", {
        method: "GET",
      });

      const arr = Array.isArray(raw) ? raw : [];
      const normalized = arr
        .map((x) => normalizeDateRequest(x))
        .filter((x): x is DateRequest => x !== null);

      setItems(normalized);
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "休日申請一覧の取得に失敗しました",
        description: String(e),
      });
    } finally {
      setLoading(false);
    }
  };

  const openDetail = (r: DateRequest) => {
    setSelected(r);
    setRejectReason(r.rejected_reason ?? "");
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setSelected(null);
    setRejectReason("");
  };

  // 承認（叩く先のAPIは後で作る想定）
  const onApprove = async () => {
    if (!selected) return;

    if (!isAdmin) {
      toast({ status: "error", title: "管理者のみ操作できます" });
      return;
    }

    setActionLoading(true);
    try {
      await apiFetch(`/api/admin/date-requests/${selected.id}/approve`, {
        method: "POST",
      });

      toast({ status: "success", title: "承認しました" });
      await fetchList();
      closeDetail();
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "承認に失敗しました",
        description: String(e),
      });
    } finally {
      setActionLoading(false);
    }
  };

  // 却下（rejected_reason 必須）
  const onReject = async () => {
    if (!selected) return;

    if (!isAdmin) {
      toast({ status: "error", title: "管理者のみ操作できます" });
      return;
    }

    if (!rejectReason.trim()) {
      toast({ status: "error", title: "却下理由は必須です" });
      return;
    }

    setActionLoading(true);
    try {
      await apiFetch(`/api/admin/date-requests/${selected.id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejected_reason: rejectReason.trim() }),
      });

      toast({ status: "success", title: "却下しました" });
      await fetchList();
      closeDetail();
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "却下に失敗しました",
        description: String(e),
      });
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <HStack justify="space-between" align="center" mb={4}>
        <Heading size="md">休日申請一覧</Heading>

        <HStack>
          <Button
            size="sm"
            variant="outline"
            onClick={fetchList}
            isLoading={loading}
          >
            再読込
          </Button>
        </HStack>
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
              <Tr key={r.id}>
                <Td>{fmtDateTime(r.created_at)}</Td>
                <Td>
                  {fmtDate(r.start_date)} 〜 {fmtDate(r.end_date)}
                </Td>
                <Td>{toJaSession(r.session)}</Td>
                <Td>{toJaStatus(r.status)}</Td>
                <Td maxW="360px">
                  <Text noOfLines={2}>{r.reason}</Text>
                </Td>
                <Td textAlign="right">
                  <Button size="sm" onClick={() => openDetail(r)}>
                    詳細
                  </Button>
                </Td>
              </Tr>
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

      {/* ===== 詳細モーダル（管理者は承認/却下） ===== */}
      <Modal isOpen={detailOpen} onClose={closeDetail} size="lg">
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
                  <Text fontWeight="700">
                    {fmtDateTime(selected.created_at)}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="sm" color="gray.600">
                    期間
                  </Text>
                  <Text fontWeight="700">
                    {fmtDate(selected.start_date)} 〜{" "}
                    {fmtDate(selected.end_date)}
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

                {isAdmin && (
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
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="例：申請内容が不明確です。対象日を確認してください。"
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
                )}

                {!isAdmin && (
                  <Text fontSize="sm" color="gray.500">
                    ※ 管理者のみ承認/却下できます
                  </Text>
                )}
              </VStack>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={closeDetail}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
