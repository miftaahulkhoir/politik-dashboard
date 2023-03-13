import { Button, Col, Drawer, Grid, Image, Modal, Row, Space } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TbCalendar, TbMapPin, TbUser } from "react-icons/tb";

import ReportChangeStatusModal from "./ReportChangeStatusModal";
import ReportStatusPill from "./ReportStatusPill";

import { reverseGeocoding } from "../../../utils/services/locations";
import { useFindAllReportStatuses } from "../../../utils/services/reports";

export default function ReportDetailDrawer({ open = true, setOpen, selectedReport, setReports, apiNotification }) {
  const screen = Grid.useBreakpoint();
  const { statuses } = useFindAllReportStatuses();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

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

  const onChangeStatusClick = useCallback(
    (report) => {
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
            statuses={statuses}
          />
        ),
      });
    },
    [apiNotification, statuses, setReports],
  );

  const [location, setLocation] = useState("");
  useEffect(() => {
    reverseGeocoding(selectedReport?.latitude, selectedReport?.longitude).then((res) => setLocation(res));
  }, [selectedReport]);

  return (
    <Drawer
      title="Detail Pengaduan"
      placement="right"
      onClose={onClose}
      open={open}
      closable={true}
      width={isSM ? "100%" : "500px"}
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Space direction="vertical" size="large">
        <Section title="Status:" horizontal>
          <Space direction="vertical" size={8}>
            <ReportStatusPill id={selectedReport?.complaint_status?.id || "0"} />
            {selectedReport?.complaint_status_desc ? (
              <div
                style={{
                  padding: "4px 12px",
                  borderRadius: "6px",
                  border: "1px solid #eeeeee",
                  flex: 1,
                }}
              >
                {selectedReport?.complaint_status_desc}
              </div>
            ) : null}
            <Button type="link" style={{ margin: 0, padding: 0 }} onClick={() => onChangeStatusClick(selectedReport)}>
              {selectedReport?.complaint_status?.id == 2 ? "Ubah catatan" : "Ubah status"}
            </Button>
          </Space>
        </Section>

        <Section title="Pengaduan">
          <div style={{ marginBottom: "4px", fontWeight: 600 }}>{selectedReport?.title}</div>
          <div style={{ color: "#7287A5" }}>{selectedReport?.content}</div>
        </Section>

        <Section title="Detail pengaduan">
          <Space direction="vertical" style={{ width: "100%", color: "#7287A5" }} size={12}>
            {selectedReport?.link_image && (
              <Image src={selectedReport?.link_image} alt="Foto tidak tersedia" style={{ width: "100%" }} />
            )}
            <Row wrap={false} gutter={8} align="middle">
              <Col>
                <TbUser size={24} />
              </Col>
              <Col flex={1}>{selectedReport?.sender_name}</Col>
            </Row>
            <Row wrap={false} gutter={8} align="middle">
              <Col>
                <TbMapPin size={24} />
              </Col>
              <Col flex={1}>{location}</Col>
            </Row>
            <Row wrap={false} gutter={8} align="middle">
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
