import { createContext } from "react";
import type { User } from "../types/api/User";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { ReactNode } from "react";

type LoginUser = User & { isAdmin: boolean };

export type LoginUserContextType = {
  loginUser: LoginUser | undefined;
  setLoginUser: Dispatch<SetStateAction<LoginUser | undefined>>;
};

export const LoginUserContext = createContext<LoginUserContextType | undefined>(
  undefined
);
export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser | undefined>(undefined);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
