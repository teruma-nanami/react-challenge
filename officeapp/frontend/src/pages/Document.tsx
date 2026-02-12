// src/pages/Document.tsx（あなたの配置に合わせてパスは調整してOK）
// ※ ファイル名は「Document.tsx」のまま

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { apiFetch } from "../lib/api";
import { formatJst, formatYmd } from "../utils/time";

type DocType = "note" | "invoice" | "approval";
type DocumentStatus = "draft" | "submitted";

type DocumentRow = {
  id: number;
  user_id: number;

  type: DocType;
  title: string;
  status: DocumentStatus; // ★内部で持つが、画面には表示しない

  document_data: any;
  submitted_at: string | null;

  created_at: string;
  updated_at: string;
};

function fmtDateTime(v: string | null | undefined) {
  if (!v) return "—";
  const iso = v.endsWith("Z") ? v : `${v}Z`;
  return formatJst(iso);
}

function fmtDate(v: string | null | undefined) {
  if (!v) return "—";
  // dateが誤って "YYYY-MM-DDT00:00..." で来ても日付だけに正規化
  const ymd = v.includes("T")
    ? v.slice(0, 10)
    : v.includes(" ")
      ? v.split(" ")[0]
      : v;
  return formatYmd(ymd);
}

function fmtNumber(v: unknown) {
  if (v === null || v === undefined) return "—";
  const n = Number(v);
  if (Number.isNaN(n)) return String(v);
  return n.toLocaleString("ja-JP");
}

