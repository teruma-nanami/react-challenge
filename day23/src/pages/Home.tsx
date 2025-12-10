import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

export const Home = () => {
  const memos = JSON.parse(localStorage.getItem("memos") || "[]");

  useEffect(() => {
    if (memos.length === 0) {
      const initialMemos = [
        {
          id: 1,
          title: "サンプルメモ",
          content: "これは最初から入っているメモです。",
        },
      ];
      localStorage.setItem("memos", JSON.stringify(initialMemos));
    }
  }, []);
  return (
    <Box>
      <Heading size="lg" mb={6}>
        メモ一覧
      </Heading>
      <VStack align="stretch" spacing={4}>
        {/* ここにメモを並べる */}
        {memos.length === 0 ? (
          <Text>メモがありません。新規作成からメモを追加してください。</Text>
        ) : (
          memos.map((memo: { id: number; title: string; content: string }) => (
            <Box
              key={memo.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              _hover={{ bg: "gray.50" }}
            >
              <Heading size="md" mb={2}>
                {memo.title}
              </Heading>
              <Text noOfLines={2}>{memo.content}</Text>
              {/* 更新用リンクを追加 */}
              <Text>
                <Link
                  as={RouterLink}
                  to={`/edit/${memo.id}`}
                  color="blue.500"
                  fontSize="sm"
                  mt={2}
                >
                  編集する
                </Link>
              </Text>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};
