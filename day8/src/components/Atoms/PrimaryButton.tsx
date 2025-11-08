import { Button } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  isLoading?: boolean;
};

export const PrimaryButton = ({ children, onClick, disabled, isLoading }: Props) => {
  return (
    <Button bg={"teal.500"} color={"white"} onClick={onClick} isDisabled={disabled} isLoading={isLoading} _hover={{ bg: "teal.300" }}>
      {children}
    </Button>
  );
}