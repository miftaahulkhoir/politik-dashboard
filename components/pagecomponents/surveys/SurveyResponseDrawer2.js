import { Drawer, Space } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './surveyResult.module.css';

export default function SurveyResponseDrawer2({
  open,
  setOpen,
  selectedResponse,
}) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!selectedResponse?.id || !open) return;
    axios
      .get(`/api/response/${selectedResponse.id}`)
      .then((res) => {
        console.log('ans', res.data.data.answers);
        const anss = res.data.data.answers;
        const answers = anss.map((ans) => {
          return {
            question: ans.question.question_name,
            answer: 'coba answer bangggg heheheheh eheheh mantap',
          };
        });
        setAnswers([...answers]);
      })
      .catch((err) => {});
  }, [selectedResponse, open]);

  return (
    <Drawer
      title={selectedResponse?.id}
      placement="right"
      closable={false}
      width="50%"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Space direction="vertical" size="large">
        {answers.map((ans) => (
          <div>
            <div>{ans.question}</div>
            <div className={styles.ans_answer}>{ans.answer}</div>
          </div>
        ))}
      </Space>
    </Drawer>
  );
}
