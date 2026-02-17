// src/components/attendance/AttendanceListRow.tsx

import { Button, Td, Tr } from "@chakra-ui/react";
import type { Attendance } from "../../types/attendance";

type Props = {
  item: Attendance;
  formatWorkDate: (value: string | null | undefined) => string;
  formatTime: (value: string | null | undefined) => string;
  onOpenDetail: (attendance: Attendance) => void;
};

export default function AttendanceListRow({
  item,
  formatWorkDate,
  formatTime,
  onOpenDetail,
}: Props) {
  const open = () => onOpenDetail(item);

  return (
    <Tr>
      <Td fontWeight="bold">
        <Button
          variant="link"
          size="sm"
          onClick={open}
          aria-label={`${formatWorkDate(item.work_date)} の詳細を開く`}
        >
          {formatWorkDate(item.work_date)}
        </Button>
      </Td>

      <Td>{formatTime(item.check_in_at)}</Td>
      <Td>{formatTime(item.check_out_at)}</Td>

      <Td textAlign="right">
        <Button size="sm" onClick={open}>
          詳細
        </Button>
      </Td>
    </Tr>
  );
}
