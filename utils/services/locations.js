import axios from "axios";
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

// geojson
export const reverseGeocoding = async (latitude, longitude) => {
  try {
    const res = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=5523a1bf84d64e849bdd9a6ca7af26e2`,
    );
    return res.data.features[0].properties.formatted;
  } catch (error) {
    return `Latitude: ${Number(latitude)?.toFixed(5)} — Longitude: ${Number(longitude)?.toFixed(5)}`;
  }
};
