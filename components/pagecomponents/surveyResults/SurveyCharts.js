import { useMemo } from 'react';
import SurveyLineChart from './SurveyLineChart';
import SurveyPieChart from './SurveyPieChart';
import SurveyTextChart from './SurveyTextChart';
import styles from './surveyResults.module.css';

export default function SurveyCharts({ survey }) {
  const questions = useMemo(() => {
    if (!survey.questions) return [];
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
      if (['text', 'long_text'].includes(q.input_type)) {
        return <SurveyTextChart title={q.question_name} data={q.answer_text} />;
      }

      return (
        <SurveyPieChart title={q.question_name} data={getPieData(q.options)} />
      );
    });
    return elements;
  }, [questions]);

  return (
    <div className={styles.charts_container}>
      <SurveyLineChart title="Jumlah Responden" />
      {chartElements}
    </div>
  );
}
