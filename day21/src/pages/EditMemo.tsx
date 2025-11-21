import { Box, Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MemoForm } from "../components/MemoForm";
import type { Memo } from "../types/memo";

export default function EditMemo() {
  const { id } = useParams<{ id: string }>();
  const memos: Memo[] = JSON.parse(localStorage.getItem("memos") || "[]");
  const navigate = useNavigate();
  const memo = memos.find((memo: { id: number }) => memo.id === Number(id));

  const [title, setTitle] = useState(memo?.title || "");
  const [content, setContent] = useState(memo?.content || "");

  if (!memo) {
    return (
      <Box>
        <Heading size="md">メモが見つかりません</Heading>
        <Button onClick={() => navigate("/")}>一覧へ戻る</Button>
      </Box>
    );
  }

  const memoUpdate = () => {
    // メモの更新処理をここに実装
    const updatedMemos = memos.map((m: { id: number }) =>
      m.id === Number(id) ? { ...m, title, content } : m
    );
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
    if (window.confirm("本当に更新しますか？")) {
      navigate("/");
    }
  };

  const memoDelete = () => {
    const filteredMemos = memos.filter(
      (m: { id: number }) => m.id !== Number(id)
    );
    localStorage.setItem("memos", JSON.stringify(filteredMemos));
    if (window.confirm("本当に削除しますか？")) {
      navigate("/");
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={6}>
        メモ編集
      </Heading>

      <VStack align="stretch" spacing={5}>
        <MemoForm
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          titleplaceholder="既存タイトルを編集"
          contentplaceholder="既存本文を編集"
        />

        <ButtonGroup>
          <Button colorScheme="purple" onClick={memoUpdate}>
            更新
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              memoDelete();
            }}
            disabled={!title || !content}
          >
            削除
          </Button>
          <Button
            colorScheme="purple"
            variant="outline"
            onClick={() => {
              navigate(-1);
            }}
          >
            キャンセル
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
}
