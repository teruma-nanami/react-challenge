// src/types/document.ts

export type DocType = "note" | "invoice" | "approval";
export type DocumentStatus = "draft" | "submitted";

export type DocumentDataNote = {
  note: string;
};

export type DocumentDataInvoice = {
  issue_date: string; // YYYY-MM-DD
  bill_to: string;
  amount: number;
  note?: string | null;
};

export type DocumentDataApproval = {
  issue_date: string; // YYYY-MM-DD
  purpose: string;
  amount: number;
  note?: string | null;
};

// type -> document_data を紐づけるためのマップ
export type DocumentDataByType = {
  note: DocumentDataNote;
  invoice: DocumentDataInvoice;
  approval: DocumentDataApproval;
};

type BaseDocumentRow<TType extends DocType> = {
  id: number;
  user_id: number;
  type: TType;
  title: string;
  status: DocumentStatus;
  document_data: DocumentDataByType[TType];
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type DocumentRow =
  | BaseDocumentRow<"note">
  | BaseDocumentRow<"invoice">
  | BaseDocumentRow<"approval">;

// 「詳細」も同じ形なら alias しておく（Modal / Detail で便利）
export type Document = DocumentRow;

type BaseCreateInput<TType extends DocType> = {
  type: TType;
  title: string;
  document_data: DocumentDataByType[TType];
};

export type DocumentCreateInput =
  | BaseCreateInput<"note">
  | BaseCreateInput<"invoice">
  | BaseCreateInput<"approval">;
