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
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

import MoverListItem from "@/components/MoverListItem";
import { useQuery } from "@tanstack/react-query";
import { getAllMovers } from "@/api-client";
import Spinner from "@/components/Spinner";
import TopRatedMovers from "@/components/TopRatedMovers";
import { Mover } from "@/constants/types";

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

  const topRateMovers =
    movers?.sort((a: any, b: any) => b.averageRating - a.averageRating) || [];

  const [location, setLocation] = useState<any>(null);
  const [nearbyMovers, setNearbyMovers] = useState([]);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        setLocation({ latitude, longitude });
        if (movers?.length) {
          findNearbyMovers(latitude, longitude); // Filter movers based on location
        }
      } catch (error) {
        console.error("Error getting location:", error);
        setErrorMsg(
          "Current location is unavailable. Make sure location services are enabled."
        );
      }
    })();
  }, []);

  const findNearbyMovers = (latitude: number, longitude: number) => {
    const distanceThreshold = 200; // kilometers
    const moversNearby = movers.filter((mover: Mover) => {
      const distance = getDistanceFromLatLonInKm(
        latitude,
        longitude,
        Number(mover.latitude),
        Number(mover.longitude)
      );
      return distance <= distanceThreshold;
    });
    setNearbyMovers(moversNearby);
  };

  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };
  const deg2rad = (deg: number) => deg * (Math.PI / 180);
  console.log("nearbyMovers: ", nearbyMovers);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <View>
        <Text style={{ fontSize: 20 }}>Top Rated Movers</Text>
        <Text onPress={handleBecomeMover}>Become a mover</Text>
      </View>
      <View>
        {isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            style={{ marginTop: 5 }}
            data={topRateMovers}
            renderItem={({ item }) => <TopRatedMovers mover={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20 }}>Movers near you</Text>
      </View>

      <View>
        {isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            style={{ marginTop: 10 }}
            data={nearbyMovers}
            renderItem={({ item }) => <MoverListItem mover={item} />}
            contentContainerStyle={styles.moversList}
            numColumns={2}
            contentContainerStyle={{ gap: 10 }}
            columnWrapperStyle={{ gap: 10 }}
          />
        )}
      </View>
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
