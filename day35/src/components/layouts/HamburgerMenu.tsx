import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Link as ChakraLink,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function HamburgerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <>
      {/* ハンバーガーアイコン */}
      <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        display={{ base: "flex", md: "none" }} // 768px未満で表示
        onClick={onOpen}
        bg="brand.500"
        color="white"
        _hover={{ bg: "brand.600" }}
      />

      {/* Drawer（横からスライド） */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="sm">
        <DrawerOverlay />
        <DrawerContent bg="brand.500" color="white" boxShadow="xl">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">メニュー</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={2}>
              {navLinks.map((link) => (
                <ChakraLink
                  key={link.to}
                  as={Link}
                  to={link.to}
                  onClick={onClose}
                  p={3}
                  borderRadius="md"
                  _hover={{ bg: "brand.600" }}
                >
                  {link.label}
                </ChakraLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
