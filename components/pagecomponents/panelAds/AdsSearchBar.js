import { Button, Card, Col, DatePicker, Modal, Row, Select } from "antd";
const { RangePicker } = DatePicker;

export default function AdsSearchBar({
  groupData,
  selectGroupHandler,
  selectTopicHandler,
  selectDateHandler,
  selectedGroupData,
  addSurveyHandler,
}) {
  const groupList = [{}];
  console.log("group data", groupData);
  groupData.forEach((value, index) => {
    groupList[index] = {
      value: value.id,
      label: value.name,
    };
  });

  const topicList = [{}];
  if (selectedGroupData != "") {
    const temp = groupData.find((value) => value.id == selectedGroupData);
    temp.keywords.forEach((value, index) => {
      topicList[index] = {
        value: value.id,
        label: value.name,
      };
    });
  }

  return (
    <Row justify="space-between">
      <Col span={18}>
        <Row gutter={16}>
          <Col span={8}>
            <Select
              placeholder={"Pilih Group..."}
              style={{ width: "100%" }}
              onChange={selectGroupHandler}
              options={groupList}
            />
          </Col>
          <Col span={8}>
            <Select
              placeholder={"Pilih Topik..."}
              style={{ width: "100%" }}
              onChange={selectTopicHandler}
              options={topicList}
            />
          </Col>
          <Col span={8}>
            <RangePicker
              style={{ width: "100%" }}
              placeholder={["Tanggal Awal", "Tanggal Akhir"]}
              onChange={selectDateHandler}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
