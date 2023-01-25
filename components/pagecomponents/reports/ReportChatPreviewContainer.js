import { Space } from "antd";

import ReportChatPreviewItem from "./ReportChatPreviewItem";

export default function ReportChatPreviewContainer({ reports, selectedReport, setSelectedReport }) {
  return (
    <Space style={{ width: "100%" }} size={0} direction="vertical">
      {reports.map((report) => (
        <ReportChatPreviewItem
          key={report?.id}
          chat={report?.content}
          name={report?.sender_name}
          time={report?.updated_at}
          numOfUnreadChat={2}
          topic={report?.title}
          onClick={() => setSelectedReport(report)}
          active={report?.id === selectedReport?.id}
        />
      ))}
    </Space>
  );
}
