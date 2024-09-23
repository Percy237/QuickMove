import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Button,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Link, useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Mover } from "@/constants/types";

type MoverListItemProps = {
  mover: Mover;
};

export const defaultMoverImage =
  "https://muldersmoving.com/wp-content/uploads/2020/10/filingcabinet-scaled.jpg";

const MoverListItem = ({ mover }: MoverListItemProps) => {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();
  const segments = useSegments();

  return (
    <Link
      href={`/${segments[0]}/movers/${mover._id}`}
      asChild
      style={{ flex: 1, maxWidth: "50%" }}
    >
      <Pressable
        style={[
          styles.moverContainer,
          { backgroundColor: Colors[colorScheme].backgroundAccent },
        ]}
      >
        <Image
          source={{ uri: mover.companyLogo || defaultMoverImage }}
          style={styles.moverLogo}
        />
        <View style={styles.moverDetails}>
          <Text style={[styles.moverName, { color: Colors[colorScheme].text }]}>
            {mover.businessName}
          </Text>
          <Text style={[styles.moverArea, { color: Colors[colorScheme].text }]}>
            {mover.serviceArea}
          </Text>
          <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Ionicons
                key={index}
                name={
                  index < Math.floor(mover.averageRating)
                    ? "star"
                    : "star-outline"
                }
                size={16}
                color={Colors[colorScheme].accentColor}
              />
            ))}
            <Text
              style={[styles.ratingText, { color: Colors[colorScheme].text }]}
            >
              {mover.averageRating.toFixed(1)}
            </Text>
          </View>
          <Button title="Book Now" onPress={() => handleBookMover(mover._id)} />
        </View>
      </Pressable>
    </Link>
  );
};

export default MoverListItem;

const styles = StyleSheet.create({
  moverContainer: {
    padding: 16,
    marginBottom: 16,
    
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: "100%", // Adjust width for two-column layout
    marginHorizontal: "1%", // Add margin for spacing between columns
  },
  moverLogo: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  moverDetails: {
    flex: 1,
  },
  moverName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  moverArea: {
    fontSize: 14,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
});
