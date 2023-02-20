import useSWR from "swr";

import fetcher from "./fetcher";

export const useFindProfile = () => {
  const { data, error, isLoading } = useSWR(`/api/profile/`, fetcher);
  const profile = data?.data || {};

  return { profile, error, isLoading };
};
