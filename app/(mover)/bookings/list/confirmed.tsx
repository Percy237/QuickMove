import Colors from "@/constants/Colors";
import { View, Text, StyleSheet, FlatList, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMoverBookings, getMoverProfile } from "@/api-client";
import { useAuthContext } from "@/context/AuthProvider";
import BookListItem from "@/components/BookListItem"; // Import the component
import { BookingType } from "@/constants/types";

export default function CustomerHomeScreen() {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const {
    data: moverDetails,
    error: userError,
    isLoading: isLoadingUser,
    isError: isUserError,
  } = useQuery({
    queryKey: ["mover-profile", user?.user?._id],
    queryFn: () => getMoverProfile(user?.user?._id as string),
    enabled: !!user?.user?._id,
  });

  queryClient.invalidateQueries({
    queryKey: ["mover-profile", { type: "done" }],
  });

  const moverId = moverDetails?._id;

  const {
    data: moverBookings,
    error: moverError,
    isLoading: isLoadingMoverBookings,
    isError: isMoverBookingsError,
  } = useQuery({
    queryKey: ["mover-bookings", moverId],
    queryFn: () => getMoverBookings(moverId as string),
    enabled: !!moverId,
  });

  queryClient.invalidateQueries({
    queryKey: ["mover-bookings", { type: "done" }],
  });

  if (isLoadingUser || isLoadingMoverBookings) {
    return <Text>Loading...</Text>;
  }

  if (isUserError || isMoverBookingsError) {
    return <Text>Error loading data</Text>;
  }

  // Filter pending bookings
  const pendingBookings = moverBookings?.filter(
    (booking: BookingType) => booking.status === "confirmed"
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <FlatList
        data={pendingBookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <BookListItem moverBookings={item} />}
        ListEmptyComponent={<Text>No confirmed bookings available.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
