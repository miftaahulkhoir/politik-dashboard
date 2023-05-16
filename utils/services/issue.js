import useSWR from "swr";

import fetcher from "./fetcher";
import client from "../helpers/client";
import { useQuery } from "@tanstack/react-query";

const findAllIssue = async () => {
  const { data } = await client.get("https://913adbf1-92b8-40e3-b330-62d3753f1f65.mock.pstmn.io/issues");

  return data || [];
};

const findAllYearByIssue = async (issueId) => {
  const { data } = await client.get(
    `https://913adbf1-92b8-40e3-b330-62d3753f1f65.mock.pstmn.io/issues/${issueId}/years`,
  );

  return data || [];
};

const findSubIssue = async (payload) => {
  const { data } = await client.get(
    `https://913adbf1-92b8-40e3-b330-62d3753f1f65.mock.pstmn.io/issues/${payload.id}/sub_issues?year=${payload.year}`,
  );

  return data || [];
};

export const useFindAllIssues = (extraParams) => useQuery(["issues"], findAllIssue, { ...extraParams });

export const useFindAllYearsByIssue = (issueId, extraParams) =>
  useQuery(["all-year-issue", issueId], () => findAllYearByIssue(issueId), { ...extraParams });

export const useFindAllSubIssues = (payload, extraParams) =>
  useQuery(["all-sub-issue", payload.id, payload.year], () => findSubIssue(payload), { ...extraParams });
