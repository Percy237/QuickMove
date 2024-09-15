import { validateToken } from "@/api-client";
import { UserType } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";

import { createContext, useContext, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  user: UserType | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
    retry: false,
  });
  let user;
  if (data) {
    user = data;
    console.log("userData:", user);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !isLoading && !isError && !!user,
        user: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContextType;
};
