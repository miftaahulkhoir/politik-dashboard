import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateUserAccess = () => {
  return useMutation(({ id, payload }) => {
    axios.put(`/api/users/${id}/accesses`, {
      accesses: payload,
    });
  });
};
