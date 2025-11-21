import { Box, Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MemoForm } from "../components/MemoForm";
import type { Memo } from "../types/memo";

export default function NewMemo() {
  const [newMemo, setNewMemo] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const navigate = useNavigate();

  const memoSave = () => {
    const memos = JSON.parse(localStorage.getItem("memos") || "[]");
    const newMemoData: Memo = {
      id: Date.now(),
      title: newTitle,
      content: newMemo,
    };
    memos.push(newMemoData);
    localStorage.setItem("memos", JSON.stringify(memos));
    alert("メモを保存しました！");
    navigate("/");
  };

  const clearForm = () => {
    setNewTitle("");
    setNewMemo("");
  };
  return (
    <Box>
      <Heading size="lg" mb={6}>
        新規メモ作成
      </Heading>

      <VStack align="stretch" spacing={5}>
        <MemoForm
          title={newTitle}
          content={newMemo}
          setTitle={setNewTitle}
          setContent={setNewMemo}
          titleplaceholder="メモのタイトルを入力"
          contentplaceholder="メモの内容を入力"
        />

        <ButtonGroup>
          <Button
            colorScheme="purple"
            onClick={memoSave}
            disabled={!newTitle || !newMemo}
          >
            保存
          </Button>
          <Button variant="outline" onClick={clearForm}>
            クリア
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
}
