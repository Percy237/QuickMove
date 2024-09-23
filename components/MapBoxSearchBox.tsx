import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAddressDetails,
  fetchDefaultStaticMap,
  fetchSearchResults,
  fetchStaticMap,
} from "@/api-client";
import Colors from "@/constants/Colors";

import * as Location from "expo-location";

const MapBoxSearchBox = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [defaultMapUrl, setDefaultMapUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const colorScheme = useColorScheme() || "light";

  const { data, refetch } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: () => fetchSearchResults(query),
    enabled: false,
  });

  const { data: placeDetails, refetch: refetchDetails } = useQuery({
    queryKey: ["placeDetails", selectedPlace],
    queryFn: () => fetchAddressDetails(selectedPlace),
    enabled: !!selectedPlace,
  });

  useEffect(() => {
    if (placeDetails && placeDetails.length > 0) {
      setLat(placeDetails[0].properties.coordinates.latitude);
      setLon(placeDetails[0].properties.coordinates.longitude);
    }
  }, [placeDetails]);

  const { data: mapUrl } = useQuery({
    queryKey: ["staticMap", lon, lat],
    queryFn: () => fetchStaticMap(lon, lat),
    enabled: !!lon && !!lat, // Run the query only when both lon and lat are set
  });

  const handlePlaceSelect = (place: string) => {
    setSelectedPlace(place);
    setShowSuggestions(false);
    refetchDetails();
  };

  const handleInputChange = (text: string) => {
    setQuery(text);
    setShowSuggestions(true);
    if (text.length > 3) {
      refetch();
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            color: Colors[colorScheme].text,
            backgroundColor: Colors[colorScheme].background,
            borderColor: Colors[colorScheme].border,
          },
        ]}
        placeholderTextColor={Colors[colorScheme].text}
        placeholder="Search for a place..."
        value={query}
        onChangeText={handleInputChange}
      />
      {showSuggestions && query.length > 2 && (
        <FlatList
          data={data}
          style={[
            styles.suggestionList,
            {
              backgroundColor: Colors[colorScheme].background,
              shadowColor: "fff",
              borderColor: Colors[colorScheme].border,
            },
          ]}
          keyExtractor={(item) => item.mapbox_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handlePlaceSelect(item.mapbox_id)}
            >
              <Text style={{ color: Colors[colorScheme].text }}>
                {item.name}
              </Text>
              <Text style={{ color: Colors[colorScheme].text }}>
                {item.place_formatted}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Image
        style={styles.mapImage}
        source={{
          uri: mapUrl,
        }}
      />
    </View>
  );
};

export default MapBoxSearchBox;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  suggestionList: {
    position: "absolute", // Make suggestions dropdown-like
    top: 70, // Position below the TextInput (adjust according to input height)
    left: 20,
    right: 0,
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 10, // Ensure it's above other content
    maxHeight: 150, // Limit height
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    width: "95%",
  },

  mapImage: {
    width: "100%",
    height: 300,
    marginTop: 20,
  },
});
