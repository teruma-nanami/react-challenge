import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error";
};

export const useMessage = () => {
  const toast = useToast();
  const showMessage = useCallback(({ title, status }: Props) => {
    toast({
      title,
      status,
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);
  return { showMessage };
}