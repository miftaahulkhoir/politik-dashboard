import { Card, Col, Divider, Input, Row, Select, Typography } from "antd";
import { useCallback, useMemo } from "react";

import defaultSurveyQuestion from "../../../utils/constants/defaultSurveyQuestion";
import DropdownInputEditable from "../../elements/input/DropdownInputEditable";
import MultiRadioEditable from "../../elements/input/MultiRadioEditable";
import YesNoQuestion from "../../elements/input/YesNoQuestion";

export default function SurveyFormCard({ index, questions, setQuestions, isSM }) {
  const type = useMemo(() => {
    return questions[index].input_type;
  }, [index, questions]);

  const labels = useMemo(() => {
    return questions[index]?.options?.map((option) => option.option_name);
  }, [index, questions]);

  const setLabels = useCallback(
    (values) => {
      const newQuestions = [...questions];
      newQuestions[index].options = values?.map((value) => ({
        option_name: value,
      }));
      setQuestions([...newQuestions]);
    },
    [index, questions, setQuestions],
  );

  const formElement = useMemo(() => {
    if (type === "text") return <Input value="Isian Singkat" disabled />;
    if (type === "long_text") return <Input.TextArea value="Paragraf" disabled />;
    if (type === "dropdown") return <DropdownInputEditable labels={labels} setLabels={setLabels} />;
    if (type === "radio_button") return <MultiRadioEditable labels={labels} setLabels={setLabels} />;
    if (type === "yes_no_question") return <YesNoQuestion labels={labels} setLabels={setLabels} />;
    if (type === "location") return <Input value="Kabupaten/Kota, Kecamatan, Desa/Kelurahan" disabled />;
  }, [type, labels, setLabels]);

  return (
    <Card style={{ margin: "24px" }}>
      <Row style={{ gap: "16px", flexDirection: isSM ? "column-reverse" : "row" }}>
        <Col span={isSM ? 24 : 16}>
          <Typography.Title level={5}>Keyword</Typography.Title>
          <Input.TextArea
            rows={2}
            value={questions[index].question_name}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].question_name = e.target.value;
              setQuestions([...newQuestions]);
            }}
          />
        </Col>
        <Col span={isSM ? 24 : 8}>
          <Typography.Title level={5}>Jenis Jawaban</Typography.Title>
          <Select
            defaultValue="text"
            style={{ width: "160px" }}
            options={[
              {
                value: "text",
                label: "Isian Singkat",
              },
              {
                value: "long_text",
                label: "Paragraf",
              },
              {
                value: "dropdown",
                label: "Dropdown",
              },
              {
                value: "radio_button",
                label: "Pilihan Ganda",
              },
              {
                value: "yes_no_question",
                label: "Ya dan Tidak",
              },
              {
                value: "location",
                label: "Lokasi",
              },
            ]}
            value={type}
            onChange={(value) => {
              const newQuestions = [...questions];
              newQuestions[index].input_type = value;
              newQuestions[index].options = defaultSurveyQuestion[value].options;
              setQuestions([...newQuestions]);
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={32}>
        <Col span={isSM ? 24 : 16}>{formElement}</Col>
      </Row>
    </Card>
  );
}
