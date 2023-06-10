import { Card, Typography } from "antd";

export default function SurveyChartCard({ title, children, fitTitleHeight = false }) {
  return (
    <Card
      size="small"
      style={{
        padding: "0",
        // maxHeight: "490px",
        overflow: "auto",
        position: "relative",
      }}
      bodyStyle={{
        paddingTop: "0",
      }}
    >
      <Typography.Title
        level={5}
        style={{
          fontWeight: 600,
          minHeight: fitTitleHeight ? "0px" : "5em",
          height: fitTitleHeight ? "auto" : "max-content",
          background: "white",
          position: "sticky",
          top: "0px",
          padding: "16px 0",
          zIndex: 9,
        }}
      >
        {title}
      </Typography.Title>

      <div
        style={{
          // maxHeight: "330px",
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </Card>
  );
}
