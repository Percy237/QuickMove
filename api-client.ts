import * as SecureStore from "expo-secure-store";
import { MoverFormData, SignUpFormData } from "./constants/types";
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

// MAP REQUESTS
export const fetchSearchResults = async (query: string) => {
  const secretAccessToken = MAPBOX_SECRET_ACCESS_TOKEN;
  const url = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(
    query
  )}&language=en&country=cm&session_token=0d125fa5-69e1-47d1-891f-58c247201762&access_token=pk.eyJ1IjoidHBlcmN5MjM3IiwiYSI6ImNtMTFxMnlzMDB0MDcyb3IzcHk2bGh1amYifQ.-lX_SlE4WXuKC4duG5mzQg`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.suggestions;
  } catch (error) {
    console.error("Error fetching search results: ", error);
  }
};

export const fetchAddressDetails = async (mapboxId: string) => {
  const url = `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapboxId}?session_token=0d125fa5-69e1-47d1-891f-58c247201762&access_token=pk.eyJ1IjoidHBlcmN5MjM3IiwiYSI6ImNtMTFxMnlzMDB0MDcyb3IzcHk2bGh1amYifQ.-lX_SlE4WXuKC4duG5mzQg`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.features;
  } catch (error) {
    console.error("Error fetching search results: ", error);
  }
};

export const fetchStaticMap = async (lon: string, lat: string) => {
  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+555555(${lon},${lat})/${lon},${lat},9.11,0/300x200@2x?access_token=pk.eyJ1IjoidHBlcmN5MjM3IiwiYSI6ImNtMTFxMnlzMDB0MDcyb3IzcHk2bGh1amYifQ.-lX_SlE4WXuKC4duG5mzQg`;

  return url;
};

export const fetchDefaultStaticMap = async (lon: number, lat: number) => {
  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+555555(${lon},${lat})/${lon},${lat},9.11,0/300x200@2x?access_token=pk.eyJ1IjoidHBlcmN5MjM3IiwiYSI6ImNtMTFxMnlzMDB0MDcyb3IzcHk2bGh1amYifQ.-lX_SlE4WXuKC4duG5mzQg`;

  return url;
};
