// app/summary.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useFormContext } from "@/context/FormContext";
import { DocumentData, MoverFormData } from "@/constants/types";
import { useMutation } from "@tanstack/react-query";
import { registerMover } from "@/api-client";
import { useToast } from "react-native-toast-notifications";
import Loader from "@/components/Loader";

export default function Summary() {
  const colorScheme = useColorScheme() || "light";
  const toast = useToast();
  const router = useRouter();
  const { formData } = useFormContext();

  const prepareFormData = (data: MoverFormData) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key as keyof MoverFormData];

      if (typeof value === "string") {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        // Convert arrays to JSON strings
        value.forEach((item) => formData.append(key, item));
      } else if (typeof value === "object" && value !== null) {
        // Type guards for ImageData and DocumentData
        const file = value as File | ImageData | DocumentData;
        if ("uri" in file && file.uri) {
          formData.append(key, {
            uri: file.uri,
            name: file.name ?? "unknown",
            type: file.type ?? "application/octet-stream",
          } as any);
        }
      }
    });
    console.log(formData);
    return formData;
  };

  const mutation = useMutation({
    mutationFn: registerMover,
    onSuccess: async () => {
      console.log("Mover Registration successful");
      toast.show("We got you!", {
        type: "success",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
      setTimeout(() => {
        router.push("/moverRegistrationSuccess");
      }, 4000);
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.show(`${error.message}`, {
        type: "danger",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
    },
  });

  const handleSubmit = () => {
    const preparedFormData = prepareFormData(formData);
    mutation.mutate(preparedFormData);
  };

  // Helper function to render image previews
  const renderImagePreview = (uri?: string) => {
    if (!uri) return null;

    return <Image source={{ uri }} style={styles.imagePreview} />;
  };

  // Helper function to render document summaries
  const renderDocumentSummary = (name?: string | null | undefined) => {
    if (!name)
      return <Text style={styles.summaryText}>Document Not Uploaded</Text>;

    return <Text style={styles.summaryText}>Document: {name}</Text>;
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Text style={[styles.title, { color: Colors[colorScheme].titlePrimary }]}>
        Summary
      </Text>

      <Text style={[styles.summaryText, { color: Colors[colorScheme].text }]}>
        Business Name: {formData.businessName}
      </Text>
      <Text style={[styles.summaryText, { color: Colors[colorScheme].text }]}>
        Business Address: {formData.businessAddress}
      </Text>
      <Text style={[styles.summaryText, { color: Colors[colorScheme].text }]}>
        Service Area: {formData.serviceArea}
      </Text>
      <Text style={[styles.summaryText, { color: Colors[colorScheme].text }]}>
        Description: {formData.description}
      </Text>

      {/* Image Previews */}
      <View style={styles.imageContainer}>
        <Text style={[styles.summaryText, { color: Colors[colorScheme].text }]}>
          Company Logo:
        </Text>
        {renderImagePreview(formData.companyLogo.uri)}
      </View>

      {/* Document Summaries */}
      <View style={styles.documentContainer}>
        <Text style={[styles.summaryText, { color: Colors[colorScheme].text }]}>
          Business Registration Document:
        </Text>
        {renderDocumentSummary(formData.businessRegistrationDocument.name)}
      </View>

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
            {
              backgroundColor: mutation.isPending
                ? Colors[colorScheme].buttonDisabled
                : Colors[colorScheme].buttonPrimary,
            },
          ]}
          onPress={handleSubmit}
        >
          <Text
            style={[
              styles.buttonText,
              { color: Colors[colorScheme].buttonTextPrimary },
            ]}
          >
            {mutation.isPending ? "Submitting..." : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "left",
  },
  imageContainer: {
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    marginVertical: 10,
  },
  documentContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
