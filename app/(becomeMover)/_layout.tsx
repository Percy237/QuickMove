import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="step1"
        options={{ title: "Become a logistic provider" }}
      />
      <Stack.Screen
        name="step2"
        options={{ title: "Become a logistic provider" }}
      />
      <Stack.Screen
        name="step3"
        options={{ title: "Become a logistic provider" }}
      />
      <Stack.Screen
        name="summary"
        options={{ title: "Become a logistic provider" }}
      />
      <Stack.Screen
        name="moverRegistrationSuccess"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
