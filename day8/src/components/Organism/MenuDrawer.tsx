import { memo } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickHome: () => void;
  onClickLogin: () => void;
  onClickUserManagement: () => void;
  onClickSettings: () => void;
};


export const MenuDrawer = memo((props: Props) => {
  const { isOpen, onClose, onClickHome, onClickLogin, onClickUserManagement, onClickSettings } = props;
  return (
    <Drawer placement="left" size="xs" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody paddingTop="40px" alignItems="center" gap="20px">
            <Button w="100%" onClick={onClickHome}>TOP</Button>
            <Button w="100%" onClick={onClickLogin}>Login</Button>
            <Button w="100%" onClick={onClickUserManagement}>User Management</Button>
            <Button w="100%" onClick={onClickSettings}>Settings</Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
});
