import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from "react-native";
import React from "react";

import Colors from "@/constants/Colors";
import { Link, useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Mover } from "@/constants/types";
import { defaultMoverImage } from "./MoverListItem";

type MoverListItemProps = {
  mover: Mover;
};

const TopRatedMovers = ({ mover }: MoverListItemProps) => {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();
  const segments = useSegments();
  return (
    <Link href={`/${segments[0]}/movers/${mover._id}`} asChild>
      <Pressable style={styles.moverContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: mover.companyLogo || defaultMoverImage }}
            style={styles.moverLogo}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[styles.businessName, { color: Colors[colorScheme].text }]}
          >
            {mover.businessName}
          </Text>
          <Text
            style={[styles.serviceArea, { color: Colors[colorScheme].text }]}
          >
            {mover.serviceArea}
          </Text>
          <Text
            style={[
              styles.businessAddress,
              { color: Colors[colorScheme].text },
            ]}
          >
            {mover.businessAddress}
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
              style={[styles.ratingText, { color: Colors[colorScheme].tint }]}
            >
              {mover.averageRating.toFixed(1)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default TopRatedMovers;

const styles = StyleSheet.create({
  moverContainer: {
    flexDirection: "row",
    elevation: 1,
    width: 300,
    height: 150,
    marginRight: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  imageContainer: {
    width: "50%",
    backgroundColor: "yellow",
  },
  textContainer: {
    width: "50%",
    padding: 8,
  },
  businessName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  serviceArea: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  businessAddress: {
    fontSize: 12,
    color: "#888",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
  },
  moverLogo: {
    width: "100%",
    height: "100%",
  },
});
