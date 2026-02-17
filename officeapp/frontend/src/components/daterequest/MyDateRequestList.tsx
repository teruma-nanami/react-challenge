// src/components/daterequest/MyDateRequestList.tsx

import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { DateRequest } from "../../types/dateRequest";
import { formatJst, formatYmd } from "../../utils/time";

type Props = {
  items: DateRequest[];
  loading: boolean;
};

function labelStatus(v: DateRequest["status"]): string {
  if (v === "approved") return "承認";
  if (v === "rejected") return "却下";
  return "申請中";
}

function statusBadge(v: DateRequest["status"]) {
  if (v === "approved") return <Badge colorScheme="green">承認</Badge>;
  if (v === "rejected") return <Badge colorScheme="red">却下</Badge>;
  return <Badge colorScheme="orange">申請中</Badge>;
}

function labelSession(v: DateRequest["session"]): string {
  if (v === "am") return "午前";
  if (v === "pm") return "午後";
  return "全日";
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
              <HStack spacing={2} align="center">
                <Text fontWeight="700">#{r.id}</Text>
                {statusBadge(r.status)}
                <Text fontWeight="700">
                  {formatYmd(r.start_date)}〜{formatYmd(r.end_date)}（
                  {labelSession(r.session)}）
                </Text>
              </HStack>

              {r.created_at && (
                <Text fontSize="sm" color="gray.600" mt={1}>
                  申請日：{formatJst(r.created_at)}
                </Text>
              )}

              <Text whiteSpace="pre-wrap" mt={2}>
                {r.reason}
              </Text>

              {r.status === "rejected" && r.rejected_reason && (
                <Text color="red.500" mt={2}>
                  却下理由：{r.rejected_reason}
                </Text>
              )}

              {/* デバッグ用途で status を見たい場合は残すが、基本はラベルだけで十分 */}
              {/* <Text fontSize="xs" color="gray.500" mt={2}>status: {r.status}</Text> */}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
