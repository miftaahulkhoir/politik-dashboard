import * as echarts from "echarts";
import { useEffect, useRef } from "react";

import SurveyChartCard from "./SurveyChartCard";

export default function SurveyPieChart({ title, data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef?.current) return;

    const chart = echarts.init(chartRef.current);

    // set width and height for first render, then set the option
    setTimeout(() => {
      chart.resize();
    }, 50);

    // Set chart options
    setTimeout(() => {
      chart.setOption({
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
            radius: "50%",
            center: ["50%", "33%"],
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              formatter: "{b}: {c} ({d}%)",
              color: "white",
            },
          },
        ],
      });
    }, 60);

    // Resize chart when window is resized
    window.addEventListener("resize", () => {
      chart.resize();
    });

    // Destroy chart when component is unmounted
    return () => {
      chart.dispose();
    };
  }, [data, title]);

  return (
    <SurveyChartCard title={title}>
      <div ref={chartRef} style={{ width: "100%", height: "300px" }}></div>
    </SurveyChartCard>
  );
}
