import { Space } from "antd";

import ReportChatPreviewItem from "./ReportChatPreviewItem";

export default function ReportChatPreviewContainer() {
  return (
    <Space style={{ width: "100%" }} size="small" direction="vertical">
      <ReportChatPreviewItem
        chat="Lorem ipsum dolor sit down be humaj;lsdfj asdfjaskodfj oaisdjfoasidjf oiasdhfasdjfoasjdfoasidjfo jas"
        name="Ananda Pratama"
        time={new Date()}
        numOfUnreadChat={2}
        topic="Penyalahgunaan logistik"
      />

      <ReportChatPreviewItem
        chat="Lorem ipsum dolor sit down be hum..."
        name="Ananda Pratama"
        time={new Date()}
        numOfUnreadChat={2}
        topic="Penyalahgunaan logistik"
      />

      <ReportChatPreviewItem
        chat="Lorem ipsum dolor sit down be hum..."
        name="Ananda Pratama"
        time={new Date()}
        numOfUnreadChat={2}
        topic="Penyalahgunaan logistik"
      />
    </Space>
  );
}
