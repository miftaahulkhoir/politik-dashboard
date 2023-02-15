import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

export const useFindAllSocmeds = () => {
  const { data, error, isLoading } = useSWR("/api/profile/social-media", fetcher);
  const activeSocialAccounts = data?.data.activeSocialAccounts || [];
  const socmedsList = data?.data.displayNames || [];
  const ayrshareName = data?.data.email || "-";

  return { activeSocialAccounts, socmedsList, ayrshareName, error, isLoading };
};

export const useGetUserAnalytics = () => {
  const { data, error, isLoading } = useSWR("/api/profile/social-media/analytics", fetcher);
  const userAnalytics = data?.data || {};

  return { userAnalytics, error, isLoading };
};

export const updateAyrshareAccount = async (data) => {
  return await axios.put(`/api/profile/update/ayrshare-token`, data);
};
