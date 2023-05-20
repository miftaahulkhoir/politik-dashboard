import EChartsReact from "echarts-for-react";
import { useMemo } from "react";

import SurveyAnalyticChartCard from "./SurveyAnalyticChartCard";

export default function SurveyAnalyticLineChart({ title, dataX, dataY }) {
  const option = useMemo(() => {
    return {
      xAxis: {
        type: "category",
        data: dataX,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: dataY,
          type: "line",
          smooth: true,
        },
      ],
    };
  }, [dataX, dataY]);

  return (
    <SurveyAnalyticChartCard title={title}>
      <EChartsReact option={option} />
    </SurveyAnalyticChartCard>
  );
}
