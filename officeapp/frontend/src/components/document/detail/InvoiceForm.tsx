// src/components/document/InvoiceForm.tsx

import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

type Props = {
  issueDate: string;
  onChangeIssueDate: (v: string) => void;

  billTo: string;
  onChangeBillTo: (v: string) => void;

  invoiceAmount: string;
  onChangeInvoiceAmount: (v: string) => void;

  note: string;
  onChangeNote: (v: string) => void;
};

export default function InvoiceForm({
  issueDate,
  onChangeIssueDate,
  billTo,
  onChangeBillTo,
  invoiceAmount,
  onChangeInvoiceAmount,
  note,
  onChangeNote,
}: Props) {
  return (
    <>
      <FormControl>
        <FormLabel>発行日</FormLabel>
        <Input
          type="date"
          value={issueDate}
          onChange={(e) => onChangeIssueDate(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>宛名（請求先）</FormLabel>
        <Input
          value={billTo}
          onChange={(e) => onChangeBillTo(e.target.value)}
          placeholder="例：株式会社〇〇"
        />
      </FormControl>

      <FormControl>
        <FormLabel>金額</FormLabel>
        <Input
          value={invoiceAmount}
          onChange={(e) => onChangeInvoiceAmount(e.target.value)}
          placeholder="例：50000"
          inputMode="numeric"
        />
      </FormControl>

      <FormControl>
        <FormLabel>備考（任意）</FormLabel>
        <Textarea
          value={note}
          onChange={(e) => onChangeNote(e.target.value)}
          placeholder="例：お振込期限、補足事項など"
          rows={4}
        />
      </FormControl>
    </>
  );
}
