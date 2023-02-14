import { Card, Checkbox, Collapse, Space } from "antd";
import React from "react";

function HomeMapFIlterThematic2({ surveys }) {
  return (
    <Card
      style={{ background: "white" }}
      bodyStyle={{ overflow: "scroll", height: "calc(100vh - 210px)" }}
      title="Tematik"
      size="small"
    >
      <Space direction="vertical" size={12}>
        <Collapse>
          <Collapse.Panel header="Nama surveynya. text">
            <Checkbox.Group style={{ width: "100%" }}>
              <Space direction="vertical" size="small">
                <Checkbox value="A">Pertanyaan yang panjang banget woelah bangggggg</Checkbox>
                <Checkbox value="B">B</Checkbox>
                <Checkbox value="C">C</Checkbox>
                <Checkbox value="D">D</Checkbox>
                <Checkbox value="E">E</Checkbox>
              </Space>
            </Checkbox.Group>
          </Collapse.Panel>
        </Collapse>
        <Collapse>
          <Collapse.Panel header="Nama surveynya. text">
            <Checkbox.Group style={{ width: "100%" }}>
              <Space direction="vertical" size="small">
                <Checkbox value="A">Pertanyaan yang panjang banget woelah bangggggg</Checkbox>
                <Checkbox value="B">B</Checkbox>
                <Checkbox value="C">C</Checkbox>
                <Checkbox value="D">D</Checkbox>
                <Checkbox value="E">E</Checkbox>
              </Space>
            </Checkbox.Group>
          </Collapse.Panel>
        </Collapse>
        <Collapse>
          <Collapse.Panel header="Nama surveynya. text">
            <Checkbox.Group style={{ width: "100%" }}>
              <Space direction="vertical" size="small">
                <Checkbox value="A">Pertanyaan yang panjang banget woelah bangggggg</Checkbox>
                <Checkbox value="B">B</Checkbox>
                <Checkbox value="C">C</Checkbox>
                <Checkbox value="D">D</Checkbox>
                <Checkbox value="E">E</Checkbox>
              </Space>
            </Checkbox.Group>
          </Collapse.Panel>
        </Collapse>
        <Collapse>
          <Collapse.Panel header="Nama surveynya. text">
            <Checkbox.Group style={{ width: "100%" }}>
              <Space direction="vertical" size="small">
                <Checkbox value="A">Pertanyaan yang panjang banget woelah bangggggg</Checkbox>
                <Checkbox value="B">B</Checkbox>
                <Checkbox value="C">C</Checkbox>
                <Checkbox value="D">D</Checkbox>
                <Checkbox value="E">E</Checkbox>
              </Space>
            </Checkbox.Group>
          </Collapse.Panel>
        </Collapse>
      </Space>
    </Card>
  );
}

export default HomeMapFIlterThematic2;
