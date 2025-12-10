import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { logout } from "../app/features/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function Layout() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Flex direction="column" minH="100vh">
      {/* ヘッダー */}
      <Box bg="purple.600" color="white" p={4}>
        <Flex gap={4} mt={2} justifyContent={"space-between"}>
          <Heading size="md">
            <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
              メモアプリ
            </Link>
          </Heading>
          <Box fontSize="lg">
            {!user ? (
              <>
                <Link as={RouterLink} to="/login" mr={4}>
                  ログイン
                </Link>
                <Link as={RouterLink} to="/register" mr={4}>
                  新規登録
                </Link>
              </>
            ) : (
              <>
                <Link as={RouterLink} to="/" mr={4}>
                  Home
                </Link>
                <Link as={RouterLink} to="/new" mr={4}>
                  New
                </Link>
                <Link as={RouterLink} to="/about" mr={4}>
                  About
                </Link>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Box>
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