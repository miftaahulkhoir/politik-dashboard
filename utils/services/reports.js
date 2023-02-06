import axios from "axios";
import useSWR from "swr";

import fetcher from "./fetcher";

export const useFindAllReports = () => {
  const { data, error, isLoading } = useSWR("/api/complaints", fetcher);
  const reports = data?.data || [];

  return { reports, error, isLoading };
};

export const useFindOneReport = (id) => {
  const { data, error, isLoading } = useSWR(`/api/complaints/${id}`, fetcher);
  const report = data?.data || {};

  return { report, error, isLoading };
};

export const updateReportStatus = async (id, reportStatusID) => {
  const reportStatusIDStr = reportStatusID + "";
  return await axios.put(`/api/complaints/complaint-status/${id}`, {
    complaint_status_id: "" + reportStatusIDStr,
  });
};

// report categories
export const useFindAllReportCategories = () => {
  const { data, error, isLoading } = useSWR("/api/complaints/category", fetcher);
  const categories = data?.data || [];

  return { categories, error, isLoading };
};

// report status
export const useFindAllReportStatuses = () => {
  const { data, error, isLoading } = useSWR("/api/complaints/status", fetcher);
  const statuses = data?.data || [];

  return { statuses, error, isLoading };
};
