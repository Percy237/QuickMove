import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useColorScheme } from "@/components/useColorScheme";
import { AuthContextProvider } from "@/context/AuthProvider";
import { ToastProvider } from "react-native-toast-notifications";
import { FormProvider } from "@/context/FormContext";
import { BecomeMoverProgressBarContextProvider } from "@/context/BecomeMoverProgressBar";
import { BookMoveProgressBarContextProvider } from "@/context/BookMoveProgressBar";
import { BookMoveFormProvider } from "@/context/BookMoveContext";
import NotificationContextProvider from "@/context/NotificationContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <AuthContextProvider>
            <ToastProvider offsetTop={50}>
              <FormProvider>
                <BecomeMoverProgressBarContextProvider>
                  <BookMoveProgressBarContextProvider>
                    <BookMoveFormProvider>
                      <Stack>
                        <Stack.Screen
                          name="(user)"
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen
                          name="(mover)"
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen
                          name="(auth)"
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen
                          name="(becomeMover)"
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen
                          name="(bookingMove)"
                          options={{
                            presentation: "modal",
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="(onboarding)"
                          options={{ headerShown: false }}
                        />
                        <Stack.Screen
                          name="modal"
                          options={{ presentation: "modal" }}
                        />
                      </Stack>
                    </BookMoveFormProvider>
                  </BookMoveProgressBarContextProvider>
                </BecomeMoverProgressBarContextProvider>
              </FormProvider>
            </ToastProvider>
          </AuthContextProvider>
        </NotificationContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
