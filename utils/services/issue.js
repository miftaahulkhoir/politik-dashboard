import { useQuery } from "@tanstack/react-query";
import mockClient from "../helpers/mock-client";
import { flatten } from "lodash";

const findAllIssue = async () => {
  const { data } = await mockClient.get("/issues");

  return data.data || [];
};

const findAllYearByIssue = async (issueId) => {
  const { data } = await mockClient.get(`/years`, {
    params: {
      id: issueId,
    },
  });

  return data.data[0].years || [];
};

const findSubIssue = async (payload) => {
  const { data } = await mockClient.get(`/sub-issues`, {
    params: {
      issue: payload.id,
      year: payload.year,
    },
  });

  return data.data[0]["sub-issues"].flat() || [];
};

const findProvinceDensity = async (payload) => {
  const { data } = await mockClient.get(`/bencana`, {
    params: {
      year: payload.year,
    },
  });

  return data.data[0];
};

export const useFindAllIssues = (extraParams) => useQuery(["issues"], findAllIssue, { ...extraParams });

export const useFindAllYearsByIssue = (issueId, extraParams) =>
  useQuery(["all-year-issue", issueId], () => findAllYearByIssue(issueId), { ...extraParams });

export const useFindAllSubIssues = (payload, extraParams) =>
  useQuery(["all-sub-issue", payload], () => findSubIssue(payload), { ...extraParams });

export const useFindProvinceDensity = (payload, extraparams) =>
  useQuery(["all-province-density", payload], () => findProvinceDensity(payload), { ...extraparams });
