import { MoverFormData } from "@/constants/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormContextProps {
  formData: MoverFormData;
  setFormData: (data: Partial<MoverFormData>) => void;
  resetFormData: () => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const defaultFormData: MoverFormData = {
    businessName: "",
    serviceArea: "",
    description: "",
    businessAddress: "",
    companyLogo: { uri: "", name: "", type: "" },
    services: [],
    businessRegistrationDocument: { uri: "", name: "", type: "" },
    governmentIssuedIdFront: { uri: "", name: "", type: "" },
    governmentIssuedIdBack: { uri: "", name: "", type: "" },
    insuranceDocument: { uri: "", name: "", type: "" },
  };
  const [formData, setFormDataState] = useState<MoverFormData>(defaultFormData);

  const setFormData = (data: Partial<MoverFormData>) => {
    setFormDataState((prevData) => ({ ...prevData, ...data }));
  };

  const resetFormData = () => {
    setFormDataState(defaultFormData);
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};
