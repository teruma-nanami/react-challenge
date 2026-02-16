// src/pages/Document.tsx
// ※ ファイル名は「Document.tsx」のまま

import { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useDocument } from "../hooks/useDocument";
import DocumentList from "../components/document/DocumentList";
import DocumentForm from "../components/document/DocumentForm";

export default function Document() {
  const toast = useToast();

  const {
    docs,
    listLoading,
    fetchDocs,
    createDraft,
    createLoading,
    openDetail,
  } = useDocument({
    onError: (title, error) => {
      toast({
        status: "error",
        title,
        description: error ? String(error) : undefined,
      });
    },
  });

  // PDF は「ボタンだけ」用意（後で接続）
  const onPdfClick = () => {
    toast({
      status: "info",
      title: "PDFは準備中です",
      description: "PDF APIの返却形式が固まったら接続します。",
    });
  };

  useEffect(() => {
    fetchDocs().catch(() => {
      // toast は useDocument の onError 側で出る
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack align="stretch" spacing={6}>
      <Heading size="md">書類</Heading>

      {/* ===== 下書き作成フォーム（DocumentForm） ===== */}
      <Box>
        <Heading size="sm" mb={3}>
          下書き作成
        </Heading>

        <DocumentForm createLoading={createLoading} onCreate={createDraft} />
      </Box>

      <Divider />

      {/* ===== 一覧（DocumentList） ===== */}
      <Box>
        <HStack justify="space-between" mb={3}>
          <Heading size="sm">自分の書類一覧</Heading>

          <HStack spacing={2}>
            {listLoading && (
              <HStack spacing={2} color="gray.600">
                <Spinner size="sm" />
                <Text fontSize="sm">読み込み中...</Text>
              </HStack>
            )}

            <Button size="sm" variant="outline" onClick={() => fetchDocs()}>
              更新
            </Button>
          </HStack>
        </HStack>

        <DocumentList
          docs={docs}
          onOpenDetail={openDetail}
          onPdfClick={onPdfClick}
        />
      </Box>
    </VStack>
  );
}
