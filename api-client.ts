import * as SecureStore from "expo-secure-store";
import { MoverFormData, PricingType, SignUpFormData } from "./constants/types";
import { SignInFormData } from "./constants/types";
import { useRouter } from "expo-router";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const MAPBOX_SECRET_ACCESS_TOKEN =
  process.env.EXPO_PUBLIC_MAPBOX_SECRET_ACCESS_TOKEN;
const MAPBOX_PUBLIC_ACCESS_TOKEN =
  process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN;

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
    const { token, role } = await response.json();
    await SecureStore.setItemAsync("jwt_token", token);
    await SecureStore.setItemAsync("role", role);
    console.log("Token stored successfully");
    console.log("Role stored successfully");
    return true;
  } else {
    const error = await response.json();

    throw new Error(error.message);
  }
};

export const registerMover = async (formData: FormData): Promise<any> => {
  const token = await SecureStore.getItemAsync("jwt_token");
  const response = await fetch(`${API_BASE_URL}/api/become-mover`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
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

export const getAllMovers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/movers`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch movers");
  }
};

export const getMover = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/mover/${id}`, {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch mover");
  }
};

export const getMoverProfile = async (id: string): Promise<any> => {
  const token = await SecureStore.getItemAsync("jwt_token");
  const response = await fetch(`${API_BASE_URL}/api/mover-profile/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch mover profile");
  }
};

export const getPricing = async (moverId: string): Promise<any> => {
  const token = await SecureStore.getItemAsync("jwt_token");
  const response = await fetch(`${API_BASE_URL}/api/get-pricing/${moverId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch mover profile");
  }
};

export const createPricing = async (formData: any): Promise<any> => {
  const token = await SecureStore.getItemAsync("jwt_token");
  const response = await fetch(`${API_BASE_URL}/api/create-or-update-pricing`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const getMoverBookings = async (moverId: string) => {
  const token = await SecureStore.getItemAsync("jwt_token");
  const response = await fetch(
    `${API_BASE_URL}/api/mover-bookings/${moverId}`,
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
    throw new Error("Failed to fetch mover bookings");
  }
};

export const getBooking = async (bookingId: string) => {
  const token = await SecureStore.getItemAsync("jwt_token");
  const response = await fetch(`${API_BASE_URL}/api/booking/${bookingId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch mover booking");
  }
};
