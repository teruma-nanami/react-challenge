// src/hooks/useDocument.ts

import { useCallback, useState } from "react";
import { apiFetch } from "../lib/api";
import type { DocumentCreateInput, DocumentRow } from "../types/document";

type UseDocumentOptions = {
  onError?: (title: string, error?: unknown) => void;
};

export function useDocument(options?: UseDocumentOptions) {
  const onError = options?.onError;

  const [docs, setDocs] = useState<DocumentRow[]>([]);
  const [listLoading, setListLoading] = useState(false);

  const [createLoading, setCreateLoading] = useState(false);

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DocumentRow | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchDocs = useCallback(async () => {
    setListLoading(true);
    try {
      const data = (await apiFetch("/api/documents", {
        method: "GET",
      })) as DocumentRow[];

      setDocs(Array.isArray(data) ? data : []);
    } catch (e) {
      onError?.("書類一覧の取得に失敗しました", e);
      throw e;
    } finally {
      setListLoading(false);
    }
  }, [onError]);

  const createDraft = useCallback(
    async (payload: DocumentCreateInput) => {
      setCreateLoading(true);
      try {
        const created = (await apiFetch("/api/documents", {
          method: "POST",
          body: payload as any,
        })) as DocumentRow;

        await fetchDocs();
        return created;
      } catch (e) {
        onError?.("作成に失敗しました", e);
        throw e;
      } finally {
        setCreateLoading(false);
      }
    },
    [fetchDocs, onError],
  );

  const fetchDocDetail = useCallback(
    async (id: number) => {
      setDetailLoading(true);
      try {
        const doc = (await apiFetch(`/api/documents/${id}`, {
          method: "GET",
        })) as DocumentRow;

        setSelectedDoc(doc ?? null);
      } catch (e) {
        onError?.("書類詳細の取得に失敗しました", e);
        setSelectedDoc(null);
        throw e;
      } finally {
        setDetailLoading(false);
      }
    },
    [onError],
  );

  const openDetail = useCallback(
    async (id: number) => {
      setSelectedId(id);
      setSelectedDoc(null);
      setDetailOpen(true);
      await fetchDocDetail(id);
    },
    [fetchDocDetail],
  );

  const closeDetail = useCallback(() => {
    setDetailOpen(false);
    setSelectedId(null);
    setSelectedDoc(null);
  }, []);

  return {
    docs,
    listLoading,
    fetchDocs,

    createDraft,
    createLoading,

    detailOpen,
    selectedId,
    selectedDoc,
    detailLoading,
    openDetail,
    closeDetail,
  };
}
