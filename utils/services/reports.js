import axios from "axios";

export const updateReportStatus = async (id, reportStatusID) => {
  const reportStatusIDStr = reportStatusID + "";
  const res = await axios.put(`/api/complaints/complaint-status/${id}`, {
    complaint_status_id: "" + reportStatusIDStr,
  });

  console.log(res.data);

  console.log("req body", {
    complaint_status_id: reportStatusID + "",
  });

  return res;
};
