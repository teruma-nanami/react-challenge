import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
  id: number;
  name: string;
  username: string;
  profileImage: string;
  onClick?: (id: number) => void;
};

export const UserCard = memo((Proos: Props) => {
  const { id, name, username, profileImage, onClick } = Proos;
  return (
    <Box p={5} shadow="md" borderWidth="1px" w="260px" h="260px" onClick={() => onClick?.(id)}>
      <Stack>
        <Image
          src={profileImage}
          borderRadius="full"
          boxSize="150px"
          mx="auto"
          alt="プロフィール画像"
        />
        <Text align="center">{name}</Text>
        <Text align="center">{username}</Text>
      </Stack>
    </Box>
  );
});