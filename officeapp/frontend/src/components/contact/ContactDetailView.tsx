import { Box, Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import type {
  Contact,
  ContactCategory,
  ContactStatus,
} from "../../types/contact";

import PrimaryButton from "../ui/PrimaryButton";
import FormField from "../ui/FormField";

type Props = {
  contact: Contact | null;

  // form values
  name: string;
  email: string;
  subject: string;
  category: ContactCategory;
  message: string;
  status: ContactStatus;
  internalNote: string;

  // handlers
  onChangeStatus: (v: ContactStatus) => void;
  onChangeInternalNote: (v: string) => void;

  loading: boolean;
  saving: boolean;
  error: string | null;
  success: string | null;

  onSubmit: () => void;
};

function ContactDetailView({
  contact,
  name,
  email,
  subject,
  category,
  message,
  status,
  internalNote,
  onChangeStatus,
  onChangeInternalNote,
  loading,
  saving,
  error,
  success,
  onSubmit,
}: Props) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box>
        <Heading size="lg" mb={4}>
          お問い合わせ詳細
        </Heading>
        <Spinner />
      </Box>
    );
  }

  if (!contact) {
    return (
      <Box>
        <Heading size="lg" mb={4}>
          お問い合わせ詳細
        </Heading>
        <Text>データが見つかりません</Text>
      </Box>
    );
  }

  return (
    <Box maxW="700px">
      <HStack justify="space-between" mb={4}>
        <Heading size="lg">お問い合わせ詳細（ID: {contact.id}）</Heading>

        <PrimaryButton
          variant="outline"
          onClick={() => navigate("/contacts/internal")}
        >
          一覧に戻る
        </PrimaryButton>
      </HStack>

      <VStack spacing={4} align="stretch">
        {success && <Text color="green.500">{success}</Text>}
        {error && <Text color="red.500">{error}</Text>}

        <FormField label="お名前" value={name} onChange={() => {}} />

        <FormField label="メール" value={email} onChange={() => {}} />

        <FormField label="件名" value={subject} onChange={() => {}} />

        <FormField
          label="カテゴリ"
          type="select"
          value={category}
          onChange={() => {}}
        >
          <option value="bug">不具合</option>
          <option value="request">要望</option>
          <option value="other">その他</option>
        </FormField>

        <FormField
          label="ステータス"
          type="select"
          value={status}
          onChange={(v) => onChangeStatus(v as ContactStatus)}
        >
          <option value="new">new</option>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </FormField>

        <FormField
          label="管理メモ（内部用）"
          type="textarea"
          value={internalNote}
          onChange={onChangeInternalNote}
        />

        <FormField
          label="本文"
          type="textarea"
          value={message}
          onChange={() => {}}
        />

        <PrimaryButton
          onClick={onSubmit}
          isLoading={saving}
          loadingText="更新中"
        >
          更新
        </PrimaryButton>
      </VStack>
    </Box>
  );
}

export default ContactDetailView;
