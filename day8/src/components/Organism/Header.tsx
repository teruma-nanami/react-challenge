import { Link } from "react-router-dom";
import { memo, useCallback } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { MenuDrawer } from "../Organism/MenuDrawer";
import { MenuIconButton } from "../Atoms/MenuIconButton";
import { useNavigate } from "react-router-dom";

export const Header = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onClickHome = useCallback(() => { navigate("/") }, [navigate])
  const onClickLogin = useCallback(() => { navigate("/login") }, [navigate])
  const onClickUserManagement = useCallback(() => { navigate("/user-management") }, [navigate])
  const onClickSettings = useCallback(() => { navigate("/settings") }, [navigate])
  return (
    <>
      <Flex
        as="header"
        bg="teal.500"
        padding={{ base: "3", md: "5" }}
        color="white"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          as="nav"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          <Heading as="h1" size="lg" onClick={onClickHome} cursor="pointer">
            My Application
          </Heading>
          <Flex
            as="ul"
            listStyleType="none"
            gap="4"
            margin="0"
            padding="0"
            display={{ base: "none", md: "flex" }}
          >
            <Box as="li" pr={4}>
              <Link to="/">Home</Link>
            </Box>
            <Box as="li">
              <Link to="/user-management">User Management</Link>
            </Box>
            <Box as="li">
              <Link to="/settings">Settings</Link>
            </Box>
            <Box as="li">
              <Link to="/login">Login</Link>
            </Box>
          </Flex>
          <MenuIconButton onOpen={onOpen} />
        </Flex>
      </Flex>
      <MenuDrawer isOpen={isOpen} onClose={onClose} onClickHome={onClickHome}  onClickUserManagement={onClickUserManagement} onClickSettings={onClickSettings} onClickLogin={onClickLogin}/>
    </>
  );
});
