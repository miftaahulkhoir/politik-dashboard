import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

export const useFindAllUsers = () => {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);
  const users = data?.data || [];

  return { users, error, isLoading };
};

export const useFindOneUser = (id) => {
  const { data, error, isLoading } = useSWR(`/api/users/${id}`, fetcher);
  const user = data?.data || {};

  return { user, error, isLoading };
};

export const createUser = async (user) => {
  return await axios.post("/api/users/create", user);
};

export const updateUser = async (id, user) => {
  return await axios.put(`/api/users/${id}`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`/api/users/${id}`);
};
