import React, { createContext, useContext, useState } from "react";

interface ProgressBarContextProps {
  currentActive: number;
  handleNext: () => void;
  handlePrev: () => void;
}

const BecomeMoverProgressBarContext = createContext<
  ProgressBarContextProps | undefined
>(undefined);

export const BecomeMoverProgressBarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentActive, setCurrentActive] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    setCurrentActive((prev) => (prev < totalSteps ? prev + 1 : prev));
    console.log("handleNext");
  };

  const handlePrev = () => {
    setCurrentActive((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <BecomeMoverProgressBarContext.Provider
      value={{ currentActive, handleNext, handlePrev }}
    >
      {children}
    </BecomeMoverProgressBarContext.Provider>
  );
};

export const useBecomeMoverProgressBar = () => {
  const context = useContext(BecomeMoverProgressBarContext);
  return context as ProgressBarContextProps;
};
