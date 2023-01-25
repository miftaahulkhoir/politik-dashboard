import { Avatar, Col, Row } from "antd";
import { useMemo } from "react";
import { TbDotsVertical } from "react-icons/tb";

export default function ReportChatHeader({ name = "" }) {
  const shortName = useMemo(() => {
    const words = name.toUpperCase().split(" ");
    if (words.length === 0) return "";
    if (words.length === 1) return words[0][0];
    return words[0][0] + words[1][0];
  }, [name]);

  return (
    <Row align="middle" gutter={8} style={{ padding: "16px", borderBottom: "1px solid #EEEEEE" }}>
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
      <Col flex={1} style={{ fontSize: "18px", fontWeight: 600 }}>
        {name}
      </Col>
      <Col>
        <TbDotsVertical size={20} />
      </Col>
    </Row>
  );
}
