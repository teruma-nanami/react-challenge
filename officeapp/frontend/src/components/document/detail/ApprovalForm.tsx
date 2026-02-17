// src/components/document/form/ApprovalForm.tsx

import type { Dispatch, SetStateAction } from "react";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

type Props = {
  issueDate: string;
  onChangeIssueDate: Dispatch<SetStateAction<string>>;

  purpose: string;
  onChangePurpose: Dispatch<SetStateAction<string>>;

  approvalAmount: string;
  onChangeApprovalAmount: Dispatch<SetStateAction<string>>;

  note: string;
  onChangeNote: Dispatch<SetStateAction<string>>;
};

export default function ApprovalForm({
  issueDate,
  onChangeIssueDate,
  purpose,
  onChangePurpose,
  approvalAmount,
  onChangeApprovalAmount,
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
        <FormLabel>用途（内容）</FormLabel>
        <Textarea
          value={purpose}
          onChange={(e) => onChangePurpose(e.target.value)}
          placeholder="例：開発用モニター購入のため"
          rows={3}
        />
      </FormControl>

      <FormControl>
        <FormLabel>金額</FormLabel>
        <Input
          value={approvalAmount}
          onChange={(e) => onChangeApprovalAmount(e.target.value)}
          placeholder="例：30000"
          inputMode="numeric"
        />
      </FormControl>

      <FormControl>
        <FormLabel>備考（任意）</FormLabel>
        <Textarea
          value={note}
          onChange={(e) => onChangeNote(e.target.value)}
          placeholder="例：購入理由の補足、期限など"
          rows={4}
        />
      </FormControl>
    </>
  );
}
