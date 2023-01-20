import { Card, Col, Divider, Input, Row, Select, Typography } from 'antd';
import { useCallback, useMemo } from 'react';
import defaultSurveyQuestion from '../../../utils/constants/defaultSurveyQuestion';
import DropdownInputEditable from '../../elements/input/DropdownInputEditable';
import MultiRadioEditable from '../../elements/input/MultiRadioEditable';

export default function SurveyFormCard({ index, questions, setQuestions }) {
  const type = useMemo(() => {
    return questions[index].input_type;
  }, [questions]);

  const labels = useMemo(() => {
    return questions[index]?.options?.map((option) => option.option_name);
  }, [questions]);

  const setLabels = useCallback(
    (values) => {
      const newQuestions = [...questions];
      newQuestions[index].options = values?.map((value) => ({
        option_name: value,
      }));
      setQuestions([...newQuestions]);
    },
    [questions]
  );

  const formElement = useMemo(() => {
    if (type === 'text') return <Input value="Isian Singkat" disabled />;
    if (type === 'long_text')
      return <Input.TextArea value="Paragraf" disabled />;
    if (type === 'dropdown')
      return <DropdownInputEditable labels={labels} setLabels={setLabels} />;
    if (type === 'radio_button')
      return <MultiRadioEditable labels={labels} setLabels={setLabels} />;
  }, [type, labels, setLabels]);

  return (
    <Card style={{ margin: '24px' }}>
      <Row gutter={32}>
        <Col span={16}>
          <Typography.Title level={5}>Pertanyaan</Typography.Title>
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
        <Col span={8}>
          <Typography.Title level={5}>Jenis jawaban</Typography.Title>
          <Select
            defaultValue="text"
            style={{ width: '160px' }}
            options={[
              {
                value: 'text',
                label: 'Isian Singkat',
              },
              {
                value: 'long_text',
                label: 'Paragraf',
              },
              {
                value: 'dropdown',
                label: 'Dropdown',
              },
              {
                value: 'radio_button',
                label: 'Pilihan Ganda',
              },
            ]}
            value={type}
            onChange={(value) => {
              const newQuestions = [...questions];
              newQuestions[index].input_type = value;
              newQuestions[index].options =
                defaultSurveyQuestion[value].options;
              setQuestions([...newQuestions]);
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={32}>
        <Col span={16}>{formElement}</Col>
      </Row>
    </Card>
  );
}
