import { Drawer, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./surveyResponse.module.css";

export default function SurveyResponseDrawer2({ open, setOpen, selectedResponse, isSM }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!selectedResponse?.id || !open) return;
    axios
      .get(`/api/response/${selectedResponse.id}`)
      .then((res) => {
        const anss = res.data.data.answers;
        const answers = anss.map((ans) => {
          return {
            id: ans.id,
            question: ans?.question?.question_name,
            answer: ans?.answer,
            questionType: ans?.question?.input_type,
          };
        });
        setAnswers([...answers]);
      })
      .catch((err) => {});
  }, [selectedResponse, open]);

  const answerText = (answer) => {
    if (answer.questionType === "location") return answer.answer.reverse().join(", ");
    return answer.answer;
  };

  return (
    <Drawer
      title={selectedResponse?.respondent || selectedResponse?.id}
      placement="right"
      closable={true}
      width={isSM ? "100%" : "600px"}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {answers.map((ans) => (
          <div key={ans.id}>
            <div className={styles.ans_title}>{ans.question}</div>
            <div className={styles.ans_answer}>{answerText(ans)}</div>
          </div>
        ))}
      </Space>
    </Drawer>
  );
}
