// src/components/ui/PrimaryButton.tsx
import { Button, ButtonProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
} & ButtonProps;

function PrimaryButton({ children, isLoading = false, ...rest }: Props) {
  return (
    <Button colorScheme="blue" isLoading={isLoading} {...rest}>
      {children}
    </Button>
  );
}

export default PrimaryButton;
