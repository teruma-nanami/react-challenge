import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { apiFetch } from "../lib/api"; // あなたの api.ts の場所に合わせて調整
import type { Contact, ContactCategory } from "../types/contact";

type ApiResponse<T> = {
  data: T;
  message: string;
};

function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState<Contact | null>(null);

  // 編集用state（contactを直接いじらず、フォーム用に別で持つ）
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<ContactCategory>("other");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string>("new");

  // 管理者向け項目
  const [internalNote, setInternalNote] = useState("");
  // const [assignedUserId, setAssignedUserId] = useState<number | "">("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchContact = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<ApiResponse<Contact>>(`/api/contacts/${id}`);
      const c = res.data;

      setContact(c);

      // フォームに初期値を流し込む
      setName(c.name);
      setEmail(c.email);
      setSubject(c.subject);
      setCategory(c.category);
      setMessage(c.message);
      setStatus(c.status);

      setInternalNote(c.internal_note ?? "");

      // setAssignedUserId(c.assigned_user_id ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async () => {
    if (!id) return;

    try {
      setSaving(true);
      setSuccess(null);
      setError(null);

      const res = await apiFetch<ApiResponse<Contact>>(`/api/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          category,
          message,
          status,
          internal_note: internalNote,

          // assigned_user_id: assignedUserId === "" ? null : assignedUserId,
        }),
      });

      setContact(res.data);
      setSuccess("更新しました");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

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

  if (error) {
    return (
      <Box>
        <Heading size="lg" mb={4}>
          お問い合わせ詳細
        </Heading>
        <Text color="red.500">{error}</Text>
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

        <Button variant="outline" onClick={() => navigate("/contacts/list")}>
          一覧に戻る
        </Button>
      </HStack>

      <VStack spacing={4} align="stretch">
        {success && <Text color="green.500">{success}</Text>}
        {error && <Text color="red.500">{error}</Text>}

        <FormControl>
          <FormLabel>お名前</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>メール</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>件名</FormLabel>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>カテゴリ</FormLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as ContactCategory)}
          >
            <option value="bug">不具合</option>
            <option value="request">要望</option>
            <option value="other">その他</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>ステータス</FormLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="new">new</option>
            <option value="in_progress">in_progress</option>
            <option value="closed">closed</option>
          </Select>
        </FormControl>

        {/*
        <FormControl>
          <FormLabel>担当管理者</FormLabel>
          <Select
            value={assignedUserId}
            onChange={(e) =>
              setAssignedUserId(e.target.value === "" ? "" : Number(e.target.value))
            }
          >
            <option value="">未割当</option>
            // ここに users を map して並べる
          </Select>
        </FormControl>
        */}

        <FormControl>
          <FormLabel>管理メモ（内部用）</FormLabel>
          <Textarea
            value={internalNote}
            onChange={(e) => setInternalNote(e.target.value)}
            placeholder="ユーザーには見えません"
            rows={4}
          />
        </FormControl>

        <FormControl>
          <FormLabel>本文</FormLabel>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={updateContact}
          isLoading={saving}
          loadingText="更新中"
        >
          更新
        </Button>
      </VStack>
    </Box>
  );
}

export default ContactDetail;
