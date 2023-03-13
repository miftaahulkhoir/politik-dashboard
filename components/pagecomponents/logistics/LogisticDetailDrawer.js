import { Col, Drawer, Grid, Image, Row, Space } from "antd";
import { useEffect, useMemo, useState } from "react";
import { TbCalendar, TbMapPin, TbUser } from "react-icons/tb";

import { reverseGeocoding } from "../../../utils/services/locations";

export default function LogisticDetailDrawer({ open = true, setOpen, selectedLogistic, apiNotification }) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const onClose = () => {
    setOpen(false);
  };

  const formattedDate = useMemo(() => {
    if (!selectedLogistic?.updated_at) return "";
    const date = new Date(selectedLogistic?.updated_at);
    const formatted = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
    return formatted;
  }, [selectedLogistic?.updated_at]);

  const [location, setLocation] = useState("");
  useEffect(() => {
    reverseGeocoding(selectedLogistic?.latitude, selectedLogistic?.longitude).then((res) => setLocation(res));
  }, [selectedLogistic]);

  return (
    <Drawer
      title="Detail Logistik"
      placement="right"
      onClose={onClose}
      open={open}
      closable={true}
      width={isSM ? "100%" : "500px"}
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Space direction="vertical" size="large">
        <Section title="Logistik">
          <div style={{ marginBottom: "4px", fontWeight: 600 }}>{selectedLogistic?.name}</div>
          <div style={{ color: "#7287A5" }}>
            {selectedLogistic?.id} · {selectedLogistic?.category?.name}
          </div>
        </Section>

        <Section title="Detail logistik">
          <Space direction="vertical" style={{ width: "100%", color: "#7287A5" }} size={12}>
            {selectedLogistic?.image_logistic && (
              <Image src={selectedLogistic?.image_logistic} alt="Foto tidak tersedia" style={{ width: "100%" }} />
            )}
            <Row wrap={false} gutter={8} align="middle">
              <Col>
                <TbUser size={24} />
              </Col>
              <Col flex={1}>{selectedLogistic?.user?.name}</Col>
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
