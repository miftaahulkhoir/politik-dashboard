import { Button, Space } from "antd";
import { useMemo, useState } from "react";
import { TbArrowNarrowRight } from "react-icons/tb";

import ReportStatusPill from "./ReportStatusPill";

import weekdayToYear from "../../../utils/helpers/date/weekdayToYear";
import { updateReportStatus } from "../../../utils/services/reports";

export default function ReportChangeStatusModal({ selectedReport, onClose, setReports }) {
  const [loading, setLoading] = useState(false);

  const okHandler = async (id, reportStatusID) => {
    try {
      setLoading(true);
      await updateReportStatus(id, reportStatusID);
      setReports((prevReports) => {
        const newReports = prevReports.map((report) => {
          if (report?.id !== selectedReport?.id) return report;

          report.complaint_status.id = reportStatusID;
          return report;
        });
        return newReports;
      });

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statusID = useMemo(() => Number(selectedReport?.complaint_status?.id), [selectedReport]);
  const nextStatusID = useMemo(() => Number(statusID + 1), [statusID]);

  return (
    <Space direction="vertical" size="middle">
      <div>Apakah anda yakin ingin mengubah status pengajuan berikut?</div>
      <div>
        <div style={{ fontWeight: 600 }}>{selectedReport?.title}</div>
        <div style={{ color: "#7287A5" }}>
          {weekdayToYear(selectedReport?.created_at)} — {selectedReport?.sender_name}
        </div>
      </div>
      <Space size="middle">
        <span>Status:</span>
        <Space size="small">
          <ReportStatusPill id={statusID} />
          <TbArrowNarrowRight size={20} style={{ color: "#7287A5" }} />
          <ReportStatusPill id={nextStatusID} />
        </Space>
      </Space>
      <Space>
        <Button onClick={onClose}>Batal</Button>
        <Button type="primary" onClick={() => okHandler(selectedReport?.id, nextStatusID)} disabled={loading}>
          Iya, ubah
        </Button>
      </Space>
    </Space>
  );
}
