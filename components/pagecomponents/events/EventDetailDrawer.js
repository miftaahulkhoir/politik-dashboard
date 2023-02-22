import { Drawer, Grid, Image, List, Space } from "antd";
import { useMemo } from "react";

import formateDateTime from "../../../utils/helpers/formatDateTime";

export default function EventDetailDrawer({ open, setOpen, selectedEvent, setEvents, apiNotification }) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const onClose = () => {
    setOpen(false);
  };

  const formatTime = (date) => {
    try {
      return formateDateTime(date, {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const formatDate = (date) => {
    try {
      return formateDateTime(date, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

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
        <Section title="Informasi kegiatan">
          <Space direction="vertical" size="middle">
            <Image src={selectedEvent?.image_url} alt="foto kegiatan" style={{ borderRadius: "16px" }}></Image>
            <Space direction="vertical">
              <div style={{ fontSize: "14px", fontWeight: 600 }}>{selectedEvent?.event_name}</div>
              <div style={{ fontSize: "12px", color: "#7287A5" }}>{selectedEvent?.description}</div>
            </Space>
            <Section title="Narahubung">{selectedEvent?.contact_person}</Section>
            <Section title="Periode kegiatan">
              <Space>
                <div>
                  <div>{formatDate(selectedEvent?.date_start)}</div>
                  <div style={{ color: "#7287A5" }}>{formatTime(selectedEvent?.date_start)}</div>
                </div>
                <div>-</div>
                <div>
                  <div>{formatDate(selectedEvent?.date_end)}</div>
                  <div style={{ color: "#7287A5" }}>{formatTime(selectedEvent?.date_end)}</div>
                </div>
              </Space>
            </Section>
            <Section title="Link">
              <a href={selectedEvent?.link} target="_blank" rel="noreferrer">
                {selectedEvent?.link}
              </a>
            </Section>
          </Space>
        </Section>

        <Section title="Daftar partisipan">
          <List
            size="small"
            // bordered
            dataSource={["Lutfi Andriyanto", "Muhammad Yuridenta Aulia Dzakidhanu", "Masih hardcode"]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
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
