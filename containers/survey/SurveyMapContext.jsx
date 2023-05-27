import React, { createContext, useMemo, useState } from "react";

const SurveyMapContext = createContext({
  selectedOccupation: {},
  setSelectedOccupation: () => {},
  selectedSurveyMenu: undefined,
  setSelectedSurveyMenu: () => {},
  selectedSurveyQuestion: undefined,
  setSelectedSurveyQuestion: () => {},
  isShowSidebarFilter: false,
  setIsShowSidebarFilter: () => {},
  selectedSurvey: undefined,
  setSelectedSurvey: () => {},
  tempSelectedSurvey: undefined,
  setTempSelectedSurvey: () => {},
  reset: () => {},
});

const SurveyMapProvider = ({ children }) => {
  const [selectedOccupation, setSelectedOccupation] = useState({});
  const [selectedSurveyMenu, setSelectedSurveyMenu] = useState();
  const [selectedSurveyQuestion, setSelectedSurveyQuestion] = useState();
  const [isShowSidebarFilter, setIsShowSidebarFilter] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState();
  const [tempSelectedSurvey, setTempSelectedSurvey] = useState();

  const reset = () => {
    setSelectedOccupation(undefined);
    setSelectedSurveyQuestion(undefined);
    setSelectedSurvey(undefined);
    setTempSelectedSurvey(undefined);
  };

  const reviewProviderValue = useMemo(
    () => ({
      selectedOccupation,
      setSelectedOccupation,
      selectedSurveyMenu,
      setSelectedSurveyMenu,
      selectedSurveyQuestion,
      setSelectedSurveyQuestion,
      isShowSidebarFilter,
      setIsShowSidebarFilter,
      selectedSurvey,
      setSelectedSurvey,
      tempSelectedSurvey,
      setTempSelectedSurvey,
      reset,
    }),
    [
      isShowSidebarFilter,
      selectedOccupation,
      selectedSurvey,
      selectedSurveyMenu,
      selectedSurveyQuestion,
      tempSelectedSurvey,
    ],
  );

  return <SurveyMapContext.Provider value={reviewProviderValue}>{children}</SurveyMapContext.Provider>;
};

export { SurveyMapContext, SurveyMapProvider };
