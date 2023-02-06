import { Button, Input, Space } from "antd";
import { useMemo, useState } from "react";

import ReportStatusPill from "./ReportStatusPill";

import { updateReportStatus } from "../../../utils/services/reports";
import MultiRadioButton from "../../elements/input/MultiRadioButton";

export default function ReportChangeStatusModal({ selectedReport, onClose, setReports, apiNotification, statuses }) {
  const [loading, setLoading] = useState(false);
  const [selectedStatusID, setSelectedStatusID] = useState(selectedReport?.complaint_status?.id);

  const inputs = useMemo(() => {
    const res = statuses.map((status) => ({
      value: status.id,
      label: <ReportStatusPill id={status.id} />,
    }));

    console.log("status obj", res);
    return res;
  }, [statuses]);

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

      apiNotification.success({
        message: "Sukses",
        description: "Status pengaduan berhasil diubah.",
      });

      onClose();
    } catch (error) {
      apiNotification.error({
        message: "Gagal",
        description: "Terjadi kesalahan",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space direction="vertical" size="middle">
      <Space direction="vertical">
        <div style={{ fontWeight: 600 }}>Ubah status pengaduan</div>
        <MultiRadioButton inputs={inputs} value={selectedStatusID} setValue={setSelectedStatusID} />
      </Space>

      <Space direction="vertical">
        <div style={{ fontWeight: 600 }}>Catatan</div>
        <Input.TextArea rows={1}></Input.TextArea>
      </Space>

      <Space>
        <Button block onClick={onClose}>
          Batal
        </Button>
        <Button block type="primary" onClick={() => okHandler(selectedReport?.id, selectedStatusID)} disabled={loading}>
          Iya, ubah
        </Button>
      </Space>
    </Space>
  );
}
