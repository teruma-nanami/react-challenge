import { Wrap } from "@chakra-ui/react";
import { WrapItem } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { UserCard } from "../Organism/Usercard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { Center } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

export const UserManagement = memo(() => {
  const { getUsers, users, loading } = useAllUsers();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      {loading ? <Center h="100vh"><Spinner /></Center> : (
      <Wrap spacing="30px" padding="30px" justify="center">
        {users?.map((user) => (
          <WrapItem key={user.id}>
            <UserCard
              user={{
                name: user.name,
                username: user.username,
                profileImage: `https://i.pravatar.cc/150?u=${user.id}`,
              }}
            />
          </WrapItem>
        ))}
      </Wrap>
      )}
    </>
  );
});
