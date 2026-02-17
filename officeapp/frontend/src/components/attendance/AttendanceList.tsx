// src/components/attendance/AttendanceList.tsx

import { useMemo } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { Attendance } from "../../types/attendance";
import AttendanceListRow from "./AttendanceListRow";

type Props = {
  list: Attendance[];

  from: string;
  to: string;
  onChangeFrom: (value: string) => void;
  onChangeTo: (value: string) => void;

  listLoading: boolean;
  onFetchList: () => Promise<unknown>;

  formatWorkDate: (value: string | null | undefined) => string;
  formatTime: (value: string | null | undefined) => string;

  onOpenDetail: (attendance: Attendance) => void;
};

export default function AttendanceList({
  list,
  from,
  to,
  onChangeFrom,
  onChangeTo,
  listLoading,
  onFetchList,
  formatWorkDate,
  formatTime,
  onOpenDetail,
}: Props) {
  const isInvalidRange = useMemo(() => {
    if (!from || !to) return false;
    return from > to;
  }, [from, to]);

  const canSubmit = !listLoading && !isInvalidRange;

  return (
    <Box>
      <Heading size="sm" mb={3}>
        勤怠一覧
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={4}
        mb={4}
      >
        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm">From</FormLabel>
            <Input
              type="date"
              value={from}
              onChange={(e) => onChangeFrom(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl>
            <FormLabel fontSize="sm">To</FormLabel>
            <Input
              type="date"
              value={to}
              onChange={(e) => onChangeTo(e.target.value)}
            />
          </FormControl>
        </GridItem>

        <GridItem display="flex" alignItems="end" justifyContent="flex-end">
          <Button
            colorScheme="blue"
            onClick={() => void onFetchList()}
            isLoading={listLoading}
            isDisabled={!canSubmit}
            w={{ base: "100%", md: "auto" }}
          >
            絞り込み
          </Button>
        </GridItem>

        {isInvalidRange && (
          <GridItem colSpan={{ base: 1, md: 3 }}>
            <Text fontSize="sm" color="red.500">
              From は To 以前の日付にしてください。
            </Text>
          </GridItem>
        )}
      </Grid>

      <Box borderWidth="1px" borderRadius="lg" overflowX="auto">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>日付</Th>
              <Th>出勤</Th>
              <Th>退勤</Th>
              <Th textAlign="right">詳細</Th>
            </Tr>
          </Thead>

          <Tbody>
            {listLoading ? (
              <Tr>
                <Td colSpan={4}>
                  <Text color="gray.600" py={4}>
                    読み込み中...
                  </Text>
                </Td>
              </Tr>
            ) : list.length === 0 ? (
              <Tr>
                <Td colSpan={4}>
                  <Text color="gray.600" py={4}>
                    データがありません。
                  </Text>
                </Td>
              </Tr>
            ) : (
              list.map((a) => (
                <AttendanceListRow
                  key={a.id}
                  item={a}
                  formatWorkDate={formatWorkDate}
                  formatTime={formatTime}
                  onOpenDetail={onOpenDetail}
                />
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
