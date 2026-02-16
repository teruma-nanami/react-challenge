// src/pages/DateRequest.tsx

import { useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useDateRequest } from "../hooks/useDateRequest";
import DateRequestForm from "../components/daterequest/DateRequestForm";
import MyDateRequestList from "../components/daterequest/MyDateRequestList";

export default function DateRequest() {
  const toast = useToast();

  const { items, listLoading, fetchList, createLoading, create } =
    useDateRequest({
      onError: (title, error) => {
        toast({
          status: "error",
          title,
          description: error ? String(error) : undefined,
        });
      },
    });

  useEffect(() => {
    fetchList().catch(() => {
      // toast は hook 側の onError で出る
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxW="container.md" py={6}>
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between" align="center">
          <Heading size="md">休日申請</Heading>

          <Button
            onClick={() => fetchList()}
            isLoading={listLoading}
            variant="outline"
            size="sm"
          >
            再読込
          </Button>
        </HStack>

        <DateRequestForm createLoading={createLoading} onCreate={create} />

        <Divider />

        <MyDateRequestList items={items} loading={listLoading} />
      </VStack>
    </Container>
  );
}
