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
import { movers } from "@/assets/data/movers";

import MoverListItem from "@/components/MoverListItem";
import { useAuth } from "@/context/AuthProvider";

export default function CustomerHomeScreen() {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();
  const handleBecomeMover = () => {
    router.push("/(becomeMover)/step");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
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

      <FlatList
        data={movers}
        renderItem={({ item }) => <MoverListItem mover={item} />}
        contentContainerStyle={styles.moversList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
