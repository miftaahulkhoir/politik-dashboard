import * as echarts from 'echarts';
import Card from '../../elements/card/Card';
// import ReactEcharts from 'echarts-for-react';
import dynamic from 'next/dynamic';
const ReactEcharts = dynamic(() => import('echarts-for-react'), { ssr: false });

import styles from './home.module.css';

export default function ChartCard({ dataX, dataY }) {
  const option = {
    color: ['#80FFA5'],
    title: {
      text: 'Gradient Stacked Area Chart',
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: ['Progress anggota'],
      itemStyle: {
        color: 'rgba(1, 108, 238, 1)',
      },
      right: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        // data: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul'],
        data: dataX,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Progress anggota',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(1, 108, 238, 1)',
            },
            {
              offset: 1,
              color: 'rgba(1, 108, 238, 0.2)',
            },
          ]),
        },
        lineStyle: {
          width: 2,
          color: 'rgba(1, 108, 238, 1)',
        },
        emphasis: {
          focus: 'series',
        },
        // data: [140, 232, 101, 264, 90, 340],
        data: dataY,
      },
    ],
  };
  return (
    <Card>
      <div className={styles.chart_left}>
        <ReactEcharts opts={{ height: 250 }} option={option} />
      </div>
    </Card>
  );
}
