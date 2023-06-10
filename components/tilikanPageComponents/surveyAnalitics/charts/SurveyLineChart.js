import EChartsReact from "echarts-for-react";
import { useMemo } from "react";

import SurveyChartCard from "./SurveyChartCard";

export default function SurveyLineChart({ title, dataX, dataY }) {
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
    <SurveyChartCard title={title}>
      <EChartsReact option={option} />
    </SurveyChartCard>
  );
}
