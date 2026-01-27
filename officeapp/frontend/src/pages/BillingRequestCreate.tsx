import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { apiFetch } from "../lib/api";
import type { ApiResponse } from "../types/api";
import type { BillingRequest } from "../types/billingRequest";

function BillingRequestCreate() {
  const navigate = useNavigate();

  // Auth0 導入まで仮
  const userId = 1;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      await apiFetch<ApiResponse<BillingRequest>>("/api/billing-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          title,
          amount,
          reason,
        }),
      });

      // 成功したら一覧（仮）へ
      navigate("/requests");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="600px">
      <Heading mb={6}>ミニ稟議（請求書作成）</Heading>

      {error && (
        <Text mb={4} color="red.500">
          {error}
        </Text>
      )}

      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>タイトル</FormLabel>
          <Input
            placeholder="【1月】請求書作成依頼"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>金額</FormLabel>
          <Input
            type="number"
            placeholder="50000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>理由</FormLabel>
          <Textarea
            placeholder="1月分 業務委託費の請求書発行のため"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={submit}
          isLoading={submitting}
          loadingText="送信中"
        >
          申請する
        </Button>
      </VStack>
    </Box>
  );
}

export default BillingRequestCreate;
