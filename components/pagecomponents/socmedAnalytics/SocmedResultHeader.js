import { Col, Row, Space, Typography } from "antd";
import { useMemo } from "react";

export default function SocmedResultHeader({ socmed }) {
  const date = useMemo(() => {
    try {
      const createdAt = new Date(socmed.created_at);
      const formatted = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(createdAt);

      return formatted;
    } catch (error) {
      return "";
    }
  }, [socmed]);

  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={3} style={{ marginBottom: "16px" }}>
          {socmed?.socmed_name}
        </Typography.Title>
      </Col>
      <Col span={15}>
        <Space direction="vertical" size="0px">
          <Typography.Title level={5}>{socmed?.total_respondent} responden</Typography.Title>
          <Typography.Text style={{ color: "#7287A5" }}>{date}</Typography.Text>
        </Space>
      </Col>
    </Row>
  );
}
