import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { User } from "../users/user.entity";

const currentUserAtom = atom<User>();

export const useCurrentUserStore = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  return { currentUser, setCurrentUser };
};
