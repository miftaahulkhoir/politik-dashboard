import EChartsReact from 'echarts-for-react';
import SurveyChartCard from './SurveyChartCard';

export default function SurveyLineChart({ title }) {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
  };
  return (
    <SurveyChartCard title={title}>
      <EChartsReact option={option} />
    </SurveyChartCard>
  );
}
