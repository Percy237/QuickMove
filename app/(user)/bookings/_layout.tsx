import { Stack } from "expo-router";

export default function BookingStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "My Transit" }} />
    </Stack>
  );
}
