import useSWR from "swr";

import fetcher from "./fetcher";

export const useFindAllRegencies = () => {
  const { data, error, isLoading } = useSWR("/api/regency", fetcher);
  const regencies = data?.data || [];

  return { regencies, error, isLoading };
};

export const useFindAllDistrictsByRegencyID = (regencyID) => {
  const { data, error, isLoading } = useSWR(`/api/distric/?regencyid=${regencyID}`, fetcher);
  const districts = data?.data || [];

  return { districts, error, isLoading };
};
