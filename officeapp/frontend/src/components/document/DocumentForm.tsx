// src/components/document/DocumentForm.tsx

import { useMemo, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import type { DocType, DocumentCreateInput } from "../../types/document";
import ApprovalForm from "./detail/ApprovalForm";
import InvoiceForm from "./detail/InvoiceForm";
import NoteForm from "./detail/NoteForm";

type Props = {
  createLoading: boolean;
  onCreate: (payload: DocumentCreateInput) => Promise<unknown>;
};

export default function DocumentForm({ createLoading, onCreate }: Props) {
  const toast = useToast();

  const [type, setType] = useState<DocType>("note");
  const [title, setTitle] = useState("");

  // invoice / approval 共通（この2つだけ必須）
  const [issueDate, setIssueDate] = useState(""); // YYYY-MM-DD

  // 共通 note（note: 必須なのは note type のみ。invoice/approval は任意）
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

    if ((type === "invoice" || type === "approval") && !issueDate) {
      return "発行日を入力してください";
    }

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

  const buildPayload = (): DocumentCreateInput => {
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

  const onSubmit = async () => {
    const err = validate();
    if (err) {
      toast({ status: "warning", title: err });
      return;
    }

    try {
      const payload = buildPayload();
      await onCreate(payload);
      toast({ status: "success", title: "下書きを作成しました" });
      resetForm();
    } catch {
      // エラー表示は親（useDocument の onError）側で toast を出す想定なので握る
    }
  };

  return (
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

      {type === "invoice" && (
        <InvoiceForm
          issueDate={issueDate}
          onChangeIssueDate={setIssueDate}
          billTo={billTo}
          onChangeBillTo={setBillTo}
          invoiceAmount={invoiceAmount}
          onChangeInvoiceAmount={setInvoiceAmount}
          note={note}
          onChangeNote={setNote}
        />
      )}

      {type === "approval" && (
        <ApprovalForm
          issueDate={issueDate}
          onChangeIssueDate={setIssueDate}
          purpose={purpose}
          onChangePurpose={setPurpose}
          approvalAmount={approvalAmount}
          onChangeApprovalAmount={setApprovalAmount}
          note={note}
          onChangeNote={setNote}
        />
      )}

      {type === "note" && <NoteForm note={note} onChangeNote={setNote} />}

      <HStack justify="flex-end">
        <Button isLoading={createLoading} colorScheme="blue" onClick={onSubmit}>
          {submitLabel}
        </Button>
      </HStack>
    </VStack>
  );
}
