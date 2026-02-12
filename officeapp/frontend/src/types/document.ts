// src/types/document.ts

export type DocumentType = "note" | "invoice" | "approval";
export type DocumentStatus = "draft" | "submitted";

export type Document = {
  id: number;
  user_id: number;

  type: DocumentType;
  title: string;
  status: DocumentStatus;

  document_data: Record<string, unknown>;
  submitted_at: string | null;

  created_at: string;
  updated_at: string;
};

export type DocumentCreateInput = {
  type: DocumentType;
  title: string;
  document_data: Record<string, unknown>;
};