function toJaType(type: DocType) {
  switch (type) {
    case "note":
      return "メモ";
    case "invoice":
      return "請求書";
    case "approval":
      return "稟議書";
    default:
      return type;
  }
}

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

  // ===== 詳細モーダル =====
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DocumentRow | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

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
    // ★ type は残す（あなたの元設計）
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
    const data = (await apiFetch("/api/documents", {
      method: "GET",
    })) as DocumentRow[];
    setDocs(Array.isArray(data) ? data : []);
  };

  const fetchDocDetail = async (id: number) => {
    setDetailLoading(true);
    try {
      const doc = (await apiFetch(`/api/documents/${id}`, {
        method: "GET",
      })) as DocumentRow;

      setSelectedDoc(doc ?? null);
    } catch (e) {
      console.error(e);
      toast({
        status: "error",
        title: "書類詳細の取得に失敗しました",
        description: String(e),
      });
      setSelectedDoc(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const openDetail = async (id: number) => {
    setSelectedId(id);
    setSelectedDoc(null);
    setDetailOpen(true);
    await fetchDocDetail(id);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setSelectedId(null);
    setSelectedDoc(null);
  };

  // PDF は「ボタンだけ」用意（後で接続）
  const onPdfClick = () => {
    toast({
      status: "info",
      title: "PDFは準備中です",
      description: "PDF APIの返却形式が固まったら接続します。",
    });
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
                      種別: {toJaType(d.type)} / id: {d.id}
                    </Text>
                  </Box>

                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.600">
                      作成: {fmtDateTime(d.created_at)}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      更新: {fmtDateTime(d.updated_at)}
                    </Text>

                    <HStack justify="flex-end" mt={2}>
                      <Button size="sm" onClick={() => openDetail(d.id)}>
                        詳細
                      </Button>
                      <Button size="sm" variant="outline" onClick={onPdfClick}>
                        PDF
                      </Button>
                    </HStack>
                  </Box>
                </HStack>

                <Box mt={3}>
                  {d.type === "invoice" && (
                    <>
                      <Text fontSize="sm" color="gray.700">
                        宛名：{d.document_data?.bill_to ?? "—"}
                      </Text>
                      <Text fontSize="sm" color="gray.700">
                        発行日：{fmtDate(d.document_data?.issue_date)}
                      </Text>
                      <Text fontSize="sm" color="gray.700">
                        金額：{fmtNumber(d.document_data?.amount)} 円
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
                        発行日：{fmtDate(d.document_data?.issue_date)}
                      </Text>
                      <Text fontSize="sm" color="gray.700">
                        金額：{fmtNumber(d.document_data?.amount)} 円
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
                        ? String(d.document_data.note)
                        : ""}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </VStack>
        )}
      </Box>

      {/* ===== 詳細モーダル（statusは表示しない） ===== */}
      <Modal isOpen={detailOpen} onClose={closeDetail} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>書類の詳細</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {detailLoading && (
              <HStack spacing={2} color="gray.600" mb={3}>
                <Spinner size="sm" />
                <Text fontSize="sm">読み込み中...</Text>
              </HStack>
            )}

            {!selectedId ? (
              <Text>選択された書類がありません。</Text>
            ) : !selectedDoc ? (
              <Text color="gray.600">
                詳細データがありません（取得失敗の可能性）。再度開き直してください。
              </Text>
            ) : (
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontSize="sm" color="gray.600">
                    タイトル
                  </Text>
                  <Text fontWeight="700">{selectedDoc.title}</Text>
                </Box>

                <HStack justify="space-between" align="start">
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      種別 / ID
                    </Text>
                    <Text fontWeight="700">
                      {toJaType(selectedDoc.type)} / #{selectedDoc.id}
                    </Text>
                  </Box>

                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.600">
                      作成
                    </Text>
                    <Text>{fmtDateTime(selectedDoc.created_at)}</Text>
                  </Box>
                </HStack>

                <HStack justify="space-between" align="start">
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      更新
                    </Text>
                    <Text>{fmtDateTime(selectedDoc.updated_at)}</Text>
                  </Box>

                  <Box textAlign="right">
                    <Button size="sm" variant="outline" onClick={onPdfClick}>
                      PDF
                    </Button>
                  </Box>
                </HStack>

                <Divider />

                {selectedDoc.type === "invoice" && (
                  <Box>
                    <Heading size="sm" mb={2}>
                      請求書の内容
                    </Heading>

                    <Text fontSize="sm">
                      宛名：{selectedDoc.document_data?.bill_to ?? "—"}
                    </Text>
                    <Text fontSize="sm">
                      発行日：{fmtDate(selectedDoc.document_data?.issue_date)}
                    </Text>
                    <Text fontSize="sm">
                      金額：{fmtNumber(selectedDoc.document_data?.amount)} 円
                    </Text>

                    {selectedDoc.document_data?.note && (
                      <Box mt={3}>
                        <Text fontSize="sm" color="gray.600" mb={1}>
                          備考
                        </Text>
                        <Text whiteSpace="pre-wrap">
                          {selectedDoc.document_data.note}
                        </Text>
                      </Box>
                    )}
                  </Box>
                )}

                {selectedDoc.type === "approval" && (
                  <Box>
                    <Heading size="sm" mb={2}>
                      稟議書の内容
                    </Heading>

                    <Text fontSize="sm">
                      発行日：{fmtDate(selectedDoc.document_data?.issue_date)}
                    </Text>
                    <Text fontSize="sm">
                      金額：{fmtNumber(selectedDoc.document_data?.amount)} 円
                    </Text>

                    <Box mt={3}>
                      <Text fontSize="sm" color="gray.600" mb={1}>
                        用途（内容）
                      </Text>
                      <Text whiteSpace="pre-wrap">
                        {selectedDoc.document_data?.purpose ?? ""}
                      </Text>
                    </Box>

                    {selectedDoc.document_data?.note && (
                      <Box mt={3}>
                        <Text fontSize="sm" color="gray.600" mb={1}>
                          備考
                        </Text>
                        <Text whiteSpace="pre-wrap">
                          {selectedDoc.document_data.note}
                        </Text>
                      </Box>
                    )}
                  </Box>
                )}

                {selectedDoc.type === "note" && (
                  <Box>
                    <Heading size="sm" mb={2}>
                      メモの内容
                    </Heading>
                    <Text whiteSpace="pre-wrap">
                      {typeof selectedDoc.document_data === "object" &&
                      selectedDoc.document_data?.note
                        ? String(selectedDoc.document_data.note)
                        : ""}
                    </Text>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={closeDetail}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
