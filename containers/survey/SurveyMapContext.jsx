import { isEmpty } from "lodash";
import React, { createContext, useEffect, useMemo, useState } from "react";

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
  selectedProvince: {},
  setSelectedProvince: () => {},
  selectedKabkot: {},
  setSelectedKabkot: () => {},
  kabkotGeom: {},
  setKabkotGeom: () => {},
  countFilter: {},
  setCountFilter: () => {},
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
  const [selectedProvince, setSelectedProvince] = useState({});
  const [selectedKabkot, setSelectedKabkot] = useState({});
  const [kabkotGeom, setKabkotGeom] = useState({});
  const [countFilter, setCountFilter] = useState({});

  const reset = () => {
    setSelectedOccupation({});
    setSelectedSurveyQuestion(undefined);
    setSelectedSurvey(undefined);
    setTempSelectedSurvey(undefined);
    setSelectedSurveyPolygon({});
    setIsShowDrawer(false);
    setSelectedPolygonProperty({});
    setSelectedProvince({});
    setSelectedKabkot({});
    setKabkotGeom({});
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
      selectedProvince,
      setSelectedProvince,
      selectedKabkot,
      setSelectedKabkot,
      kabkotGeom,
      setKabkotGeom,
      countFilter,
      setCountFilter,
      reset,
    }),
    [
      selectedOccupation,
      selectedSurveyMenu,
      selectedSurveyQuestion,
      isShowSidebarFilter,
      selectedSurvey,
      tempSelectedSurvey,
      selectedSurveyPolygon,
      isShowDrawer,
      selectedPolygonProperty,
      selectedProvince,
      selectedKabkot,
      kabkotGeom,
      countFilter,
    ],
  );

  useEffect(() => {
    setSelectedKabkot({});
  }, [selectedProvince]);

  useEffect(() => {
    setCountFilter((prev) => {
      const clonePrev = { ...prev };
      const count = Object.values(selectedOccupation).filter((item) => item).length;
      return { ...clonePrev, persebaran: count };
    });
  }, [selectedOccupation]);

  useEffect(() => {
    setCountFilter((prev) => {
      const clonePrev = { ...prev };
      return { ...clonePrev, tematik: isEmpty(selectedSurveyQuestion) ? 0 : 1 };
    });
  }, [selectedSurveyQuestion]);

  return <SurveyMapContext.Provider value={reviewProviderValue}>{children}</SurveyMapContext.Provider>;
};

export { SurveyMapContext, SurveyMapProvider };
