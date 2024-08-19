import * as SecureStore from "expo-secure-store";
import { SignUpFormData } from "./constants/types";
import { SignInFormData } from "./constants/types";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const register = async (formData: SignUpFormData): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const login = async (formData: SignInFormData): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const { token } = await response.json();
    await SecureStore.setItemAsync("jwt_token", token);
    console.log("Token stored successfully");
    return true;
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
};

export const fetchData = async () => {
  const token = await SecureStore.getItemAsync("jwt_token");

  const response = await fetch(
    "http://your-ip-address:8000/api/protected-route",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch data");
  }
};

export const validateToken = async () => {
  const token = await SecureStore.getItemAsync("jwt_token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const logout = async () => {
  await SecureStore.deleteItemAsync("jwt_token");
  console.log("Token deleted successfully");
};
