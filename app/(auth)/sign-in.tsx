import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useColorScheme,
  Alert,
  Image,
  Animated,
  Easing,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../constants/Colors";
import { Link, Stack, useRouter } from "expo-router";
import { SignInFormData } from "@/constants/types";
import { useForm, Controller } from "react-hook-form";
const signInImage = require("../../assets/images/people-carrying-delivering-big-box-delivery-workers-working-warehouse-men-with-goods-carton-packaging-hands-two-guys-with-load.png");
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastManager, { Toast } from "toastify-react-native";
import { login } from "@/api-client";

const SignInScreen = () => {
  const colorScheme = useColorScheme() || "light"; // Default to "light" if colorScheme is null or undefined
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      //invalidate credentials
      Toast.success("Login Successful");
      router.push("/(user)");
    },
    onError: (error: Error) => {
      Toast.error("Invalid credentials", "top");
      console.log(error.message);
    },
  });

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
    mutation.mutate(data);
  };

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, slideAnim]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ToastManager />
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          <Stack.Screen options={{ title: "Sign in" }} />
          <Image source={signInImage} style={styles.image} />
          <Text style={[styles.heading, { color: Colors[colorScheme].text }]}>
            Welcome Back
          </Text>
          <Text
            style={[styles.subHeading, { color: Colors[colorScheme].text }]}
          >
            Sign in to continue.
          </Text>

          <Controller
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[
                  styles.input,
                  {
                    color: Colors[colorScheme].text,
                    backgroundColor: Colors[colorScheme].background,
                    borderColor: Colors[colorScheme].border,
                  },
                ]}
                placeholderTextColor={Colors[colorScheme].text}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                style={[
                  styles.input,
                  {
                    color: Colors[colorScheme].text,
                    backgroundColor: Colors[colorScheme].background,
                    borderColor: Colors[colorScheme].border,
                  },
                ]}
                placeholderTextColor={Colors[colorScheme].text}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <Button
            title="Submit"
            disabled={mutation.isPending}
            onPress={handleSubmit(onSubmit)}
            color={Colors[colorScheme].tint}
          />

          <Text
            style={[styles.signUpPrompt, { color: Colors[colorScheme].text }]}
          >
            Don't have an account?
          </Text>
          <Link
            href="/sign-up"
            style={[styles.textButton, { color: Colors[colorScheme].tint }]}
          >
            Sign up
          </Link>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    objectFit: "contain",
  },
  signUpPrompt: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default SignInScreen;
