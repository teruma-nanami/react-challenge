import { useContext } from "react";
import { LoginUserContext } from "../providers/LoginUserProviders";
import type { LoginUserContextType } from "../providers/LoginUserProviders";

export const useLoginUser = (): LoginUserContextType => {
  const context = useContext(LoginUserContext);
  if (!context) {
    throw new Error("useLoginUser must be used within a LoginUserProvider");
  }
  return context;
};
