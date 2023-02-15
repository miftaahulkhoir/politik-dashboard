import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

import removeNullUndefinedField from "../helpers/date/removeNullUndefinedField";

export const useFindAllSocmeds = () => {
  const { data, error, isLoading } = useSWR("/api/profile/social-media", fetcher);
  const socmedsList = data?.data.displayNames || [];
  const ayrshareName = data?.data.email || "-";

  return { socmedsList, ayrshareName, error, isLoading };
};

export const updateAyrshareAccount = async (data) => {
  return await axios.put(`/api/profile/update/ayrshare-token`, data);
};
