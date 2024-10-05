import Colors from "@/constants/Colors";
import { View, Text, StyleSheet, FlatList, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMoverBookings,
  getMoverProfile,
  getUserBookings,
} from "@/api-client";
import { useAuthContext } from "@/context/AuthProvider";
import BookListItem from "@/components/BookListItem"; // Import the component
import { BookingType } from "@/constants/types";
import UserBookListItem from "@/components/UserBookingListItem";

export default function MyTransit() {
  const colorScheme = useColorScheme() || "light";
  const router = useRouter();
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  console.log(user.user._id);
  const {
    data: userBookings,
    error: moverError,
    isLoading: isLoadingUserBookings,
    isError: isUserBookingsError,
  } = useQuery({
    queryKey: ["mover-bookings", user?.user?._id],
    queryFn: () => getUserBookings(user?.user?._id as string),
    enabled: !!user?.user?._id,
  });

  queryClient.invalidateQueries({
    queryKey: ["user-bookings", { type: "done" }],
  });

  if (isLoadingUserBookings) {
    return <Text>Loading...</Text>;
  }

  if (isUserBookingsError) {
    return <Text>Error loading data</Text>;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <FlatList
        data={userBookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <UserBookListItem moverBookings={item} />}
        ListEmptyComponent={<Text>No available transit available.</Text>}
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
