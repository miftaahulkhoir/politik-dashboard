import { Col, Divider, Radio, Row, Space } from "antd";

export default function MultiRadioButton({ inputs = [], value, setValue }) {
  // inputs: Array<{ label: string, value: string }>

  return (
    <>
      <Space
        direction="vertical"
        size={0}
        style={{
          width: "100%",
          border: "1px solid #EEEEEE",
          borderRadius: "8px",
        }}
      >
        <Radio.Group value={value} onChange={(e) => setValue(e.target.value)} style={{ width: "100%" }}>
          {inputs.map((input, index) => (
            <div key={index}>
              <Row justify="space-between" align="middle" style={{ padding: "8px 16px" }}>
                <Col span={24}>
                  <Radio value={input?.value}>{input?.label}</Radio>
                </Col>
              </Row>
              {index < inputs.length - 1 ? <Divider style={{ margin: "0", width: "100%" }}></Divider> : null}
            </div>
          ))}
        </Radio.Group>
      </Space>
    </>
  );
}
