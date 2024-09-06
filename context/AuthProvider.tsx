import { validateToken } from "@/api-client";
import { useQuery } from "@tanstack/react-query";

import { createContext, useContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError, isLoading } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
    retry: false,
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn: !isLoading && !isError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContextType;
};
