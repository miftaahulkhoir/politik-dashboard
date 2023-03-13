import { Button, Col, DatePicker, Row, Select } from "antd";
import { TbPencil } from "react-icons/tb";

const { RangePicker } = DatePicker;

export default function SearchBar({
  groupData,
  selectedGroup,
  selectGroupHandler,
  selectedTopic,
  selectTopicHandler,
  selectDateHandler,
  selectedGroupData,
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
  if (selectedGroupData != null) {
    const temp = groupData.find((value) => value.id == selectedGroupData);
    temp.keywords.forEach((value, index) => {
      // remove if else, and use else when mediatoolkit account is activated
      if (value.id === 6610527) {
        topicList[index] = {
          value: value.id,
          label: "anies",
        };
      } else {
        topicList[index] = {
          value: value.id,
          label: value.name,
        };
      }
    });
  }

  // console.log("yes", selectedGroup.keywords);
  // selectedGroup.keywords.forEach((value, index) => {
  //   console.log(value.id, value.name);
  //   topicList[index].value = value.id
  //   topicList[index].label = value.name
  // })

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
              value={selectedGroup}
            />
          </Col>
          <Col span={8}>
            <Select
              placeholder={"Pilih Topik..."}
              style={{ width: "100%" }}
              onChange={selectTopicHandler}
              options={topicList}
              value={selectedTopic}
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
