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
  selectedSurveyPolygon: {},
  setSelectedSurveyPolygon: () => {},
  isShowDrawer: false,
  setIsShowDrawer: () => {},
  selectedPolygonProperty: {},
  setSelectedPolygonProperty: () => {},
  reset: () => {},
});

const SurveyMapProvider = ({ children }) => {
  const [selectedOccupation, setSelectedOccupation] = useState({});
  const [selectedSurveyMenu, setSelectedSurveyMenu] = useState();
  const [selectedSurveyQuestion, setSelectedSurveyQuestion] = useState();
  const [isShowSidebarFilter, setIsShowSidebarFilter] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState();
  const [tempSelectedSurvey, setTempSelectedSurvey] = useState();
  const [selectedSurveyPolygon, setSelectedSurveyPolygon] = useState({});
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const [selectedPolygonProperty, setSelectedPolygonProperty] = useState({});

  const reset = () => {
    setSelectedOccupation({});
    setSelectedSurveyQuestion(undefined);
    setSelectedSurvey(undefined);
    setTempSelectedSurvey(undefined);
    setSelectedSurveyPolygon({});
    setIsShowDrawer(false);
    setSelectedPolygonProperty({});
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
      selectedSurveyPolygon,
      setSelectedSurveyPolygon,
      isShowDrawer,
      setIsShowDrawer,
      selectedPolygonProperty,
      setSelectedPolygonProperty,
      reset,
    }),
    [
      isShowDrawer,
      isShowSidebarFilter,
      selectedOccupation,
      selectedSurvey,
      selectedSurveyMenu,
      selectedSurveyPolygon,
      selectedSurveyQuestion,
      tempSelectedSurvey,
      selectedPolygonProperty,
    ],
  );

  return <SurveyMapContext.Provider value={reviewProviderValue}>{children}</SurveyMapContext.Provider>;
};

export { SurveyMapContext, SurveyMapProvider };
