import useSWR from "swr";

import fetcher from "./fetcher";

export const useFindAllRegencies = () => {
  const { data, error, isLoading } = useSWR("/api/regency", fetcher);
  const regencies = data?.data || [];

  return { regencies, error, isLoading };
};

export const useFindAllDistricts = () => {
  const { data, error, isLoading } = useSWR("/api/distric", fetcher);
  const districts = data?.data || [];

  return { districts, error, isLoading };
};

export const useFindAllDistrictsByRegencyID = (regencyID) => {
  const { data, error, isLoading } = useSWR(`/api/distric/?regencyid=${regencyID}`, fetcher);
  const districts = data?.data || [];

  return { districts, error, isLoading };
};

export const useFindAllVillages = () => {
  const { data, error, isLoading } = useSWR("/api/village", fetcher);
  const villages = data?.data || [];

  return { villages, error, isLoading };
};

export const useFindAllVillagesByDistrictID = (districtID) => {
  const { data, error, isLoading } = useSWR(`/api/village?districid=${districtID}`, fetcher);
  const villages = data?.data || [];

  return { villages, error, isLoading };
};
