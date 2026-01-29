import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

type Props = {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;

  isDisabled?: boolean;
};

function SwitchField({ label, checked, onChange, isDisabled = false }: Props) {
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel mb="0">{label}</FormLabel>
      <Switch
        isChecked={checked}
        isDisabled={isDisabled}
        onChange={(e) => onChange(e.target.checked)}
      />
    </FormControl>
  );
}

export default SwitchField;
