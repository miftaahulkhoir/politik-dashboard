import { Card, Radio, Space, ConfigProvider } from "antd";

export default function SelectRegionLevel({ regionState }) {
  return (
    <Card
      style={{
        background: "white",
        minWidth: "360px",
        display: "flex",
        justifyContent: "center",
        marginBottom: "12px",
      }}
      bodyStyle={{ padding: "16px 20px" }}
    >
      <Space align="center" size={40}>
        Pulau Jawa
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#E12424",
            },
          }}
        >
          <Radio.Group
            style={{ width: "100%" }}
            value={regionState?.selectedRegionLevel}
            onChange={(e) => regionState?.setSelectedRegionLevel(e.target.value)}
            buttonStyle="solid"
          >
            <Space.Compact block direction="horizontal" size="small">
              <Radio.Button value={1}>Kelurahan</Radio.Button>
              <Radio.Button value={2}>Kecamatan</Radio.Button>
            </Space.Compact>
          </Radio.Group>
        </ConfigProvider>
      </Space>
    </Card>
  );
}
