// src/components/document/DocumentRow.tsx

import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { formatJst, formatYmd } from "../../utils/time";
import type {
  DocumentRow as DocumentRowType,
  DocType,
} from "../../types/document";

type Props = {
  doc: DocumentRowType;
  onOpenDetail: (id: number) => void;
  onPdfClick: () => void;
};

function fmtDateTime(v: string | null | undefined) {
  if (!v) return "—";
  const iso = v.endsWith("Z") ? v : `${v}Z`;
  return formatJst(iso);
}

function fmtDate(v: string | null | undefined) {
  if (!v) return "—";
  const ymd = v.includes("T")
    ? v.slice(0, 10)
    : v.includes(" ")
      ? v.split(" ")[0]
      : v;
  return formatYmd(ymd);
}

function fmtNumber(v: unknown) {
  if (v === null || v === undefined) return "—";
  const n = Number(v);
  if (Number.isNaN(n)) return String(v);
  return n.toLocaleString("ja-JP");
}

function toJaType(type: DocType) {
  if (type === "note") return "メモ";
  if (type === "invoice") return "請求書";
  if (type === "approval") return "稟議書";
  return String(type);
}

export default function DocumentRow({ doc, onOpenDetail, onPdfClick }: Props) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <HStack justify="space-between" align="start">
        <Box>
          <Text fontWeight="700">{doc.title}</Text>
          <Text fontSize="sm" color="gray.600">
            種別: {toJaType(doc.type)} / id: {doc.id}
          </Text>
        </Box>

        <Box textAlign="right">
          <Text fontSize="sm" color="gray.600">
            作成: {fmtDateTime(doc.created_at)}
          </Text>
          <Text fontSize="xs" color="gray.500">
            更新: {fmtDateTime(doc.updated_at)}
          </Text>

          <HStack justify="flex-end" mt={2}>
            <Button size="sm" onClick={() => onOpenDetail(doc.id)}>
              詳細
            </Button>
            <Button size="sm" variant="outline" onClick={onPdfClick}>
              PDF
            </Button>
          </HStack>
        </Box>
      </HStack>

      <Box mt={3}>
        {doc.type === "invoice" && (
          <>
            <Text fontSize="sm" color="gray.700">
              宛名：{doc.document_data.bill_to ?? "—"}
            </Text>
            <Text fontSize="sm" color="gray.700">
              発行日：{fmtDate(doc.document_data.issue_date)}
            </Text>
            <Text fontSize="sm" color="gray.700">
              金額：{fmtNumber(doc.document_data.amount)} 円
            </Text>

            {doc.document_data.note && (
              <Text mt={2} whiteSpace="pre-wrap">
                {String(doc.document_data.note)}
              </Text>
            )}
          </>
        )}

        {doc.type === "approval" && (
          <>
            <Text fontSize="sm" color="gray.700">
              発行日：{fmtDate(doc.document_data.issue_date)}
            </Text>
            <Text fontSize="sm" color="gray.700">
              金額：{fmtNumber(doc.document_data.amount)} 円
            </Text>

            <Text mt={2} whiteSpace="pre-wrap">
              {doc.document_data.purpose
                ? String(doc.document_data.purpose)
                : ""}
            </Text>

            {doc.document_data.note && (
              <Text mt={2} whiteSpace="pre-wrap">
                {String(doc.document_data.note)}
              </Text>
            )}
          </>
        )}

        {doc.type === "note" && (
          <Text whiteSpace="pre-wrap">
            {String(doc.document_data.note ?? "")}
          </Text>
        )}
      </Box>
    </Box>
  );
}
