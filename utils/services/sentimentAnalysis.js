import axios from "axios";

export const createGroup = async (data) => {
  return await axios.post(`/api/sentiment/groups`, data);
};

export const createTopic = async (groupId, data) => {
  return await axios.post(`/api/sentiment/groups/${groupId}/keyword`, data);
};

export const updateOrganization = async (data) => {
  return await axios.put(`/api/profile/update/determ-id`, data);
};
