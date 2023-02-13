import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

import removeNullUndefinedField from "../helpers/date/removeNullUndefinedField";

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
  return await axios.post("/api/survey", survey);
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

// questions
export const useFindAllQuestionsBySurvey = (surveyID) => {
  const { data, error, isLoading } = useSWR(`/api/question?surveyid=${surveyID}`, fetcher);
  const questions = data?.data || [];

  return { questions, error, isLoading };
};

// survey result
export const useFindOneSurveyResult = (surveyID, paramsArg = {}) => {
  const { villageID, districtID, regencyID, questionID } = paramsArg;
  const params = {
    villageid: villageID,
    districtid: districtID,
    regencyid: regencyID,
    questionid: questionID,
  };
  const cleanParams = removeNullUndefinedField(params);

  console.log("clean params", cleanParams);
  const paramsURL = new URLSearchParams(cleanParams).toString();

  const { data, error, isLoading } = useSWR(`/api/survey-result/${surveyID}?${paramsURL}`, fetcher);
  const survey = data?.data || {};

  return { survey, error, isLoading };
};

export const useFindOneSurveyResultDateCount = (id) => {
  const { data, error, isLoading } = useSWR(`/api/survey-result/date-count/${id}`, fetcher);
  const counts = id ? data?.data : [];

  return { counts, error, isLoading };
};
