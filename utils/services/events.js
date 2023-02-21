import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

export const useFindAllEvents = () => {
  const { data, error, isLoading } = useSWR("/api/events", fetcher);
  const events = data?.data || [];

  return { events, error, isLoading };
};

export const useFindOneEvent = (id) => {
  const { data, error, isLoading } = useSWR(`/api/events/${id}`, fetcher);
  const event = data?.data || {};

  return { event, error, isLoading };
};

export const createEvent = async (event) => {
  return await axios.post("/api/events", event);
};

export const updateEvent = async (id, event) => {
  return await axios.put(`/api/events/${id}`, event);
};

export const deleteEvent = async (id) => {
  return await axios.delete(`/api/events/${id}`);
};
