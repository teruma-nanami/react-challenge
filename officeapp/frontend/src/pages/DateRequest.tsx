// src/pages/DateRequest.tsx
import { useCallback, useEffect } from "react";
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

  const handleError = useCallback(
    (title: string, error?: unknown) => {
      toast({
        status: "error",
        title,
        description: error ? String(error) : undefined,
      });
    },
    [toast],
  );

  const { items, listLoading, fetchList, createLoading, create } =
    useDateRequest({
      onError: handleError,
    });

  useEffect(() => {
    void fetchList();
  }, [fetchList]);

  const handleReload = () => {
    void fetchList();
  };

  return (
    <Container maxW="container.md" py={6}>
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between" align="center">
          <Heading size="md">休日申請</Heading>

          <Button
            onClick={handleReload}
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
