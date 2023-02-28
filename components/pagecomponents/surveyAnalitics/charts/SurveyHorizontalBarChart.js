import * as echarts from "echarts";
import { useEffect, useMemo, useRef } from "react";

import SurveyChartCard from "./SurveyChartCard";

export default function SurveyHorizontalBarChart({ title, dataX, dataY, fitTitleHeight = false }) {
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
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: dataY,
        },
        series: [
          {
            name: title,
            type: "bar",
            // center: ["50%", "33%"],
            data: dataX,
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
  }, [dataX, dataY, title]);

  const height = useMemo(() => {
    const h = dataX?.length * 40 + 120;
    // if (h < 200) return "200px";
    return h;
  }, [dataX]);

  return (
    <SurveyChartCard title={title} fitTitleHeight={fitTitleHeight}>
      <div ref={chartRef} style={{ width: "100%", height: height }}></div>
    </SurveyChartCard>
  );
}
