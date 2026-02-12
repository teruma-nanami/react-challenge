// src/pages/DateRequest.tsx
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { apiFetch } from "../lib/api";
import type {
  DateRequest,
  DateRequestCreateInput,
  DateRequestSession,
} from "../types/dateRequest";
import { formatYmd, formatJst } from "../utils/time";

function fmtDate(v: string | null | undefined) {
  return formatYmd(v);
}

function fmtDateTime(v: string | null | undefined) {
  // created_at / updated_at が "2026-02-11 00:30:29" みたいに来ても JST 表示に吸収
  return formatJst(v ? (v.endsWith("Z") ? v : `${v}Z`) : v);
}

export default function DateRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [items, setItems] = useState<DateRequest[]>([]);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [session, setSession] = useState<DateRequestSession>("full");
  const [reason, setReason] = useState("");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<DateRequest[]>("/api/date-requests", {
        method: "GET",
      });
      setItems(res);
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

  const submit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!reason.trim()) {
        throw new Error("理由は必須です");
      }

      const payload: DateRequestCreateInput = {
        start_date: startDate,
        end_date: endDate,
        session,
        reason: reason.trim(),
      };

      const created = await apiFetch<DateRequest>("/api/date-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setItems((prev) => [created, ...prev]);
      setReason("");
    } catch (e: any) {
      setError(e?.message ?? "failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={6}>
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between" align="center">
          <Heading size="md">休日申請</Heading>
          <Button
            onClick={load}
            isLoading={loading}
            variant="outline"
            size="sm"
          >
            再読込
          </Button>
        </HStack>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Box borderWidth="1px" borderRadius="md" p={4}>
          <VStack align="stretch" spacing={4}>
            <Text fontWeight="bold">申請作成</Text>

            <HStack align="flex-end" spacing={4} flexWrap="wrap">
              <FormControl>
                <FormLabel>開始日</FormLabel>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>終了日</FormLabel>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>区分</FormLabel>
                <Select
                  value={session}
                  onChange={(e) =>
                    setSession(e.target.value as DateRequestSession)
                  }
                >
                  <option value="full">全日</option>
                  <option value="am">午前</option>
                  <option value="pm">午後</option>
                </Select>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>理由</FormLabel>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="例：私用のため"
              />
            </FormControl>

            <Button colorScheme="blue" onClick={submit} isLoading={loading}>
              申請する
            </Button>
          </VStack>
        </Box>

        <Divider />

        <Box borderWidth="1px" borderRadius="md" p={4}>
          <Text fontWeight="bold" mb={3}>
            自分の申請一覧
          </Text>

          {items.length === 0 ? (
            <Text color="gray.600">申請はまだありません。</Text>
          ) : (
            <VStack align="stretch" spacing={3}>
              {items.map((r) => {
                const rejected =
                  (r as any).reject_reason ??
                  (r as any).rejected_reason ??
                  null;

                return (
                  <Box key={r.id} borderWidth="1px" borderRadius="md" p={3}>
                    <Text fontWeight="700">
                      #{r.id} [{r.status}] {fmtDate(r.start_date)}〜
                      {fmtDate(r.end_date)}（{r.session}）
                    </Text>

                    {/* created_at があるなら見せる（無ければ消えてOK） */}
                    {"created_at" in (r as any) && (
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        申請日：{fmtDateTime((r as any).created_at)}
                      </Text>
                    )}

                    <Text whiteSpace="pre-wrap" mt={2}>
                      {r.reason}
                    </Text>

                    {rejected && (
                      <Text color="red.500" mt={2}>
                        却下理由：{rejected}
                      </Text>
                    )}
                  </Box>
                );
              })}
            </VStack>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
