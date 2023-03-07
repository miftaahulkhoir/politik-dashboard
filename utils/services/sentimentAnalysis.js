import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

export const useGetUserGroups = () => {
  const { data, error, isLoading } = useSWR("/api/sentiment", fetcher);
  const groups = data?.data.data.groups || {};

  return { groups, error, isLoading };
};

export const createGroup = async (data) => {
  return await axios.post(`/api/sentiment/groups`, data);
};

export const createTopic = async (groupId, data) => {
  return await axios.post(`/api/sentiment/groups/${groupId}/keyword`, data);
};

export const updateOrganization = async (data) => {
  return await axios.put(`/api/profile/update/determ-id`, data);
};
