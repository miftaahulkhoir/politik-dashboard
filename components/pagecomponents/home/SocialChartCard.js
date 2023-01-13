import Card from '../../elements/card/Card';
// import ReactEcharts from 'echarts-for-react';
import dynamic from 'next/dynamic';
const ReactEcharts = dynamic(() => import('echarts-for-react'), { ssr: false });

import styles from './home.module.css';

export default function SocialChartCard({ title, data }) {
  let timestamp = [];
  let twitter = [];
  let facebook = [];
  let instagram = [];
  let linkedin = [];
  let tiktok = [];

  data.forEach((element, index) => {
    timestamp[index] = element.timestamp;
  })
  console.log(timestamp);

  data.forEach((element, index) => {
    twitter[index] = [timestamp[index], element.data.twitter];
  })

  data.forEach((element, index) => {
    facebook[index] = [timestamp[index], element.data.facebook];
  })

  data.forEach((element, index) => {
    instagram[index] = [timestamp[index], element.data.instagram];
  })

  data.forEach((element, index) => {
    linkedin[index] = [timestamp[index], element.data.linkedin];
  })

  data.forEach((element, index) => {
    tiktok[index] = [timestamp[index], element.data.tiktok];
  })

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
      data: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'TikTok']
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
        name: 'Twitter',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: 'rgba(1, 108, 238, 1)',
          //   },
          //   {
          //     offset: 1,
          //     color: 'rgba(1, 108, 238, 0.2)',
          //   },
          // ]),
          color: '#08c4b2',
        },
        color: '#08c4b2',
        emphasis: {
          focus: 'series',
        },
        // data: [140, 232, 101, 264, 90, 340],
        data: twitter,
      },{
        name: 'Facebook',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: 'rgba(1, 108, 238, 1)',
          //   },
          //   {
          //     offset: 1,
          //     color: 'rgba(1, 108, 238, 0.2)',
          //   },
          // ]),
          color: '#6f5ed3',
        },
        color: '#6f5ed3',
        emphasis: {
          focus: 'series',
        },
        // data: [140, 232, 101, 264, 90, 340],
        data: facebook,
      },{
        name: 'Instagram',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: 'rgba(1, 108, 238, 1)',
          //   },
          //   {
          //     offset: 1,
          //     color: 'rgba(1, 108, 238, 0.2)',
          //   },
          // ]),
          color: '#ce3665',
        },
        color: '#ce3665',
        emphasis: {
          focus: 'series',
        },
        // data: [140, 232, 101, 264, 90, 340],
        data: instagram,
      },{
        name: 'LinkedIn',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: 'rgba(1, 108, 238, 1)',
          //   },
          //   {
          //     offset: 1,
          //     color: 'rgba(1, 108, 238, 0.2)',
          //   },
          // ]),
          color: '#ffcd1c',
        },
        color: '#ffcd1c',
        emphasis: {
          focus: 'series',
        },
        // data: [140, 232, 101, 264, 90, 340],
        data: linkedin,
      },{
        name: 'TikTok',
        type: 'line',
        smooth: true,
        showSymbol: false,
        areaStyle: {
          opacity: 1,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: 'rgba(1, 108, 238, 1)',
          //   },
          //   {
          //     offset: 1,
          //     color: 'rgba(1, 108, 238, 0.2)',
          //   },
          // ]),
          color: '#3896e3',
        },
        color: '#3896e3',
        emphasis: {
          focus: 'series',
        },
        // data: [140, 232, 101, 264, 90, 340],
        data: tiktok,
      },
    ],
  };
  return (
    <Card>
      <div className={styles.chart_left}>
        <ReactEcharts opts={{ height: 410 }} option={option} />
      </div>
    </Card>
  );
}
