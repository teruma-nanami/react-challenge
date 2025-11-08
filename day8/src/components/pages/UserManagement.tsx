import { Wrap } from "@chakra-ui/react";
import { WrapItem } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useState } from "react";
import { UserCard } from "../Organism/Usercard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { Center } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { UserModal } from "../Organism/UserModal";
import type { User } from "@/types/api/User";

export const UserManagement = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [selectedUser, setSelectedUser] = useState<User>();

  const onClickUser = useCallback(
    (user: User) => {
      setSelectedUser(user);
      onOpen();
    },
    [onOpen]
  );
  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap spacing="30px" padding="30px" justify="center">
          {users?.map((user) => (
            <WrapItem key={user.id}>
              <UserCard
                id={user.id}
                name={user.name}
                username={user.username}
                profileImage={`https://i.pravatar.cc/150?img=${user.id}`}
                onClick={() => {
                  onClickUser(user);
                }}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}

      {selectedUser && (
        <UserModal
          isOpen={isOpen}
          onClose={onClose}
          user={selectedUser}
        />
      )}
    </>
  );
});
