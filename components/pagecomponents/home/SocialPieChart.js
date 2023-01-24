import dynamic from "next/dynamic";

import styles from "./home.module.css";

import Card from "../../elements/card/Card";

// import ReactEcharts from 'echarts-for-react';
const ReactEcharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function SocialPieChart({ title, data, chartType }) {
  const finalData = [];
  let radius = [];

  if (data != null) {
    if (chartType == "posneg") {
      data.forEach((value, index) => {
        if (value.key == "positive" || value.key == "negative")
          finalData[index] = {
            value: value.value,
            name: value.key.charAt(0).toUpperCase() + value.key.slice(1),
          };
      });
      radius = ["0%", "70%"];
    } else {
      data.forEach((value, index) => {
        if (value.key != "undefined") {
          finalData[index] = {
            value: value.value,
            name: value.key.charAt(0).toUpperCase() + value.key.slice(1),
          };
        }
      });
      radius = ["40%", "70%"];
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
      trigger: "item",
    },
    legend: {
      top: "bottom",
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: radius,
        avoidLabelOverlap: false,
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: "bold",
        //   },
        // },
        data: finalData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: {
          formatter: "{b}: {c} ({d}%)",
        },
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
