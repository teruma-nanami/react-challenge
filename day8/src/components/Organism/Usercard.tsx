import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { memo } from "react";

type User = {
  name: string;
  username: string;
  profileImage: string;
};

type Props = {
  user: User;
};

export const UserCard = memo(({ user }: Props) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" w="260px" h="260px">
      <Stack>
        <Image
          src={user.profileImage}
          borderRadius="full"
          boxSize="150px"
          mx="auto"
          alt="プロフィール画像"
        />
        <Text align="center">{user.name}</Text>
        <Text align="center">{user.username}</Text>
      </Stack>
    </Box>
  );
});
