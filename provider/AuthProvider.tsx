import { validateToken } from "@/api-client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { isError } = useQuery({
    queryKey: ["validateToken", validateToken],
    retry: false,
  });
  console.log(isError);
  return (
    <AuthContext.Provider value={{ isAuthenticated: !isError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
