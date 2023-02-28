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

// khusus untuk pemetaan tematik
export const findSurveyResultsThematic = async (questions) => {
  const regencies = [3204, 3217, 3277, 3273]; // bandung, bandung barat, kota bandung, kota cimahi

  try {
    const villagesRes = await axios.all(regencies.map((r) => axios.get(`/api/village?regencyid=${r}`)));

    const villages2D = villagesRes.map((r) => r?.data?.data);
    const villages = [].concat(...villages2D);

    const newQuestions = [];

    villages.forEach((village) => {
      questions.forEach((question) => {
        question.villageID = village?.id;
        newQuestions.push(question);
      });
    });

    const res = await axios.all(
      newQuestions.map((question) =>
        axios.get(
          `/api/survey-result/${question?.surveyID}?questionid=${question?.questionID}&villageid=${question?.villageID}`,
        ),
      ),
    );

    const data = res.map((r) => r?.data?.data);

    return data;
  } catch (error) {
    return [];
  }
};
