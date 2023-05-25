import React, { createContext, useMemo, useState } from "react";

const SurveyMapContext = createContext({
  selectedOccupation: undefined,
  setSelectedOccupation: () => {},
  selectedSurveyMenu: undefined,
  setSelectedSurveyMenu: () => {},
  selectedSurveyQuestion: undefined,
  setSelectedSurveyQuestion: () => {},
  reset: () => {},
});

const SurveyMapProvider = ({ children }) => {
  const [selectedOccupation, setSelectedOccupation] = useState();
  const [selectedSurveyMenu, setSelectedSurveyMenu] = useState();
  const [selectedSurveyQuestion, setSelectedSurveyQuestion] = useState();

  const reset = () => {
    setSelectedOccupation(undefined);
  };

  const reviewProviderValue = useMemo(
    () => ({
      selectedOccupation,
      setSelectedOccupation,
      selectedSurveyMenu,
      setSelectedSurveyMenu,
      selectedSurveyQuestion,
      setSelectedSurveyQuestion,
      reset,
    }),
    [selectedOccupation, selectedSurveyMenu, selectedSurveyQuestion],
  );

  return <SurveyMapContext.Provider value={reviewProviderValue}>{children}</SurveyMapContext.Provider>;
};

export { SurveyMapContext, SurveyMapProvider };
