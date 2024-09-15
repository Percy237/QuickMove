import Colors from "@/constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import MoverListItem from "@/components/MoverListItem";
import { useQuery } from "@tanstack/react-query";
import { getAllMovers } from "@/api-client";
import Spinner from "@/components/Spinner";

export default function CustomerHomeScreen() {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();
  const handleBecomeMover = () => {
    router.push("/(becomeMover)/step");
  };

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
      {/* <View style={styles.banner}>
        <Text style={styles.bannerText}>Your Move, Simplified.</Text>
      </View> */}
      <View
        style={[
          styles.promptContainer,
          { backgroundColor: Colors[colorScheme].backgroundAccent },
        ]}
      >
        <Text style={[styles.promptText, { color: Colors[colorScheme].text }]}>
          Want to become a mover?
        </Text>
        <Button title="Become a Mover" onPress={handleBecomeMover} />
      </View>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={movers}
          renderItem={({ item }) => <MoverListItem mover={item} />}
          contentContainerStyle={styles.moversList}
        />
      )}
      {isError && <Text>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  // banner: {
  //   backgroundColor: "#f8f8f8",
  //   padding: 16,
  //   marginBottom: 16,
  //   alignItems: "center",
  // },
  // bannerText: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  // },
  promptContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  promptText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  moversList: {
    paddingBottom: 16,
    rowGap: 30,
  },
});
