import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { Outlet, Link as RouterLink } from "react-router-dom";

export default function Layout() {
  return (
    <Flex direction="column" minH="100vh">
      {/* ヘッダー */}
      <Box bg="purple.600" color="white" p={4}>
        <Flex gap={4} mt={2}>
          <Heading size="md">
            <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
              メモアプリ
            </Link>
          </Heading>
          <Link as={RouterLink} to="/">
            Home
          </Link>
          <Link as={RouterLink} to="/new">
            New
          </Link>
          <Link as={RouterLink} to="/about">
            About
          </Link>
        </Flex>
      </Box>

      {/* ページごとのコンテンツ */}
      <Box flex="1" p={6}>
        <Outlet />
      </Box>

      {/* フッター */}
      <Box bg="purple.100" p={4} textAlign="center">
        © 2025 MemoApp
      </Box>
    </Flex>
  );
}
