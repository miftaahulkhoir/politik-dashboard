import { Button, Input, Space } from "antd";
import { useMemo, useState } from "react";

import ReportStatusPill from "./ReportStatusPill";

import { updateReportStatus } from "../../../utils/services/reports";
import MultiRadioButton from "../../elements/input/MultiRadioButton";

export default function ReportChangeStatusModal({ selectedReport, onClose, setReports, apiNotification, statuses }) {
  const [loading, setLoading] = useState(false);
  const [selectedStatusID, setSelectedStatusID] = useState(selectedReport?.complaint_status?.id);
  const [desc, setDesc] = useState(selectedReport?.complaint_status_desc);

  const inputs = useMemo(() => {
    const filteredStatuses = statuses.filter(
      (status) => Number(status?.id) >= Number(selectedReport?.complaint_status?.id),
    );
    const res = filteredStatuses.map((status) => ({
      value: status.id,
      label: <ReportStatusPill id={status.id} />,
    }));
    return res;
  }, [selectedReport?.complaint_status?.id, statuses]);

  const okHandler = async (id, reportStatusID, desc) => {
    try {
      setLoading(true);
      await updateReportStatus(id, reportStatusID, desc);
      setReports((prevReports) => {
        const newReports = prevReports.map((report) => {
          if (report?.id !== selectedReport?.id) return report;

          report.complaint_status.id = reportStatusID;
          report.complaint_status_desc = desc;
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
        <Input.TextArea rows={1} autoSize value={desc} onChange={(e) => setDesc(e.target.value)}></Input.TextArea>
      </Space>

      <Space>
        <Button block onClick={onClose} style={{ fontWeight: 600 }}>
          Batal
        </Button>
        <Button
          block
          style={{ fontWeight: 600 }}
          type="primary"
          onClick={() => okHandler(selectedReport?.id, selectedStatusID, desc)}
          disabled={loading}
        >
          Ubah status
        </Button>
      </Space>
    </Space>
  );
}
