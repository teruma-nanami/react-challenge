import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { ContactCategory } from "../types/contact";
import { apiFetch } from "../lib/api";

function Contacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<ContactCategory>("other");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async () => {
    // 超最低限のバリデーション
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError("未入力の項目があります");
      return;
    }

    try {
      setSubmitting(true);
      setSuccess(null);
      setError(null);

      // const res = await fetch(`${API_BASE_URL}/api/contacts`, {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name,
      //     email,
      //     subject,
      //     category,
      //     message,
      //   }),
      // });

      // if (!res.ok) {
      //   const text = await res.text();
      //   throw new Error(`送信に失敗しました: ${res.status} ${text}`);
      // }

      await apiFetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          category,
          message,
        }),
      });

      // 成功したらフォームクリア
      setName("");
      setEmail("");
      setSubject("");
      setCategory("other");
      setMessage("");

      setSuccess("送信しました。ありがとうございました。");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="600px" mx="auto">
      <Heading mb={6}>お問い合わせ</Heading>

      <VStack spacing={4} align="stretch">
        {success && <Text color="green.500">{success}</Text>}
        {error && <Text color="red.500">{error}</Text>}

        <FormControl isRequired>
          <FormLabel>お名前</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例：山田 太郎"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>件名</FormLabel>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="お問い合わせ内容の要約"
          />
        </FormControl>

        <FormControl isRequired>
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

        <FormControl isRequired>
          <FormLabel>本文</FormLabel>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="お問い合わせ内容を入力してください"
            rows={6}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={submitContact}
          isLoading={submitting}
          loadingText="送信中"
        >
          送信
        </Button>
      </VStack>
    </Box>
  );
}

export default Contacts;
