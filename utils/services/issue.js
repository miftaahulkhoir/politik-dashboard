import { useQuery } from "@tanstack/react-query";
import mockClient from "../helpers/mock-client";
import axios from "axios";

const findAllIssue = async () => {
  const { data } = await axios.get("/api/issues");

  return data.data || [];
};

const getAllProvinces = async () => {
  const { data } = await mockClient.get("/provinces");

  return data.data || [];
};

const findKabkot = async (id) => {
  const { data } = await mockClient.get(`/kabkot/${id}`);

  return data.data || [];
};

const findAllYearByIssue = async (issueId) => {
  const { data } = await mockClient.get(`/years`, {
    params: {
      id: issueId,
    },
  });

  return data.data[0].years || [];
};

const findSubIssue = async (payload) => {
  const { data } = await axios.get(`/api/sub-issues`, {
    params: {
      issue_id: payload.id,
    },
  });

  return data.data;
};

const findProvinceDensity = async (payload) => {
  const { data } = await mockClient.get(`/issue/density`, {
    params: {
      issue: payload.issue,
      year: payload.year,
    },
  });

  return data.data;
};

const findProvinceDensityRank = async (payload) => {
  const { data } = await mockClient.get(`/issue/rank`, {
    params: {
      issue: payload.issue,
      year: payload.year,
    },
  });

  return data.data;
};

const findLayerPinpoint = async (payload) => {
  const { data } = await mockClient.get(`/points`, {
    params: {
      id: payload.ids,
    },
  });

  return data.data;
};

const findKabkotGeom = async (id) => {
  const { data } = await mockClient.get(`/kabkot_geom`, {
    params: {
      id,
    },
  });

  return data.data;
};

export const importIssues = async (payload) => {
  const { data } = await axios.post("/api/issues/import", payload);
  return data.data;
};

export const useFindAllIssues = (extraParams) => useQuery(["issues"], findAllIssue, { ...extraParams });

export const useFindAllYearsByIssue = (issueId, extraParams) =>
  useQuery(["all-year-issue", issueId], () => findAllYearByIssue(issueId), { ...extraParams });

export const useFindAllSubIssues = (payload, extraParams) =>
  useQuery(["all-sub-issue", payload], () => findSubIssue(payload), { ...extraParams });

export const useFindProvinceDensity = (payload, extraparams) =>
  useQuery(["all-province-density", payload], () => findProvinceDensity(payload), { ...extraparams });

export const useFindProvinceDensityRank = (payload, extraparams) =>
  useQuery(["all-province-rank", payload], () => findProvinceDensityRank(payload), { ...extraparams });

export const useFindLayerPinPoint = (payload, extraparams) =>
  useQuery(["all-pinpoint", payload], () => findLayerPinpoint(payload), { ...extraparams });

export const useGetAllProvinces = (extraparams) =>
  useQuery(["all-provinces"], () => getAllProvinces(), { ...extraparams });

export const useFindKabkot = (id, extraparams) =>
  useQuery(["all-kabkot", id], () => findKabkot(id), { ...extraparams });

export const useFindKabkotGeom = (id, extraparams) =>
  useQuery(["all-kabkot-geom", id], () => findKabkotGeom(id), { ...extraparams });
