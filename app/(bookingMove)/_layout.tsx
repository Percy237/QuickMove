import { Link, Stack, Tabs } from "expo-router";

export default function MoversStack() {
  return (
    <Stack>
      <Stack.Screen name="how" options={{ title: "Book your move" }} />
    </Stack>
  );
}
