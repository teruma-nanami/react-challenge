import { Box, Button, Text, VStack } from "@chakra-ui/react";
import type { ContactCategory } from "../../types/contact";
import FormField from "../ui/FormField";

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  category: ContactCategory;
  message: string;
};

type Props = {
  values: ContactFormValues;

  submitting: boolean;
  success: string | null;
  error: string | null;

  onChange: <K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) => void;

  onSubmit: () => void;
};

function ContactForm({
  values,
  submitting,
  success,
  error,
  onChange,
  onSubmit,
}: Props) {
  return (
    <Box maxW="600px" mx="auto">
      <VStack spacing={4} align="stretch">
        {success && <Text color="green.500">{success}</Text>}
        {error && <Text color="red.500">{error}</Text>}

        <FormField
          label="お名前"
          isRequired
          value={values.name}
          onChange={(v) => onChange("name", v)}
          placeholder="例：山田 太郎"
        />

        <FormField
          label="メールアドレス"
          isRequired
          type="input"
          inputType="email"
          value={values.email}
          onChange={(v) => onChange("email", v)}
          placeholder="example@example.com"
        />

        <FormField
          label="件名"
          isRequired
          value={values.subject}
          onChange={(v) => onChange("subject", v)}
          placeholder="お問い合わせ内容の要約"
        />

        <FormField
          label="カテゴリ"
          isRequired
          type="select"
          value={values.category}
          onChange={(v) => onChange("category", v as ContactCategory)}
        >
          <option value="bug">不具合</option>
          <option value="request">要望</option>
          <option value="other">その他</option>
        </FormField>

        <FormField
          label="本文"
          isRequired
          type="textarea"
          value={values.message}
          onChange={(v) => onChange("message", v)}
          placeholder="お問い合わせ内容を入力してください"
        />

        <Button
          colorScheme="blue"
          onClick={onSubmit}
          isLoading={submitting}
          loadingText="送信中"
        >
          送信
        </Button>
      </VStack>
    </Box>
  );
}

export default ContactForm;
