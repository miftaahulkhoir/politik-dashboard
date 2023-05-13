import useSWR from "swr";

import fetcher from "./fetcher";

export const useFindAllIssues = () => {
  const { data, error, isLoading } = useSWR(
    "https://913adbf1-92b8-40e3-b330-62d3753f1f65.mock.pstmn.io/issues",
    fetcher,
  );
  const issues = data || [];

  return { issues, error, isLoading };
};

export const useFindAllYearsByIssue = (id) => {
  const { data, error, isLoading } = useSWR(
    id ? `https://913adbf1-92b8-40e3-b330-62d3753f1f65.mock.pstmn.io/issues/${id}/years` : null,
    fetcher,
  );

  const years = data || [];

  return { years, error, isLoading };
};

export const useFindAllSubIssues = (id, year) => {
  const { data, error, isLoading } = useSWR(
    id && year
      ? `https://913adbf1-92b8-40e3-b330-62d3753f1f65.mock.pstmn.io/issues/${id}/sub_issues?year=${year}`
      : null,
    fetcher,
  );

  const subIssues = data || [];

  return { subIssues, error, isLoading };
};
