export type ContactStatus = "new" | "in_progress" | "closed";

export type ContactCategory = "bug" | "request" | "other";

export type Contact = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: ContactCategory;
  status: ContactStatus;

  assigned_user_id: number | null;
  internal_note: string | null;

  created_at: string;
  updated_at: string;
};
