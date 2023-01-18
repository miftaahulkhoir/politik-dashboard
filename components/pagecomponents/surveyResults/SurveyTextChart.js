import { Space } from 'antd';
import SurveyChartCard from './SurveyChartCard';
import styles from './surveyResults.module.css';

export default function SurveyTextChart({ title, data = [] }) {
  return (
    <SurveyChartCard fitTitleHeight title={title}>
      <Space
        direction="vertical"
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      >
        {data.map((text, i) => (
          <div className={styles.answer_text_item} key={i}>
            {text}
          </div>
        ))}
      </Space>
    </SurveyChartCard>
  );
}
