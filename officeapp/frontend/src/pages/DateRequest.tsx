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
      const res = await apiFetch("/api/date-requests");
      setItems(res as DateRequest[]);
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
        throw new Error("reason is required");
      }

      const payload: DateRequestCreateInput = {
        start_date: startDate,
        end_date: endDate,
        session,
        reason,
      };

      const created = await apiFetch("/api/date-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setItems((prev) => [created as DateRequest, ...prev]);
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
        <Heading size="md">休日申請</Heading>

        <HStack>
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
          <VStack align="stretch" spacing={4}>
            <Text fontWeight="bold">申請作成</Text>

            <HStack align="flex-end" spacing={4} flexWrap="wrap">
              <FormControl>
                <FormLabel>start_date</FormLabel>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>end_date</FormLabel>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>session</FormLabel>
                <Select
                  value={session}
                  onChange={(e) =>
                    setSession(e.target.value as DateRequestSession)
                  }
                >
                  <option value="full">full</option>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </Select>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>reason</FormLabel>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
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
            <Text>No items</Text>
          ) : (
            <VStack align="stretch" spacing={3}>
              {items.map((r) => (
                <Box key={r.id} borderWidth="1px" borderRadius="md" p={3}>
                  <Text fontWeight="bold">
                    #{r.id} [{r.status}] {r.start_date}〜{r.end_date} (
                    {r.session})
                  </Text>
                  <Text whiteSpace="pre-wrap" mt={2}>
                    {r.reason}
                  </Text>
                  {r.rejected_reason && (
                    <Text color="red.500" mt={2}>
                      rejected_reason: {r.rejected_reason}
                    </Text>
                  )}
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
