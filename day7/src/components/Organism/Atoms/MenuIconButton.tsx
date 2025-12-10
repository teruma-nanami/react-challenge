import { memo } from "react";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

type Props = {
  onOpen: () => void;
};

export const MenuIconButton = memo((props: Props) => {

  const { onOpen } = props
  return (
    <IconButton
      icon={<HamburgerIcon />}
      variant="unstyled"
      aria-label="Toggle Navigation"
      display={{ base: "flex", md: "none" }}
      size="sm"
      onClick={onOpen}
    />
  );
});
