// src/layouts/Layout.tsx
import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/react";
import { Outlet, Link as RouterLink } from "react-router-dom";

const Layout = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* ヘッダー */}
      <Flex as="header" bg="purple.500" color="white" p={4} align="center">
        <Heading size="md">ナナミノ工房</Heading>
        <Spacer />
        <Flex gap={4}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link as={RouterLink} to="/about" _hover={{ textDecoration: "none" }}>
            About
          </Link>
          <Link
            as={RouterLink}
            to="/contact"
            _hover={{ textDecoration: "none" }}
          >
            Contact
          </Link>
        </Flex>
      </Flex>

      {/* メインコンテンツ */}
      <Box as="main" flex="1" p={6}>
        <Outlet />
      </Box>

      {/* フッター */}
      <Box as="footer" bg="gray.100" textAlign="center" p={4}>
        © 2025 ナナミノ工房
      </Box>
    </Box>
  );
};

export default Layout;
