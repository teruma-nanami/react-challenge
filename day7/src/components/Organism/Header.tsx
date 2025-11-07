import { Link } from "react-router-dom";
import { memo } from "react";
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Header = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Heading as="h1" size="lg">
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
              <Link to="/login">Login</Link>
            </Box>
            <Box as="li">
              <Link to="/user-management">User Management</Link>
            </Box>
            <Box as="li">
              <Link to="/settings">Settings</Link>
            </Box>
          </Flex>
          <IconButton
            icon={<HamburgerIcon />}
            variant="unstyled"
            aria-label="Toggle Navigation"
            display={{ base: "flex", md: "none" }}
            size="sm"
            onClick={onOpen}
          />
        </Flex>
      </Flex>
      <Drawer placement="left" size="xs" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody paddingTop="40px" alignItems="center" gap="20px">
              <Button w="100%">TOP</Button>
              <Button w="100%">Login</Button>
              <Button w="100%">User Management</Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
});
