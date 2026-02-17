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

  onSubmit: () => Promise<void>;
};

function labelCategory(v: ContactCategory): string {
  if (v === "bug") return "不具合";
  if (v === "request") return "要望";
  return "その他";
}

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

  return (
    <Box maxW="700px">
      <HStack justify="space-between" mb={4}>
        <Heading size="lg">
          お問い合わせ詳細{contact ? `（ID: ${contact.id}）` : ""}
        </Heading>

        <PrimaryButton
          variant="outline"
          onClick={() => navigate("/contacts/internal")}
          isDisabled={saving}
        >
          一覧に戻る
        </PrimaryButton>
      </HStack>

      <VStack spacing={4} align="stretch">
        {success && <Text color="green.500">{success}</Text>}
        {error && <Text color="red.500">{error}</Text>}

        {loading && (
          <HStack>
            <Spinner />
            <Text>読み込み中...</Text>
          </HStack>
        )}

        {!loading && !contact && (
          <Text color="gray.600">データが見つかりません。</Text>
        )}

        {!loading && contact && (
          <>
            {/* 変更不可（表示のみ） */}
            <Box>
              <Text fontSize="sm" color="gray.600">
                お名前
              </Text>
              <Text>{name}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.600">
                メール
              </Text>
              <Text>{email}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.600">
                件名
              </Text>
              <Text>{subject}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.600">
                カテゴリ
              </Text>
              <Text>{labelCategory(category)}</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.600">
                本文
              </Text>
              <Text whiteSpace="pre-wrap">{message}</Text>
            </Box>

            {/* 変更可 */}
            <FormField
              label="ステータス"
              type="select"
              value={status}
              onChange={(v) => onChangeStatus(v as ContactStatus)}
              isDisabled={saving}
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
              isDisabled={saving}
            />

            <PrimaryButton
              onClick={() => void onSubmit()}
              isLoading={saving}
              loadingText="更新中"
              isDisabled={loading || !contact}
            >
              更新
            </PrimaryButton>
          </>
        )}
      </VStack>
    </Box>
  );
}

export default ContactDetailView;
