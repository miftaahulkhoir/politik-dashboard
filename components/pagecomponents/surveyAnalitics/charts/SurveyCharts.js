import axios from "axios";
import { useEffect, useMemo, useState } from "react";

import SurveyLineChart from "./SurveyLineChart";
import SurveyPieChart from "./SurveyPieChart";
import SurveyTableChart from "./SurveyTableChart";
import SurveyTextChart from "./SurveyTextChart";

import styles from "../surveyResults.module.css";

export default function SurveyCharts({ survey }) {
  // respondent count time series
  const dates = useMemo(() => daysBehind(), []);
  const [counts, setCounts] = useState([]);
  useEffect(() => {
    if (!survey.id) return;
    axios
      .get(`/api/survey-result/date-count/${survey.id}`)
      .then((res) => setCounts(res.data.data))
      .catch((err) => {});
  }, [survey]);

  const dateCounts = useMemo(() => {
    const dates = daysBehind(7);
    if (!counts) return dates;

    const dateCounts = dates.map((date) => {
      const count = counts.find((count) => new Date(count.date).toLocaleDateString() === date.date.toLocaleDateString());
      date.count = count?.count || 0;
      return date;
    });
    return dateCounts || [];
  }, [counts]);

  // questions
  const questions = useMemo(() => {
    if (!survey.questions) return null;
    return survey.questions;
  }, [survey]);

  const chartElements = useMemo(() => {
    const getPieData = (options) => {
      const data = options?.map((option) => ({
        name: option.option_name,
        value: option.total_answer,
      }));
      return data ? data : [];
    };

    const elements = questions.map((q) => {
      if (["text", "long_text"].includes(q.input_type)) {
        return <SurveyTextChart key={q.id} title={q.question_name} data={q.answer_text} />;
      }

      if (q?.options?.length > 8 || q?.options?.some((option) => option.option_name.length > 30)) {
        return <SurveyTableChart key={q.id} title={q.question_name} options={q.options} />;
      }

      return <SurveyPieChart key={q.id} title={q.question_name} data={getPieData(q.options)} />;
    });
    return elements;
  }, [questions]);

  return (
    <div className={styles.charts_container}>
      <SurveyLineChart title="Jumlah Responden" dataX={dateCounts.map((d) => d.formattedDate)} dataY={dateCounts.map((d) => d?.count || 0)} />
      {chartElements}
    </div>
  );
}

function daysBehind(count = 7) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const day = new Date();
    day.setDate(today.getDate() - i);
    const options = {
      // weekday: 'long',
      day: "numeric",
      month: "short",
      // year: 'numeric',
    };
    const dateString = new Intl.DateTimeFormat("id-ID", options).format(day);
    days.unshift({ date: day, formattedDate: dateString });
  }
  return days;
}
