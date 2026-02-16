// src/components/daterequest/DataRequestListRow.tsx

import { Button, Td, Text, Tr } from "@chakra-ui/react";
import type {
  DateRequest,
  DateRequestSession,
  DateRequestStatus,
} from "../../types/dateRequest";

type Props = {
  item: DateRequest;
  onOpenDetail: (r: DateRequest) => void;

  fmtDate: (v: string | null | undefined) => string;
  fmtDateTime: (v: string | null | undefined) => string;
  toJaStatus: (status: DateRequestStatus | string) => string;
  toJaSession: (
    session: DateRequestSession | string | null | undefined,
  ) => string;
};

export default function DataRequestListRow({
  item,
  onOpenDetail,
  fmtDate,
  fmtDateTime,
  toJaStatus,
  toJaSession,
}: Props) {
  return (
    <Tr>
      <Td>{fmtDateTime(item.created_at)}</Td>
      <Td>
        {fmtDate(item.start_date)} 〜 {fmtDate(item.end_date)}
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
