import { FormControl, FormLabel, Input } from "@chakra-ui/react";

type Props = {
  label: string;
  value: string | number;
  type?: string;
  isReadOnly?: boolean;
};

export const UserField = ({ label, value, type, isReadOnly }: Props) => {
  return (
    <>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input type={type} defaultValue={value} isReadOnly={isReadOnly} />
      </FormControl>
    </>
  );
};
