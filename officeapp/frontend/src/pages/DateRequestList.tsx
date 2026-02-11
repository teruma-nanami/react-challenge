import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
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

type DateRequest = {
  id: number;
  user_id: number;

  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD

  reason: string;
  status: string; // pending / approved / rejected
  reject_reason: string | null;

  created_at: string;
  updated_at: string;
};

type Profile = {
  id: number;
  role?: string; // admin / staff
};

function fmtDate(yyyyMMdd: string | null | undefined) {
  if (!yyyyMMdd) return "—";
  return yyyyMMdd.replaceAll("-", "/");
}

function fmtDateTime(v: string | null | undefined) {
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
      // プロフィール取得に失敗しても一覧表示は継続する
      setProfile(null);
    }
  };

  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await apiFetch<DateRequest[]>("/api/date-requests", {
        method: "GET",
      });
      setItems(data);
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
    setRejectReason(r.reject_reason ?? "");
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

  // 却下（reject_reason 必須）
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
        body: { reject_reason: rejectReason.trim() },
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
                <Td colSpan={5}>
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
                    {selected.reject_reason ?? "—"}
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

                      <HStack mt={3} spacing={3}>
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
