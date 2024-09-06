import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { logout } from "@/api-client";

const index = () => {
  const colorScheme = useColorScheme() || "light";
  const user = {
    email: "test1@example.com",
    password: "$2a$08$9WtvlbxCp8BfxO25mfAyhOMrJ6oOrKVV2PhY26MNUI9q8/oVOU4c6",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+1234567890",
    address: "123 Main St",
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={{ uri: "https://via.placeholder.com/100" }}
        />
        <Text style={[styles.name, { color: Colors[colorScheme].text }]}>
          {user.firstName} {user.lastName}
        </Text>
      </View>
      <Card
        style={[
          styles.card,
          { backgroundColor: Colors[colorScheme].background },
        ]}
      >
        <Card.Content>
          <Title
            style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}
          >
            Profile Details
          </Title>
          <Paragraph
            style={[styles.detail, { color: Colors[colorScheme].text }]}
          >
            Email: {user.email}
          </Paragraph>
          <Paragraph
            style={[styles.detail, { color: Colors[colorScheme].text }]}
          >
            Phone: {user.phoneNumber}
          </Paragraph>
          <Paragraph
            style={[styles.detail, { color: Colors[colorScheme].text }]}
          >
            Address: {user.address}
          </Paragraph>
        </Card.Content>
        <Text style={{ color: "white" }} onPress={logout}>
          Logout
        </Text>
      </Card>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  card: {
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
});
