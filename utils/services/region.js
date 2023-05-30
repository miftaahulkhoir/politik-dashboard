import { useQuery } from "@tanstack/react-query";
import mockClient from "../helpers/mock-client";

const getProvinces = async () => {
  const { data } = await mockClient.get("/provinces");

  return data.data || [];
};

const getKabkot = async (id) => {
  const { data } = await mockClient.get(`/kabkot/${id}`);

  return data.data || [];
};

const getKabkotGeom = async (id) => {
  const { data } = await mockClient.get(`/kabkot_geom`, {
    params: {
      id,
    },
  });

  return data.data;
};

export const useGetProvinces = (extraparams) => useQuery(["provinces"], () => getProvinces(), { ...extraparams });

export const useGetKabkot = (id, extraparams) => useQuery(["kabkot", id], () => getKabkot(id), { ...extraparams });

export const useGetKabkotGeom = (id, extraparams) =>
  useQuery(["kabkot-geom", id], () => getKabkotGeom(id), { ...extraparams });
