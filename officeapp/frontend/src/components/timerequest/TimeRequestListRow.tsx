// src/components/timerequest/TimeRequestListRow.tsx
// ※ すでに作ってある想定だけど、Props の形がズレるとハマるので完成形も載せます

import { Button, Td, Text, Tr } from "@chakra-ui/react";

type TimeRequest = {
  id: number;
  attendance_id: number;
  requested_check_in_at: string;
  requested_check_out_at: string | null;
  reason: string;
  status: string;
  created_at: string;
};

type Props = {
  item: TimeRequest;
  onOpenDetail: (item: TimeRequest) => void;
  fmt: (v: string | null | undefined) => string;
  toJaStatus: (status: string) => string;
};

export default function TimeRequestListRow({
  item,
  onOpenDetail,
  fmt,
  toJaStatus,
}: Props) {
  return (
    <Tr>
      <Td>{fmt(item.created_at)}</Td>
      <Td>{item.attendance_id}</Td>
      <Td>{fmt(item.requested_check_in_at)}</Td>
      <Td>
        {item.requested_check_out_at ? fmt(item.requested_check_out_at) : "—"}
      </Td>
      <Td>{toJaStatus(item.status)}</Td>
      <Td maxW="320px">
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
