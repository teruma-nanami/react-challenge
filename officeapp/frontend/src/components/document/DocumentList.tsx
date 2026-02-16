// src/components/document/DocumentList.tsx

import { Text, VStack } from "@chakra-ui/react";
import type { DocumentRow } from "../../types/document";
import DocumentRowItem from "./DocumentRow";

type Props = {
  docs: DocumentRow[];
  onOpenDetail: (id: number) => void;
  onPdfClick: () => void;
};

export default function DocumentList({
  docs,
  onOpenDetail,
  onPdfClick,
}: Props) {
  if (!docs || docs.length === 0) {
    return <Text color="gray.600">まだ書類がありません。</Text>;
  }

  return (
    <VStack align="stretch" spacing={3}>
      {docs.map((d) => (
        <DocumentRowItem
          key={d.id}
          doc={d}
          onOpenDetail={onOpenDetail}
          onPdfClick={onPdfClick}
        />
      ))}
    </VStack>
  );
}
