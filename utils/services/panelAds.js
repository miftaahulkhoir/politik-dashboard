import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

export const useGetCampaignsById = (id) => {
  const { data, error, isLoading } = useSWR(`/api/google-ads/${id}`, fetcher);
  const campaigns = data?.data.results || [];

  return { campaigns, error, isLoading };
};
