import { Box, Flex, Heading, HStack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box>
      {/* ヘッダー */}
      <Flex
        as="header"
        p={4}
        bg="orange.500" // ベースカラー（オレンジ系）
        color="white"
        align="center"
        justify="space-between"
      >
        {/* 左側タイトル */}
        <Heading size="md">
          <Link to="/">Todo App</Link>
        </Heading>

        {/* 右側ナビゲーション */}
        <HStack spacing={6}>
          <Link to="/">Today</Link>
          <Link to="/habits">Habits</Link>
          <Link to="/someday">Someday</Link>
        </HStack>
      </Flex>

      {/* ページコンテンツ */}
      <Box p={4} bg="yellow.50" minH="100vh">
        <Outlet />
      </Box>
    </Box>
  );
}
