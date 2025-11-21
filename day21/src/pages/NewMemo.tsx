import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <FormControl>
          <FormLabel>タイトル</FormLabel>
          <Input
            placeholder="タイトルを入力"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>本文</FormLabel>
          <Textarea
            placeholder="本文を入力"
            rows={8}
            value={newMemo}
            onChange={(e) => setNewMemo(e.target.value)}
          />
        </FormControl>

        <ButtonGroup>
          <Button
            colorScheme="teal"
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
