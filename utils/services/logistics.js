import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

export const useFindAllLogistics = () => {
  const { data, error, isLoading } = useSWR("/api/logistics", fetcher);
  const logistics = data?.data || [];

  return { logistics, error, isLoading };
};

export const useTotalLogistics = () => {
  const { data, error, isLoading } = useSWR("/api/logistics", fetcher);

  return { value: data?.total_all_data ?? 0, error, isLoading };
};

export const useFindOneLogistic = (id) => {
  const { data, error, isLoading } = useSWR(`/api/logistics/${id}`, fetcher);
  const logistic = data?.data || {};

  return { logistic, error, isLoading };
};

export const createLogistic = async (logistic) => {
  return await axios.post("/api/logistics", logistic);
};

export const updateLogistic = async (id, logistic) => {
  return await axios.put(`/api/logistics/${id}`, logistic);
};

export const deleteLogistic = async (id) => {
  return await axios.delete(`/api/logistics/${id}`);
};

// category
export const useFindAllLogisticCategories = () => {
  const { data, error, isLoading } = useSWR("/api/logistics/category", fetcher);
  const categories = data?.data || [];

  return { categories, error, isLoading };
};
