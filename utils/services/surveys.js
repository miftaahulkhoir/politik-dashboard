import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

export const useFindAllSurveys = () => {
  const { data, error, isLoading } = useSWR("/api/survey", fetcher);
  const surveys = data?.data || [];

  return { surveys, error, isLoading };
};

export const useFindOneSurvey = (id) => {
  const { data, error, isLoading } = useSWR(`/api/survey/${id}`, fetcher);
  const survey = data?.data || {};

  return { survey, error, isLoading };
};

export const createSurvey = async (survey) => {
  return await axios.post("/api/survey/create", survey);
};

export const updateSurvey = async (id, survey) => {
  return await axios.put(`/api/survey/${id}`, survey);
};

export const updateSurveyStatus = async (id) => {
  return await axios.put(`/api/survey/update-status/${id}`);
};

export const deleteSurvey = async (id) => {
  return await axios.delete(`/api/survey/${id}`);
};

// survey result
export const useFindOneSurveyResult = (id) => {
  const { data, error, isLoading } = useSWR(`/api/survey-result/${id}`, fetcher);
  const survey = data?.data || {};

  return { survey, error, isLoading };
};

export const useFindOneSurveyResultDateCount = (id) => {
  const { data, error, isLoading } = useSWR(`/api/survey-result/date-count/${id}`, fetcher);
  const counts = id ? data?.data : [];

  return { counts, error, isLoading };
};
