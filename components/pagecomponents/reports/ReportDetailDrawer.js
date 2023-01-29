import { Button, Col, Drawer, Modal, Row, Space } from "antd";
import { useMemo } from "react";
import { TbCalendar } from "react-icons/tb";

import ReportChangeStatusModal from "./ReportChangeStatusModal";
import ReportStatusPill from "./ReportStatusPill";

export default function ReportDetailDrawer({ open = true, setOpen, selectedReport, setReports, apiNotification }) {
  const onClose = () => {
    setOpen(false);
  };

  const formattedDate = useMemo(() => {
    if (!selectedReport?.created_at) return "";
    const date = new Date(selectedReport?.created_at);
    const formatted = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
    return formatted;
  }, [selectedReport?.created_at]);

  const onChangeStatusClick = (report) => {
    const modal = Modal.confirm();
    modal.update({
      icon: null,
      footer: null,
      maskClosable: true,
      width: "500px",
      bodyStyle: {
        width: "100%",
      },
      content: (
        <ReportChangeStatusModal
          selectedReport={report}
          onClose={() => modal.destroy()}
          setReports={setReports}
          apiNotification={apiNotification}
        />
      ),
    });
  };

  return (
    <Drawer
      title="Detail Pengaduan"
      placement="right"
      onClose={onClose}
      open={open}
      closable={false}
      width="500px"
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Space direction="vertical" size="large">
        <Section title="Status:" horizontal>
          <Space direction="vertical" size={4}>
            <ReportStatusPill id={selectedReport?.complaint_status?.id || "0"} />
            {selectedReport?.complaint_status?.id != 2 && (
              <Button type="link" style={{ margin: 0, padding: 0 }} onClick={() => onChangeStatusClick(selectedReport)}>
                Ubah status
              </Button>
            )}
          </Space>
        </Section>

        <Section title="Pengaduan">
          <div style={{ marginBottom: "4px", fontWeight: 600 }}>{selectedReport?.title}</div>
          <div style={{ color: "#7287A5" }}>{selectedReport?.content}</div>
        </Section>

        <Section title="Detail pengaduan">
          <Space direction="vertical" style={{ width: "100%", color: "#7287A5" }} size={12}>
            <img src={selectedReport?.link_image} alt="gambar pengaduan" style={{ width: "100%" }} />
            {/* <Row gutter={8} align="middle">
              <Col>
                <TbMapPin size={24} />
              </Col>
              <Col flex={1}>{selectedReport?.address || "Tidak mengirimkan lokasi"}</Col>
            </Row> */}
            <Row gutter={8} align="middle">
              <Col>
                <TbCalendar size={24} />
              </Col>
              <Col flex={1}>{formattedDate}</Col>
            </Row>
          </Space>
        </Section>
      </Space>
    </Drawer>
  );
}

function Section({ children, title, horizontal = false }) {
  return (
    <Space direction={horizontal ? "horizontal" : "vertical"} style={{ width: "100%", alignItems: "baseline" }}>
      <div style={{ fontSize: "12px", fontWeight: 600, color: "#7287A5" }}>{title}</div>
      <div>{children}</div>
    </Space>
  );
}
