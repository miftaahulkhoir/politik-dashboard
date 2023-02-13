import { Button, Card, Select, Space } from "antd";

import thematicTypes from "../../../../utils/constants/thematicTypes";

export default function HomeMapFilterThematic({
  className,
  thematicType,
  setThematicType,
  surveys,
  surveyID,
  setSurveyID,
  questions,
  questionID,
  setQuestionID,
}) {
  return (
    <Card size="small" title="Tematik" className={className}>
      <Space direction="vertical">
        <Select
          showSearch
          placeholder="Tipe"
          value={thematicType}
          onChange={(value) => {
            setThematicType(value);
          }}
          style={{ width: "100%" }}
          dropdownMatchSelectWidth={false} // jadi ngeglitch saat select
          filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          options={Object.keys(thematicTypes).map((typeID) => ({ label: thematicTypes[typeID].name, value: typeID }))}
        />

        {thematicType == 1 ? (
          <>
            <Select
              showSearch
              placeholder="Pilih survei"
              value={surveyID}
              onChange={(value) => {
                setSurveyID(value);
              }}
              style={{ width: "100%" }}
              dropdownMatchSelectWidth={false} // jadi ngeglitch saat select
              dropdownStyle={{ maxWidth: "400px" }}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={surveys?.map((survey) => ({ label: survey?.survey_name, value: survey?.id }))}
            />
            <Select
              showSearch
              placeholder="Pilih pertanyaan"
              value={questionID}
              onChange={(value) => {
                setQuestionID(value);
              }}
              disabled={!surveyID}
              style={{ width: "100%" }}
              dropdownMatchSelectWidth={false} // jadi ngeglitch saat select
              dropdownStyle={{ maxWidth: "400px" }}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={questions
                ?.filter((question) => ["yes_no_question", "radio_button", "dropdown"].includes(question?.input_type))
                .map((question) => ({ label: question?.question_name, value: question?.id }))}
            />
          </>
        ) : null}

        <Button
          size="small"
          type="link"
          onClick={() => {
            setThematicType(null);
            setSurveyID(null);
            setQuestionID(null);
          }}
        >
          Hapus filter
        </Button>
      </Space>
    </Card>
  );
}
