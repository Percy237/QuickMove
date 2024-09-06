// app/step2.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  useColorScheme,
  Animated,
  Easing,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import ProgressBar from "@/components/ProgressBar";
import { DocumentData, MoverFormData } from "@/constants/types";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import { useFormContext } from "@/context/FormContext";

export default function Step3() {
  const colorScheme = useColorScheme() || "light";
  const { formData, setFormData } = useFormContext();
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<MoverFormData>({
    defaultValues: {
      insuranceDocument: formData.insuranceDocument || {
        uri: "",
        name: "",
        type: "",
      },
    },
  });
  const router = useRouter();

  //handle upload document
  const handleDocumentUpload = async (
    field: keyof MoverFormData,
    onChange: (data: DocumentData) => void
  ) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/*",
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const file: DocumentData = {
          uri: result.assets[0].uri,
          name: result.assets[0].name || "",
          type: result.assets[0].mimeType || "",
        };

        onChange(file); // Pass the object to onChange
      }
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
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

  const renderDocumentPreview = (name?: string | undefined | null) => {
    if (!name) return null;

    return (
      <View style={styles.documentPreview}>
        <Text style={styles.documentName}>{name}</Text>
      </View>
    );
  };
  const onSubmit = (data: MoverFormData) => {
    setFormData(data);
    router.push("/summary");
  };

  return (
    <View style={styles.container}>
      <ProgressBar step={3} totalSteps={3} />
      <Text style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}>
        Identification Documents
      </Text>
      <ScrollView>
        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          <Text style={[styles.label, { color: Colors[colorScheme].text }]}>
            Insurance Document
          </Text>

          <Controller
            control={control}
            name="insuranceDocument"
            rules={{
              required: " Insurance document is required",
            }}
            render={({ field: { onChange, value } }) => (
              <>
                {renderDocumentPreview(value?.name)}
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: Colors[colorScheme].buttonPrimary }, // Optional: Use colorScheme for dynamic colors
                  ]}
                  onPress={() =>
                    handleDocumentUpload("insuranceDocument", onChange)
                  }
                >
                  <Text
                    style={[{ color: Colors[colorScheme].buttonTextPrimary }]}
                  >
                    {value ? "Document Uploaded" : "Upload Document"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
          {errors.insuranceDocument && (
            <Text style={styles.errorText}>
              {errors.insuranceDocument.message}
            </Text>
          )}
        </Animated.View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme].buttonPrimary },
          ]}
          onPress={() => router.back()}
        >
          <Text
            style={[
              styles.buttonText,
              { color: Colors[colorScheme].buttonTextPrimary },
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme].buttonPrimary },
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text
            style={[
              styles.buttonText,
              { color: Colors[colorScheme].buttonTextPrimary },
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
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
  documentSection: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
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
  documentPreview: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 80,
  },
  documentName: {
    color: "#333",
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
