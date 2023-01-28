import axios from "axios";

export const getAllReports = async () => {
  return await axios.get("/api/complaints");
};

export const updateReportStatus = async (id, reportStatusID) => {
  const reportStatusIDStr = reportStatusID + "";
  return await axios.put(`/api/complaints/complaint-status/${id}`, {
    complaint_status_id: "" + reportStatusIDStr,
  });
};
