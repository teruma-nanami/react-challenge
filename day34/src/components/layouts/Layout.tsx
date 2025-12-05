import {
  Box,
  Link as ChakraLink,
  Flex,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

export default function Layout() {
  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/list", label: "List" },
    { to: "/add", label: "Add" },
    { to: "/category", label: "Category" },
    { to: "/graph", label: "Graph" },
    { to: "/income", label: "Income" },
    { to: "/setting", label: "Setting" },
  ];

  return (
    <Box>
      {/* ナビゲーションバー */}
      <Flex as="nav" bg="brand.500" color="white" px={6} py={4} align="center">
        {/* 左側：タイトル */}
        <Box>
          <Heading size="md">家計簿アプリ</Heading>
        </Box>

        {/* 右側：ナビゲーション／ハンバーガー */}
        <Box ml="auto">
          {/* PC版ナビゲーション */}
          <HStack
            spacing={6}
            display={{ base: "none", md: "flex" }} // 768px以上で表示
          >
            {navLinks.map((link) => (
              <ChakraLink
                key={link.to}
                as={Link}
                to={link.to}
                _hover={{ textDecoration: "none", color: "brand.100" }}
              >
                {link.label}
              </ChakraLink>
            ))}
          </HStack>

          {/* モバイル版ハンバーガー */}
          <Box display={{ base: "block", md: "none" }}>
            <HamburgerMenu />
          </Box>
        </Box>
      </Flex>

      {/* ページコンテンツ */}
      <Box p={6}>
        <Box maxW="1200px" mx="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
