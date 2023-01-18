import { useMemo } from 'react';
import SurveyLineChart from './SurveyLineChart';
import SurveyPieChart from './SurveyPieChart';
import styles from './surveyResults.module.css';

// PIE CHART EXAMPLE DATA
// data: [
//   { value: 1048, name: 'Search Engine' },
//   { value: 735, name: 'Direct' },
//   { value: 580, name: 'Email' },
//   { value: 484, name: 'Union Ads' },
//   { value: 300, name: 'Video Ads' },
// ],

export default function SurveyCharts({ survey }) {
  const questions = useMemo(() => {
    if (!survey.questions) return [];
    const filtered = survey.questions.filter(
      (question) =>
        question.input_type !== 'text' && question.input_type !== 'long_text'
    );
    return filtered;
  }, [survey]);

  const chartElements = useMemo(() => {
    const getPieData = (options) => {
      const data = options?.map((option) => ({
        name: option.option_name,
        value: option.total_answer,
      }));
      console.log('data', data);
      return data ? data : [];
    };

    const elements = questions.map((q) => {
      console.log('each question', q);
      console.log('each question option', q.options);

      return (
        <SurveyPieChart title={q.question_name} data={getPieData(q.options)} />
        // <SurveyPieChart title="pertanyaan" data={getPieData(q.options)} />
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
