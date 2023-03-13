import { Space, Typography } from "antd";

export default function LegendItem({ color, text, isSelected, onClick }) {
  const selectedTextStyles = {
    color: isSelected ? color : undefined,
    fontWeight: isSelected ? 800 : undefined,
    textDecoration: isSelected ? "underline" : undefined,
  };
  return (
    <Space
      style={{
        flexDirection: "row-reverse",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div
        style={{
          borderRadius: "4px",
          background: color,
          width: "30px",
          height: "20px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      />
      <Typography.Paragraph
        ellipsis={{ rows: 2, suffix: "" }}
        style={{
          margin: "0",
          ...(isSelected ? selectedTextStyles : {}),
        }}
      >
        {text}
      </Typography.Paragraph>
    </Space>
  );
}
