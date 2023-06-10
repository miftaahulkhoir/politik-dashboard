import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const getSurveyResult = async (surveyId) => {
  const res = await axios.get(`/api/internal/survey/result`, {
    params: { surveyId },
  });

  return res;
};

const getListSurveys = async () => {
  const res = await axios.get("/api/internal/survey/list");

  return res;
};

const getSurveyDateCount = async (surveyId) => {
  const res = await axios.get("/api/internal/survey/result/date-count", {
    params: {
      surveyId,
    },
  });

  return res;
};

export const useGetSurveyResult = (id, extraparams) =>
  useQuery(["survey_result", id], () => getSurveyResult(id), { ...extraparams });

export const useGetListSurveys = (extraparams) => useQuery(["list_survey"], () => getListSurveys(), { ...extraparams });

export const useGetSurveyDateCount = (id, extraparams) =>
  useQuery(["survey_date_count", id], () => getSurveyDateCount(id), { ...extraparams });
