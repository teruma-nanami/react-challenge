// src/components/daterequest/MyDateRequestList.tsx

import { Alert, AlertIcon, Box, Text, VStack } from "@chakra-ui/react";
import type { DateRequest } from "../../types/dateRequest";
import { formatJst, formatYmd } from "../../utils/time";

type Props = {
  items: DateRequest[];
  loading: boolean;
};

function fmtDate(v: string | null | undefined) {
  return formatYmd(v);
}

function fmtDateTime(v: string | null | undefined) {
  // created_at / updated_at が "2026-02-11 00:30:29" みたいに来ても JST 表示に吸収
  return formatJst(v ? (v.endsWith("Z") ? v : `${v}Z`) : v);
}

export default function MyDateRequestList({ items, loading }: Props) {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={3}>
        自分の申請一覧
      </Text>

      {loading && items.length === 0 && (
        <Alert status="info" mb={3}>
          <AlertIcon />
          読み込み中...
        </Alert>
      )}

      {items.length === 0 && !loading ? (
        <Text color="gray.600">申請はまだありません。</Text>
      ) : (
        <VStack align="stretch" spacing={3}>
          {items.map((r) => (
            <Box key={r.id} borderWidth="1px" borderRadius="md" p={3}>
              <Text fontWeight="700">
                #{r.id} [{r.status}] {fmtDate(r.start_date)}〜
                {fmtDate(r.end_date)}（{r.session}）
              </Text>

              {r.created_at && (
                <Text fontSize="sm" color="gray.600" mt={1}>
                  申請日：{fmtDateTime(r.created_at)}
                </Text>
              )}

              <Text whiteSpace="pre-wrap" mt={2}>
                {r.reason}
              </Text>

              {r.rejected_reason && (
                <Text color="red.500" mt={2}>
                  却下理由：{r.rejected_reason}
                </Text>
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
