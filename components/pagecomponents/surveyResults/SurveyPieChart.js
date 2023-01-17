import EChartsReact from 'echarts-for-react';
import SurveyChartCard from './SurveyChartCard';

export default function SurveyPieChart({ title }) {
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 'bottom',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        center: ['50%', '42%'],
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          formatter: '{b}: {c} ({d}%)',
        },
      },
    ],
  };
  return (
    <SurveyChartCard title={title}>
      <EChartsReact option={option} />
    </SurveyChartCard>
  );
}
