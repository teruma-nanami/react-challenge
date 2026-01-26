import type { ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  Container,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Flex
        as="header"
        position="sticky"
        top={0}
        zIndex={10}
        px={6}
        py={4}
        align="center"
        bgGradient="linear(to-r, blue.600, purple.600)"
        color="white"
        boxShadow="sm"
      >
        <HStack spacing={3}>
          <Box w="12px" h="12px" borderRadius="full" bg="white" />
          <Heading size="md" fontSize="22px">
            Office App
          </Heading>
        </HStack>

        <Spacer />

        {/* 後でAuth0に差し替え */}
        <HStack spacing={3}>
          <Button size="sm" variant="outline" color="white" borderColor="white">
            Login
          </Button>
          <Button
            size="sm"
            bg="white"
            color="blue.700"
            _hover={{ opacity: 0.9 }}
          >
            Logout
          </Button>
        </HStack>
      </Flex>

      <Flex>
        {/* Sidebar */}
        <Box
          as="nav"
          w="260px"
          minH="calc(100vh - 72px)"
          bg="white"
          borderRight="1px solid"
          borderColor="gray.200"
          px={5}
          py={6}
          display={{ base: "none", md: "block" }}
        >
          <Text fontSize="sm" color="gray.500" mb={4} fontWeight="700">
            MENU
          </Text>

          <Flex direction="column" gap={2}>
            <NavLink to="/contacts" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Box
                  fontSize="lg"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  bg={isActive ? "blue.50" : "transparent"}
                  color={isActive ? "blue.700" : "gray.800"}
                  fontWeight={isActive ? "800" : "600"}
                  _hover={{ bg: "blue.50" }}
                >
                  お問い合わせ
                </Box>
              )}
            </NavLink>

            <NavLink to="/contacts/list" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Box
                  fontSize="lg"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  bg={isActive ? "blue.50" : "transparent"}
                  color={isActive ? "blue.700" : "gray.800"}
                  fontWeight={isActive ? "800" : "600"}
                  _hover={{ bg: "blue.50" }}
                >
                  お問い合わせ一覧
                </Box>
              )}
            </NavLink>

            <NavLink to="/tasks" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Box
                  fontSize="lg"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  bg={isActive ? "blue.50" : "transparent"}
                  color={isActive ? "blue.700" : "gray.800"}
                  fontWeight={isActive ? "800" : "600"}
                  _hover={{ bg: "blue.50" }}
                >
                  タスク
                </Box>
              )}
            </NavLink>

            {/* ✅ 追加：在庫管理 */}
            <NavLink to="/inventory" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Box
                  fontSize="lg"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  bg={isActive ? "blue.50" : "transparent"}
                  color={isActive ? "blue.700" : "gray.800"}
                  fontWeight={isActive ? "800" : "600"}
                  _hover={{ bg: "blue.50" }}
                >
                  在庫管理
                </Box>
              )}
            </NavLink>

            <NavLink to="/requests" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Box
                  fontSize="lg"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  bg={isActive ? "blue.50" : "transparent"}
                  color={isActive ? "blue.700" : "gray.800"}
                  fontWeight={isActive ? "800" : "600"}
                  _hover={{ bg: "blue.50" }}
                >
                  ミニ稟議
                </Box>
              )}
            </NavLink>

            <NavLink to="/profile" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Box
                  fontSize="lg"
                  px={3}
                  py={2}
                  borderRadius="lg"
                  bg={isActive ? "blue.50" : "transparent"}
                  color={isActive ? "blue.700" : "gray.800"}
                  fontWeight={isActive ? "800" : "600"}
                  _hover={{ bg: "blue.50" }}
                >
                  プロフィール
                </Box>
              )}
            </NavLink>
          </Flex>
        </Box>

        {/* Main */}
        <Box flex="1" py={10} px={{ base: 4, md: 10 }}>
          <Container maxW="container.lg">
            <Box
              bg="white"
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="2xl"
              p={{ base: 5, md: 8 }}
              boxShadow="md"
            >
              {children}
            </Box>

            <Text mt={8} fontSize="sm" color="gray.500" textAlign="center">
              © {new Date().getFullYear()} Office App
            </Text>
          </Container>
        </Box>
      </Flex>
    </Box>
  );
}

export default Layout;
