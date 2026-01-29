// src/components/ui/CautionButton.tsx
import { Button, ButtonProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
} & ButtonProps;

function CautionButton({ children, isLoading = false, ...rest }: Props) {
  return (
    <Button colorScheme="yellow" isLoading={isLoading} {...rest}>
      {children}
    </Button>
  );
}

export default CautionButton;
