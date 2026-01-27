import { useEffect, useState } from "react";
import { Box, Heading, Spinner, Text, VStack, HStack } from "@chakra-ui/react";
import { apiFetch } from "../lib/api";
import type { ApiResponse } from "../types/api";
import type { BillingRequest } from "../types/billingRequest";

function BillingRequestList() {
  const [requests, setRequests] = useState<BillingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchList = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<
        ApiResponse<{
          data: BillingRequest[];
          current_page: number;
          last_page: number;
        }>
      >("/api/billing-requests");

      // ✅ ここが重要：配列は data.data
      setRequests(res.data.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return (
      <Box>
        <Heading mb={4}>ミニ稟議一覧</Heading>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box>
      <Heading mb={4}>ミニ稟議一覧</Heading>

      {error && (
        <Text mb={4} color="red.500">
          {error}
        </Text>
      )}

      {requests.length === 0 ? (
        <Text>稟議はまだありません。</Text>
      ) : (
        <VStack align="stretch" spacing={4}>
          {requests.map((req) => (
            <Box
              key={req.id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              bg="white"
            >
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="bold">{req.title}</Text>
                <Text fontSize="sm" color="gray.500">
                  ¥{req.amount.toLocaleString()}
                </Text>
              </HStack>

              <Text fontSize="sm" color="gray.600">
                {req.reason}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default BillingRequestList;
