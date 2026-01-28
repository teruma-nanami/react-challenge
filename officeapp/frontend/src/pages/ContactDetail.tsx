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
import { apiFetch } from "../lib/api";
import type { Contact, ContactCategory, ContactStatus } from "../types/contact";

type ApiResponse<T> = {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
};

function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState<Contact | null>(null);

  // フォーム用 state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<ContactCategory>("other");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<ContactStatus>("new");
  const [internalNote, setInternalNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ApiResponse<T> でも T でも受けられるようにする
  const unwrapContact = (res: unknown): Contact | null => {
    if (!res || typeof res !== "object") return null;

    const obj = res as ApiResponse<Contact> & Partial<Contact>;
    const candidate = (obj.data ?? obj) as unknown;

    if (!candidate || typeof candidate !== "object") return null;

    // 最低限「Contactっぽい」判定（ここは増やしてもOK）
    const c = candidate as Contact;
    if (typeof c.id !== "number") return null;
    if (typeof c.status !== "string") return null;

    return c;
  };

  const fetchContact = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<unknown>(`/api/contacts/${id}`);
      const c = unwrapContact(res);

      if (!c) {
        // dataが無い系のレスポンス（messageのみ）を表示
        const msg =
          (res as any)?.message ??
          "API response does not contain contact data.";
        throw new Error(msg);
      }

      setContact(c);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  useEffect(() => {
    if (!contact) return;

    setName(contact.name);
    setEmail(contact.email);
    setSubject(contact.subject);
    setCategory(contact.category as ContactCategory);
    setMessage(contact.message);
    setStatus(contact.status as ContactStatus);
    setInternalNote(contact.internal_note ?? "");
  }, [contact]);

  const updateContact = async () => {
    if (!id) return;

    try {
      setSaving(true);
      setSuccess(null);
      setError(null);

      const res = await apiFetch<unknown>(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          category,
          message,
          status,
          internal_note: internalNote,
        }),
      });

      const c = unwrapContact(res);
      if (!c) {
        const msg =
          (res as any)?.message ??
          "API response does not contain updated contact data.";
        throw new Error(msg);
      }

      setContact(c);
      setSuccess("更新しました");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

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

        <Button
          variant="outline"
          onClick={() => navigate("/contacts/internal")}
        >
          一覧に戻る
        </Button>
      </HStack>

      <VStack spacing={4} align="stretch">
        {success && <Text color="green.500">{success}</Text>}
        {error && <Text color="red.500">{error}</Text>}

        <FormControl>
          <FormLabel>お名前</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly
          />
        </FormControl>

        <FormControl>
          <FormLabel>メール</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
        </FormControl>

        <FormControl>
          <FormLabel>件名</FormLabel>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            readOnly
          />
        </FormControl>

        <FormControl>
          <FormLabel>カテゴリ</FormLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as ContactCategory)}
            isDisabled
          >
            <option value="bug">不具合</option>
            <option value="request">要望</option>
            <option value="other">その他</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>ステータス</FormLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as ContactStatus)}
          >
            <option value="new">new</option>
            <option value="in_progress">in_progress</option>
            <option value="closed">closed</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>管理メモ（内部用）</FormLabel>
          <Textarea
            value={internalNote}
            onChange={(e) => setInternalNote(e.target.value)}
            rows={4}
          />
        </FormControl>

        <FormControl>
          <FormLabel>本文</FormLabel>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            readOnly
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
