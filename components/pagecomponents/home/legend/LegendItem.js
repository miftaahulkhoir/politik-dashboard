import { Space, Typography } from "antd";

export default function LegendItem({ color, text }) {
  return (
    <Space style={{ flexDirection: "row-reverse", alignItems: "center" }}>
      <div
        style={{
          borderRadius: "4px",
          background: color,
          width: "30px",
          height: "20px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      />
      <Typography.Paragraph ellipsis={{ rows: 2, suffix: "" }} style={{ margin: "0" }}>
        {text}
      </Typography.Paragraph>
    </Space>
  );
}
