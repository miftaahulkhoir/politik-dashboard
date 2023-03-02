import axios from "axios";

export const updateOrganization = async (data) => {
  return await axios.put(`/api/profile/update/determ-id`, data);
};
