import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

import removeNullUndefinedField from "../helpers/date/removeNullUndefinedField";

export const useFindAllSocmeds = () => {
  const { data, error, isLoading } = useSWR("/api/profile/social-media", fetcher);
  const socmeds = data?.data.displayNames || [];
  const ayrshareName = data?.data.email || "-";
  console.log(socmeds);

  return { socmeds, ayrshareName, error, isLoading };
};

export const useFindOneSocmed = (id) => {
  const { data, error, isLoading } = useSWR(`/api/survey/${id}`, fetcher);
  const socmed = data?.data || {};

  return { socmed, error, isLoading };
};

export const createSocmed = async (socmed) => {
  return await axios.post("/api/survey", socmed);
};

export const updateSocmed = async (id, socmed) => {
  return await axios.put(`/api/survey/${id}`, socmed);
};

export const updateSocmedStatus = async (id) => {
  return await axios.put(`/api/survey/update-status/${id}`);
};

export const deleteSocmed = async (id) => {
  return await axios.delete(`/api/survey/${id}`);
};

// questions
export const useFindAllQuestionsBySocmed = (socmedID) => {
  const { data, error, isLoading } = useSWR(`/api/question?socmedid=${socmedID}`, fetcher);
  const questions = data?.data || [];

  return { questions, error, isLoading };
};

// socmed result
export const useFindOneSocmedResult = (socmedID, paramsArg = {}) => {
  const { villageID, districtID, regencyID, questionID } = paramsArg;
  const params = {
    villageid: villageID,
    districtid: districtID,
    regencyid: regencyID,
    questionid: questionID,
  };
  const cleanParams = removeNullUndefinedField(params);

  const paramsURL = new URLSearchParams(cleanParams).toString();

  const { data, error, isLoading } = useSWR(`/api/survey-result/${socmedID}?${paramsURL}`, fetcher);
  const socmed = data?.data || {};

  return { socmed, error, isLoading };
};

export const useFindOneSocmedResultDateCount = (id) => {
  const { data, error, isLoading } = useSWR(`/api/survey-result/date-count/${id}`, fetcher);
  const counts = id ? data?.data : [];

  return { counts, error, isLoading };
};
