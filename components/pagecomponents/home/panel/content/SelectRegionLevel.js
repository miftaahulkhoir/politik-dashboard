import { Card, Radio, Space } from "antd";

export default function SelectRegionLevel({ regionState }) {
  return (
    <Card
      style={{ background: "white" }}
      bodyStyle={{ overflow: "scroll", maxHeight: "calc(100vh - 200px)" }}
      title="Persebaran"
      size="small"
    >
      <Radio.Group
        style={{ width: "100%" }}
        value={regionState?.selectedRegionLevel}
        onChange={(e) => regionState?.setSelectedRegionLevel(e.target.value)}
      >
        <Space direction="vertical" size="small">
          <Radio value={1}>Kelurahan</Radio>
          <Radio value={2}>Kecamatan</Radio>
        </Space>
      </Radio.Group>
    </Card>
  );
}
