import { View, Text } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { logout } from "@/api-client";
import { useAuthContext } from "@/context/AuthProvider";
import styles from "toastify-react-native/components/styles";

const index = () => {
  const { isLoggedIn } = useAuthContext();
  console.log(isLoggedIn);
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      {isLoggedIn ? (
        <Text style={{ color: "white" }}>Logged in</Text>
      ) : (
        <Text style={{ color: "white" }}>No</Text>
      )}
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/(onboarding)"} asChild>
        <Button text="Onboarding" />
      </Link>
      <Link href={"/sign-in"} asChild>
        <Button text="SignIn" />
      </Link>
      <Link href={"/(mover)/profile/pricing"} asChild>
        <Button text="SignIn" />
      </Link>
      <Button text="Logout" onPress={logout} />
    </View>
    // <Redirect href={isLoggedIn ? "/(user)" : "/(onboarding)"} />
  );
};

export default index;
