import React, { createContext, useContext, useState, ReactNode } from "react";

interface BookMoveFormContextProps {
  formData: any;
  setFormData: (data: Partial<any>) => void;
  resetFormData: () => void;
}

const BookMoveFormContext = createContext<BookMoveFormContextProps | undefined>(
  undefined
);

export const useBookMoveFormContext = () => {
  const context = useContext(BookMoveFormContext);
  if (!context) {
    throw new Error(
      "useBookMoveFormContext must be used within a FormProvider"
    );
  }
  return context;
};

export const BookMoveFormProvider = ({ children }: { children: ReactNode }) => {
  const defaultFormData: any = {};
  const [formData, setFormDataState] = useState<any>();
  const setFormData = (data: Partial<any>) => {
    setFormDataState((prevData: any) => ({ ...prevData, ...data }));
  };
  const resetFormData = () => {
    setFormDataState(defaultFormData);
  };

  return (
    <BookMoveFormContext.Provider
      value={{ formData, setFormData, resetFormData }}
    >
      {children}
    </BookMoveFormContext.Provider>
  );
};
