import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

export const useGetCampaignsById = (id) => {
  const { data, error, isLoading } = useSWR(`/api/profile/google-ads`, fetcher);
  const campaigns = data?.data?.results || [];

  return { campaigns, error, isLoading };
};

export const useGetGoogleCustomerName = (id) => {
  const { data, error, isLoading } = useSWR(`/api/profile/google-ads/name`, fetcher);
  const gProfileName = data?.data?.results[0].customer.descriptiveName || "";

  return { gProfileName, error, isLoading };
}

export const updateGoogleCustomer = async (data) => {
  return await axios.put(`/api/profile/update/google-ads-id`, data);
};
