import { Col, Drawer, Row, Space } from "antd";
import { useMemo } from "react";
import { TbCalendar, TbMapPin } from "react-icons/tb";

export default function ReportDetailDrawer({ open = true, setOpen, selectedReport }) {
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
        <Section title="Pengaduan">
          <div style={{ marginBottom: "4px", fontWeight: 600 }}>{selectedReport?.title}</div>
          <div style={{ color: "#7287A5" }}>{selectedReport?.content}</div>
        </Section>

        <Section title="Detail pengaduan">
          <Space direction="vertical" style={{ width: "100%", color: "#7287A5" }} size={12}>
            <img src={selectedReport?.link_image} alt="gambar pengaduan" style={{ width: "100%" }} />
            <Row gutter={8} align="middle">
              <Col>
                <TbMapPin size={24} />
              </Col>
              <Col flex={1}>{selectedReport?.address || "Tidak mengirimkan lokasi"}</Col>
            </Row>
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

function Section({ children, title }) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <div style={{ fontSize: "12px", fontWeight: 600, color: "#7287A5" }}>{title}</div>
      <div>{children}</div>
    </Space>
  );
}
