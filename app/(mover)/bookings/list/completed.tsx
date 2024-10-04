import Colors from "@/constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";

import * as Location from "expo-location";

import { useQuery } from "@tanstack/react-query";
import { getAllMovers } from "@/api-client";

export default function CustomerHomeScreen() {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();

  const {
    data: movers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allMovers"],
    queryFn: getAllMovers,
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Text> Completed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
