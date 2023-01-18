import Card from '../../elements/card/Card';
// import ReactEcharts from 'echarts-for-react';
import dynamic from 'next/dynamic';
const ReactEcharts = dynamic(() => import('echarts-for-react'), { ssr: false });

import styles from './home.module.css';

export default function SocialTimeChart({ title, data }) {
  let formattedData = [[]];

  if (data != null) {
    data.forEach((value, index) => {
      formattedData[index] = [new Date(value.key*1000), value.value];
      // timestamp[index] = value.key;
      // splitData[index] = value.value;
      console.log(formattedData[index]);
    })
  } else {
    formattedData[0] = [new Date(1672506000000), 0];
  }

  const option = {
    title: {
      text: title,
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    },
    legend: {
      orient: 'horizontal',
      center: 'center',
      top: 'bottom',
      icon: 'rect',
      height: 100,
      data: ['Twitter']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    dataLabels: {
      enabled: false
    },
    dataset: {
      source: formattedData,
      dimensions: ["timestamp", "Data"]
    },
    xAxis: [
      {
        type: 'time',
        boundaryGap: false,
        // data: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul'],
        axisLabel: {
          formatter: '{dd}-{MM}-{yyyy}'
        }
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Data',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          color: '#08c4b2',
        },
        color: '#08c4b2',
        emphasis: {
          focus: 'series',
        },
        encode: {
          x: "timestamp",
          y: "Data"
        }
      }
    ],
  };
  return (
    <Card>
      <div className={styles.social_chart}>
        <ReactEcharts opts={{ height: 410 }} option={option} />
      </div>
    </Card>
  );
}
