import useSWR from "swr";

import fetcher from "./fetcher";

export const useFindAllData = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/management-data", fetcher);
  const allData = data?.data || [];

  return { allData, error, isLoading, mutate };
};
