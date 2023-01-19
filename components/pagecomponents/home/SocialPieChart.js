import Card from '../../elements/card/Card';
// import ReactEcharts from 'echarts-for-react';
import dynamic from 'next/dynamic';
const ReactEcharts = dynamic(() => import('echarts-for-react'), { ssr: false });

import styles from './home.module.css';

export default function SocialPieChart({ title, data, chartType }) {
  let finalData = [];
  let radius = [];

  if (data != null) {
    if (chartType == "posneg") {
      data.forEach((value, index) => {
        if (value.key == "positive" || value.key == "negative")
        finalData[index] = {
          value: value.value,
          name: value.key.charAt(0).toUpperCase() + value.key.slice(1)
        };
      })
      radius = ['0%', '70%'];
    } else {
      data.forEach((value, index) => {
        finalData[index] = {
          value: value.value,
          name: value.key.charAt(0).toUpperCase() + value.key.slice(1)
        };
      })
      radius = ['40%', '70%'];
    }
  }

  const option = {
    title: {
      text: title,
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [{
      name: title,
      type: "pie",
      radius: radius,
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: finalData
    }],
  };
  return (
    <Card>
      <div className={styles.social_chart}>
        <ReactEcharts opts={{ height: 410 }} option={option} />
      </div>
    </Card>
  );
}
