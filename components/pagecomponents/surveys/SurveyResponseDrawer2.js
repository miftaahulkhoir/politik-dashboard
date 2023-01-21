import { Drawer, Space } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './surveyResponse.module.css';

export default function SurveyResponseDrawer2({
  open,
  setOpen,
  selectedResponse,
}) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!selectedResponse?.id || !open) return;
    console.log('sss', selectedResponse);
    axios
      .get(`/api/response/${selectedResponse.id}`)
      .then((res) => {
        console.log('ans', res.data.data.answers);
        const anss = res.data.data.answers;
        const answers = anss.map((ans) => {
          return {
            id: ans.id,
            question: ans.question.question_name,
            answer: ans.answer,
          };
        });
        setAnswers([...answers]);
      })
      .catch((err) => {});
  }, [selectedResponse, open]);

  return (
    <Drawer
      title={selectedResponse?.respondent || selectedResponse?.id}
      placement="right"
      closable={false}
      width="50%"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {answers.map((ans) => (
          <div key={ans.id}>
            <div>{ans.question}</div>
            <div className={styles.ans_answer}>{ans.answer}</div>
          </div>
        ))}
      </Space>
    </Drawer>
  );
}
