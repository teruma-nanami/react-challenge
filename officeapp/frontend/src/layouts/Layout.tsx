// src/layouts/Layout.tsx
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
  Spinner,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } =
    useAuth0();

  return (
    <Box minH="100vh" bg="gray.50">
      {/* ===== Header（常に表示） ===== */}
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

        <HStack spacing={4}>
          {isLoading ? (
            <HStack spacing={2}>
              <Spinner size="sm" />
              <Text fontSize="sm">Loading...</Text>
            </HStack>
          ) : (
            <>
              {isAuthenticated && user && (
                <Text fontSize="sm">{user.name ?? user.email ?? "User"}</Text>
              )}

              {!isAuthenticated ? (
                <Button
                  size="sm"
                  variant="outline"
                  color="white"
                  borderColor="white"
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </Button>
              ) : (
                <Button
                  size="sm"
                  bg="white"
                  color="blue.700"
                  _hover={{ opacity: 0.9 }}
                  onClick={() =>
                    logout({
                      logoutParams: {
                        returnTo: "http://localhost:5173",
                      },
                    })
                  }
                >
                  Logout
                </Button>
              )}
            </>
          )}
        </HStack>
      </Flex>

      <Flex>
        {/* ===== Sidebar（ログイン時のみ表示） ===== */}
        {isAuthenticated && (
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
              {/* 勤怠管理（打刻） */}
              <NavLink to="/attendance" style={{ textDecoration: "none" }}>
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
                    勤怠管理
                  </Box>
                )}
              </NavLink>

              {/* 外部お問い合わせはサイドバーに出さない */}

              <NavLink
                to="/contacts/internal"
                style={{ textDecoration: "none" }}
              >
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

              <NavLink to="/date-requests" style={{ textDecoration: "none" }}>
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
                    休日申請
                  </Box>
                )}
              </NavLink>

              <NavLink to="/requests/time" style={{ textDecoration: "none" }}>
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
                    時刻修正申請
                  </Box>
                )}
              </NavLink>

              <NavLink to="/requests/date" style={{ textDecoration: "none" }}>
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
                    休日申請
                  </Box>
                )}
              </NavLink>

              <NavLink to="/documents" style={{ textDecoration: "none" }}>
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
                    書類（Documents）
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
        )}

        {/* ===== Main ===== */}
        <Box flex="1" py={10} px={{ base: 4, md: 10 }}>
          <Container maxW={isAuthenticated ? "container.lg" : "container.md"}>
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
