import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPricing, getMoverProfile } from "@/api-client";
import { useAuthContext } from "@/context/AuthProvider";
import Spinner from "@/components/Spinner";
import { useToast } from "react-native-toast-notifications";

const Pricing = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuthContext();
  const [services, setServices] = useState([
    { id: Date.now(), serviceType: "fullService" },
  ]); // Initialize with one service entry

  const addService = () => {
    setServices([...services, { id: Date.now(), serviceType: "fullService" }]); // Add new service entry
  };

  const removeService = (id) => {
    setServices(services.filter((service) => service.id !== id)); // Remove service entry
  };

  const {
    data: moverDetails,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mover-profile", user?.user?._id],
    queryFn: () => getMoverProfile(user?.user?._id as string),
    enabled: !!user?.user?._id,
  });

  const moverId = moverDetails?._id;
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: createPricing,
    onSuccess: async () => {
      toast.show("Pricing created successfully", {
        type: "success",
        placement: "top",
        duration: 1000,
        animationType: "slide-in",
      });
    },
    onError: (error: Error) => {
      toast.show(error.message, {
        type: "danger",
        placement: "top",
        duration: 2000,
        animationType: "slide-in",
      });
    },
  });

  const onSubmit = (data: any) => {
    const formData = { moverId, ...data };
    mutation.mutate(formData);
    console.log(formData);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Set Your Pricing</Text>

        {services.map((service, index) => (
          <View key={service.id} style={{ marginBottom: 20 }}>
            {/* Service Type Picker */}
            <Text>Select Service Type:</Text>
            <Controller
              control={control}
              name={`services[${index}].serviceType`}
              defaultValue={service.serviceType}
              rules={{ required: "Service type is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => {
                      onChange(itemValue);
                      setServices(
                        services.map((s) =>
                          s.id === service.id
                            ? { ...s, serviceType: itemValue }
                            : s
                        )
                      );
                    }}
                  >
                    <Picker.Item label="Full Service" value="fullService" />
                    <Picker.Item label="Self-Service" value="selfService" />
                  </Picker>
                  {errors?.services?.[index]?.serviceType && (
                    <Text style={styles.errorText}>
                      {errors.services[index].serviceType.message}
                    </Text>
                  )}
                </>
              )}
            />

            {/* Base Price Input */}
            <Text>Base Price:</Text>
            <Controller
              control={control}
              name={`services[${index}].basePrice`}
              defaultValue=""
              rules={{
                required: "Base price is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Base price must be a number",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    placeholder={`Enter price for ${service.serviceType}`}
                    style={styles.input}
                  />
                  {errors?.services?.[index]?.basePrice && (
                    <Text style={styles.errorText}>
                      {errors.services[index].basePrice.message}
                    </Text>
                  )}
                </>
              )}
            />

            {/* Charge Per Kilometer Input */}
            <Text>Charge Per Kilometer:</Text>
            <Controller
              control={control}
              name={`services[${index}].chargePerKm`}
              defaultValue=""
              rules={{
                required: "Charge per kilometer is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Charge per kilometer must be a number",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    placeholder={`Enter charge per km for ${service.serviceType}`}
                    style={styles.input}
                  />
                  {errors?.services?.[index]?.chargePerKm && (
                    <Text style={styles.errorText}>
                      {errors.services[index].chargePerKm.message}
                    </Text>
                  )}
                </>
              )}
            />

            {/* Remove Service Button */}
            <Button
              title="Remove Service"
              onPress={() => removeService(service.id)}
            />
          </View>
        ))}

        {/* Add Another Service Button */}
        <Button title="Add Another Service" onPress={addService} />
      </ScrollView>

      {/* Fixed Submit Button */}
      <View style={styles.submitContainer}>
        {mutation.isPending ? (
          <Spinner />
        ) : (
          <Button title="Submit Pricing" onPress={handleSubmit(onSubmit)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  submitContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default Pricing;
