import React, { createContext, useContext, useState } from "react";

interface ProgressBarContextProps {
  currentActive: number;
  handleNext: () => void;
  handlePrev: () => void;
}

const BookMoveProgressBarContext = createContext<
  ProgressBarContextProps | undefined
>(undefined);

export const BookMoveProgressBarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentActive, setCurrentActive] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    setCurrentActive((prev) => (prev < totalSteps ? prev + 1 : prev));
    console.log("handleNext");
  };

  const handlePrev = () => {
    setCurrentActive((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <BookMoveProgressBarContext.Provider
      value={{ currentActive, handleNext, handlePrev }}
    >
      {children}
    </BookMoveProgressBarContext.Provider>
  );
};

export const useBookMoveProgressBar = () => {
  const context = useContext(BookMoveProgressBarContext);
  return context as ProgressBarContextProps;
};
