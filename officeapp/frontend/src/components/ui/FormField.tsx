import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

export type FieldType = "input" | "select" | "textarea";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "tel";

type Props = {
  label: string;
  isRequired?: boolean;
  error?: string | null;

  type?: FieldType; // UIの種類
  inputType?: InputType; // input専用のHTML type

  value: string;
  onChange: (value: string) => void;

  placeholder?: string;
  children?: ReactNode; // select 用 option
};

function FormField({
  label,
  isRequired = false,
  error,
  type = "input",
  inputType = "text",
  value,
  onChange,
  placeholder,
  children,
}: Props) {
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>

      {type === "input" && (
        <Input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}

      {type === "textarea" && (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}

      {type === "select" && (
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
          {children}
        </Select>
      )}

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export default FormField;
