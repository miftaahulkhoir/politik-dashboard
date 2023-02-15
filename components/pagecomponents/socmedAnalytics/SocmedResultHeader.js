import { Col, Row, Space, Typography } from "antd";
import { useMemo } from "react";

export default function SocmedResultHeader({ data, socmedType }) {
  const date = useMemo(() => {
    try {
      const createdAt = new Date(data.analytics.created);
      const formatted = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(createdAt);

      return formatted;
    } catch (error) {
      return "";
    }
  }, [data]);

  if (socmedType == "twitter") {
    return (
      <Row>
        <Col span={24}>
          <Typography.Title level={3} style={{ marginBottom: "16px" }}>
            {data?.analytics.name}
          </Typography.Title>
        </Col>
        <Col span={15}>
          <Space direction="vertical" size="0px">
            <Typography.Title level={5}>@{data?.analytics.username}</Typography.Title>
            <Typography.Title level={5}>
              Followers: {data?.analytics.followersCount} | Following: {data?.analytics.favoritesCount}
            </Typography.Title>
            <Typography.Text style={{ color: "#7287A5" }}>Bergabung: {date}</Typography.Text>
          </Space>
        </Col>
      </Row>
    );
  } else if (socmedType == "facebook") {
    return (
      <Row>
        <Col span={24}>
          <Typography.Title level={3} style={{ marginBottom: "16px" }}>
            {data?.analytics.name}
          </Typography.Title>
        </Col>
        <Col span={15}>
          <Space direction="vertical" size="0px">
            <Typography.Title level={5}>
              Followers: {data?.analytics.followersCount} | Following: {data?.analytics.fanCount}
            </Typography.Title>
          </Space>
        </Col>
      </Row>
    );
  }
}
