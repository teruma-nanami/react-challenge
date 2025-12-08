import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Income() {
  const [income, setIncome] = useState("");
  const [memo, setMemo] = useState("");
  const [savedIncome, setSavedIncome] = useState<number | null>(null);

  const handleSave = () => {
    const value = parseInt(income, 10);
    if (!isNaN(value)) {
      setSavedIncome(value);
      // localStorageに保存（簡易版）
      localStorage.setItem("monthlyIncome", JSON.stringify({ value, memo }));
    }
  };

  return (
    <Box p={6}>
      <Heading mb={6} color="brand.500">
        今月の収入設定
      </Heading>

      <FormControl mb={4}>
        <FormLabel>収入金額</FormLabel>
        <Input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="例: 250000"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>メモ</FormLabel>
        <Input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="例: 給料"
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSave}>
        保存
      </Button>

      {savedIncome !== null && (
        <Text mt={4} fontWeight="bold" color="green.600">
          今月の収入: {savedIncome}円 （{memo}）
        </Text>
      )}
    </Box>
  );
}
