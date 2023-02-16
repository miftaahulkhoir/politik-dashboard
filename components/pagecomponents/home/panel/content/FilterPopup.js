import { Button, Card, Checkbox, Collapse, Space } from "antd";

function FilterPopup() {
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px", minWidth: "320px" }}>
      <Card
        style={{ background: "white" }}
        bodyStyle={{ overflow: "scroll", maxHeight: "calc(100vh - 200px)" }}
        title="Persebaran"
        size="small"
      >
        <Checkbox.Group style={{ width: "100%" }}>
          <Space direction="vertical" size={12}>
            <Collapse defaultActiveKey={[1]}>
              <Collapse.Panel header="Pengguna" key={1}>
                <Space direction="vertical" size="small">
                  <Checkbox value="1">Koordinator</Checkbox>
                  <Checkbox value="2">Relawan</Checkbox>
                  <Checkbox value="3">Pemilih</Checkbox>
                  <Checkbox value="4">Daftar hitam</Checkbox>
                </Space>
              </Collapse.Panel>
            </Collapse>
          </Space>
        </Checkbox.Group>
      </Card>
      <Button type="primary" block>
        Petakan
      </Button>
    </div>
  );
}

export default FilterPopup;
