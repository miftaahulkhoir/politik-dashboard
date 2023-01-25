import dynamic from "next/dynamic";

import Card from "../../elements/card/Card";
import styles from "../home/home.module.css";

// import ReactEcharts from 'echarts-for-react';
const ReactEcharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function AdsBarChart({ title, data, chartType }) {
  const finalData = [];

  if (data.length > 0) {
    if (chartType == "posneg") {
      data.forEach((value, index) => {
        if (value.key == "positive" || value.key == "negative")
          finalData[index] = {
            value: value.value,
            name: value.key.charAt(0).toUpperCase() + value.key.slice(1),
          };
      });
    } else {
      data.forEach((value, index) => {
        if (value.key != "undefined") {
          finalData[index] = {
            value: value.value,
            name: value.key.charAt(0).toUpperCase() + value.key.slice(1),
          };
        }
      });
    }
  } else {
    finalData[0] = {
      value: 150,
      name: "Mon",
    };
    finalData[1] = {
      value: 230,
      name: "Tue",
    };
    finalData[2] = {
      value: 224,
      name: "Wed",
    };
    finalData[3] = {
      value: 512,
      name: "Thu",
    };
  }

  const option = {
    title: {
      text: title,
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "bottom",
    },
    xAxis: {
      type: "category",
      data: finalData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: title,
        type: "bar",
        // avoidLabelOverlap: false,
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: "bold",
        //   },
        // },
        data: finalData,
        // emphasis: {
        //   itemStyle: {
        //     shadowBlur: 10,
        //     shadowOffsetX: 0,
        //     shadowColor: "rgba(0, 0, 0, 0.5)",
        //   },
        // },
        // label: {
        //   formatter: "{b}: {c} ({d}%)",
        // },
      },
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
