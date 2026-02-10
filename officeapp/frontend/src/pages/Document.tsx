import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { apiFetch } from "../lib/api";

type DocumentRow = {
  id: number;
  user_id: number;
  type: string;
  title: string;
  document_data: any;
  status?: string | null;
  created_at: string;
  updated_at: string;
};

type DocType = "note" | "invoice" | "approval";

export default function Document() {
  const toast = useToast();

  const [docs, setDocs] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(false);

  // ===== フォーム（ユーザーにJSONは見せない） =====
  const [type, setType] = useState<DocType>("note");
  const [title, setTitle] = useState("");

  // 共通
  const [issueDate, setIssueDate] = useState(""); // YYYY-MM-DD
  const [note, setNote] = useState("");

  // invoice
  const [billTo, setBillTo] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState<string>("");

  // approval
  const [purpose, setPurpose] = useState("");
  const [approvalAmount, setApprovalAmount] = useState<string>("");

  const resetForm = () => {
    setTitle("");
    setIssueDate("");
    setNote("");

    setBillTo("");
    setInvoiceAmount("");

    setPurpose("");
    setApprovalAmount("");
  };

  const submitLabel = useMemo(() => {
    if (type === "invoice") return "請求書（下書き）を作成";
    if (type === "approval") return "稟議書（下書き）を作成";
    return "メモ（下書き）を作成";
  }, [type]);

  const validate = (): string | null => {
    if (!title.trim()) return "タイトルを入力してください";

    if (type !== "note" && !issueDate) return "発行日を入力してください";

    if (type === "invoice") {
      if (!billTo.trim()) return "宛名（請求先）を入力してください";
      if (!invoiceAmount.trim()) return "金額を入力してください";
      if (Number.isNaN(Number(invoiceAmount)))
        return "金額は数値で入力してください";
    }

    if (type === "approval") {
      if (!purpose.trim()) return "用途（内容）を入力してください";
      if (!approvalAmount.trim()) return "金額を入力してください";
      if (Number.isNaN(Number(approvalAmount)))
        return "金額は数値で入力してください";
    }

    if (type === "note" && !note.trim())
      return "内容（メモ）を入力してください";

    return null;
  };

  const buildPayload = () => {
    // ★フォーム入力をdocument_data（JSON）にまとめる（ユーザーはJSONを見ない）
    if (type === "invoice") {
      return {
        type,
        title,
        document_data: {
          issue_date: issueDate,
          bill_to: billTo,
          amount: Number(invoiceAmount),
          note: note || null,
        },
      };
    }

    if (type === "approval") {
      return {
        type,
        title,
        document_data: {
          issue_date: issueDate,
          purpose,
          amount: Number(approvalAmount),
          note: note || null,
        },
      };
    }

    return {
      type,
      title,
      document_data: {
        note,
      },
    };
  };

  const fetchDocs = async () => {
    // ★あなたの apiFetch は Response ではなく JSON を返す前提で使う
    const data = (await apiFetch("/api/documents", {
      method: "GET",
    })) as DocumentRow[];
    setDocs(data);
  };

  useEffect(() => {
    fetchDocs().catch((e) => {
      console.error(e);
      toast({ status: "error", title: "書類一覧の取得に失敗しました" });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async () => {
    const err = validate();
    if (err) {
      toast({ status: "warning", title: err });
      return;
    }

    try {
      setLoading(true);

      const payload = buildPayload();

      // ★bodyは stringify しない。apiFetch側に任せる（ヘッダ付与も含めて）
      await apiFetch("/api/documents", {
        method: "POST",
        body: payload as any,
      });

      toast({ status: "success", title: "下書きを作成しました" });
      resetForm();
      await fetchDocs();
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "作成に失敗しました",
        description: String(e),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack align="stretch" spacing={6}>
      <Heading size="md">書類</Heading>

      <Box>
        <Heading size="sm" mb={3}>
          下書き作成
        </Heading>

        <VStack align="stretch" spacing={4}>
          <FormControl>
            <FormLabel>種別</FormLabel>
            <Select
              value={type}
              onChange={(e) => {
                setType(e.target.value as DocType);
                resetForm();
              }}
            >
              <option value="note">メモ</option>
              <option value="invoice">請求書</option>
              <option value="approval">稟議書</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>タイトル</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：1月分 請求書 / 備品購入 稟議 / メモ など"
            />
          </FormControl>

          {(type === "invoice" || type === "approval") && (
            <FormControl>
              <FormLabel>発行日</FormLabel>
              <Input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </FormControl>
          )}

          {type === "invoice" && (
            <>
              <FormControl>
                <FormLabel>宛名（請求先）</FormLabel>
                <Input
                  value={billTo}
                  onChange={(e) => setBillTo(e.target.value)}
                  placeholder="例：株式会社〇〇"
                />
              </FormControl>

              <FormControl>
                <FormLabel>金額</FormLabel>
                <Input
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  placeholder="例：50000"
                  inputMode="numeric"
                />
              </FormControl>

              <FormControl>
                <FormLabel>備考（任意）</FormLabel>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="例：お振込期限、補足事項など"
                  rows={4}
                />
              </FormControl>
            </>
          )}

          {type === "approval" && (
            <>
              <FormControl>
                <FormLabel>用途（内容）</FormLabel>
                <Textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="例：開発用モニター購入のため"
                  rows={3}
                />
              </FormControl>

              <FormControl>
                <FormLabel>金額</FormLabel>
                <Input
                  value={approvalAmount}
                  onChange={(e) => setApprovalAmount(e.target.value)}
                  placeholder="例：30000"
                  inputMode="numeric"
                />
              </FormControl>

              <FormControl>
                <FormLabel>備考（任意）</FormLabel>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="例：購入理由の補足、期限など"
                  rows={4}
                />
              </FormControl>
            </>
          )}

          {type === "note" && (
            <FormControl>
              <FormLabel>内容（メモ）</FormLabel>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="普通に文章を書けばOK（JSONは入力しない）"
                rows={6}
              />
            </FormControl>
          )}

          <HStack justify="flex-end">
            <Button isLoading={loading} colorScheme="blue" onClick={onSubmit}>
              {submitLabel}
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Divider />

      <Box>
        <Heading size="sm" mb={3}>
          自分の書類一覧
        </Heading>

        {docs.length === 0 ? (
          <Text color="gray.600">まだ書類がありません。</Text>
        ) : (
          <VStack align="stretch" spacing={3}>
            {docs.map((d) => (
              <Box key={d.id} borderWidth="1px" borderRadius="lg" p={4}>
                <HStack justify="space-between" align="start">
                  <Box>
                    <Text fontWeight="700">{d.title}</Text>
                    <Text fontSize="sm" color="gray.600">
                      type: {d.type} / id: {d.id}
                    </Text>
                  </Box>
                  <Text fontSize="sm" color="gray.600">
                    {d.created_at}
                  </Text>
                </HStack>

                <Box mt={3}>
                  {d.type === "invoice" && (
                    <>
                      <Text fontSize="sm" color="gray.700">
                        宛名：{d.document_data?.bill_to ?? "-"}
                      </Text>
                      <Text fontSize="sm" color="gray.700">
                        発行日：{d.document_data?.issue_date ?? "-"}
                      </Text>
                      <Text fontSize="sm" color="gray.700">
                        金額：{d.document_data?.amount ?? "-"}
                      </Text>
                      {d.document_data?.note && (
                        <Text mt={2} whiteSpace="pre-wrap">
                          {d.document_data.note}
                        </Text>
                      )}
                    </>
                  )}

                  {d.type === "approval" && (
                    <>
                      <Text fontSize="sm" color="gray.700">
                        発行日：{d.document_data?.issue_date ?? "-"}
                      </Text>
                      <Text fontSize="sm" color="gray.700">
                        金額：{d.document_data?.amount ?? "-"}
                      </Text>
                      <Text mt={2} whiteSpace="pre-wrap">
                        {d.document_data?.purpose ?? ""}
                      </Text>
                      {d.document_data?.note && (
                        <Text mt={2} whiteSpace="pre-wrap">
                          {d.document_data.note}
                        </Text>
                      )}
                    </>
                  )}

                  {d.type === "note" && (
                    <Text whiteSpace="pre-wrap">
                      {typeof d.document_data === "object" &&
                      d.document_data?.note
                        ? d.document_data.note
                        : ""}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  );
}
