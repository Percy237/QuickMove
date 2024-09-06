import React from "react";
import { Link, Stack, Tabs } from "expo-router";

export default function MoversStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
    </Stack>
  );
}
