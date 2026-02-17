// src/components/daterequest/DateRequestListRow.tsx

import { Button, Td, Text, Tr } from "@chakra-ui/react";
import type { DateRequest } from "../../types/dateRequest";
import { formatJst, formatYmd } from "../../utils/time";

type Props = {
  item: DateRequest;
  onOpenDetail: (r: DateRequest) => void;
};

function toJaStatus(status: DateRequest["status"]) {
  if (status === "approved") return "承認";
  if (status === "rejected") return "却下";
  return "申請中";
}

function toJaSession(session: DateRequest["session"]) {
  if (session === "am") return "午前";
  if (session === "pm") return "午後";
  return "全日";
}

export default function DateRequestListRow({ item, onOpenDetail }: Props) {
  return (
    <Tr>
      <Td>{formatJst(item.created_at)}</Td>
      <Td>
        {formatYmd(item.start_date)} 〜 {formatYmd(item.end_date)}
      </Td>
      <Td>{toJaSession(item.session)}</Td>
      <Td>{toJaStatus(item.status)}</Td>
      <Td maxW="360px">
        <Text noOfLines={2}>{item.reason}</Text>
      </Td>
      <Td textAlign="right">
        <Button size="sm" onClick={() => onOpenDetail(item)}>
          詳細
        </Button>
      </Td>
    </Tr>
  );
}
