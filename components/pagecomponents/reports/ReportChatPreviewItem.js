import { Avatar, Col, Row, Space } from "antd";
import { useMemo } from "react";

import hhmm from "../../../utils/helpers/date/hhmm";

export default function ReportChatPreviewItem({ name, time, chat, numOfUnreadChat, topic }) {
  const shortName = useMemo(() => {
    const words = name.toUpperCase().split(" ");
    if (words.length === 0) return "";
    if (words.length === 1) return words[0][0];
    return words[0][0] + words[1][0];
  }, [name]);

  const slicedChat = useMemo(() => {
    const n = 35;
    if (chat?.length > n) {
      return chat.slice(0, n - 3) + "...";
    }
    return chat;
  }, [chat]);

  const formattedTime = useMemo(() => {
    return hhmm(time);
  }, [time]);

  return (
    <Space direction="vertical" style={{ width: "100%", padding: "16px 0" }}>
      <Row gutter={8} align="middle">
        <Col>
          <Avatar
            size="large"
            style={{
              color: "black",
              backgroundColor: "white",
              border: "1px solid #eeeeee",
              fontWeight: 600,
            }}
          >
            {shortName}
          </Avatar>
        </Col>
        <Col flex={1}>
          <Row justify="space-between">
            <Col style={{ fontWeight: 600, fontSize: "16px" }}>{name}</Col>
            <Col style={{ fontWeight: 600, color: "#7287A5" }}>{formattedTime}</Col>
          </Row>
          <Row style={{ color: "#7287A5" }}>{slicedChat}</Row>
        </Col>
      </Row>
      <Row>
        <Col>Pengaduan: {topic}</Col>
      </Row>
    </Space>
  );
}
