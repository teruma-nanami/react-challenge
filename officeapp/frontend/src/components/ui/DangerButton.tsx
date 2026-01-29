// src/components/ui/DangerButton.tsx
import { Button, ButtonProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
} & ButtonProps;

function DangerButton({ children, isLoading = false, ...rest }: Props) {
  return (
    <Button colorScheme="red" isLoading={isLoading} {...rest}>
      {children}
    </Button>
  );
}

export default DangerButton;
