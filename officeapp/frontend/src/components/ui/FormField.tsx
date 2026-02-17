import type { ReactNode } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

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

  isDisabled?: boolean;
  isReadOnly?: boolean;
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
  isDisabled = false,
  isReadOnly = false,
}: Props) {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!error}
      isDisabled={isDisabled}
    >
      <FormLabel>{label}</FormLabel>

      {type === "input" && (
        <Input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          isReadOnly={isReadOnly}
        />
      )}

      {type === "textarea" && (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          isReadOnly={isReadOnly}
        />
      )}

      {type === "select" && (
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          isReadOnly={isReadOnly}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </Select>
      )}

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export default FormField;
