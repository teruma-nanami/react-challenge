// src/types/document.ts

export type DocumentStatus = "draft" | "submitted";

export type Document = {
  id: number;
  user_id: number;

  type: string;
  title: string;
  status: DocumentStatus;

  document_data: Record<string, unknown>;
  submitted_at: string | null;

  created_at: string;
  updated_at: string;
};

export type DocumentCreateInput = {
  type: string;
  title: string;
  document_data: Record<string, unknown>;
};
