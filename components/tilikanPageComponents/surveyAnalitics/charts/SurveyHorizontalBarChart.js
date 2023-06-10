import * as echarts from "echarts";
import { useEffect, useMemo, useRef } from "react";

// eslint-disable-next-line import/order
import SurveyChartCard from "./SurveyChartCard";

export default function SurveyHorizontalBarChart({ title, dataX, dataY, colors, fitTitleHeight = false }) {
  const chartRef = useRef(null);

  const newDataX = useMemo(() => {
    const data = dataX;
    data.reverse();
    colors.reverse();
    return data.map((value, index) => {
      return {
        value: value,
        itemStyle: {
          color: colors[index],
        },
      };
    });
  }, [dataX, colors]);

  const newDataY = useMemo(() => {
    const data = dataY;
    data.reverse();
    return data;
  }, [dataY]);

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
        grid: {
          top: 20,
          bottom: 20,
          left: 120,
          right: 20,
        },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: newDataY,
        },
        series: [
          {
            name: title,
            type: "bar",
            // center: ["50%", "33%"],
            data: newDataX,
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
  }, [title, newDataX, newDataY]);

  const height = useMemo(() => {
    const h = dataX?.length * 40 + 40;
    // if (h < 200) return "200px";
    return h;
  }, [dataX]);

  return (
    <SurveyChartCard title={title} fitTitleHeight={fitTitleHeight}>
      <div ref={chartRef} style={{ width: "100%", height: height }}></div>
    </SurveyChartCard>
  );
}
