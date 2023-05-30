import { useContext, useMemo } from "react";
import EChartsReact from "echarts-for-react";
import SurveyQuestionChartCard from "./SurveyQuestionChartCard";

import { SurveyMapContext } from "../../SurveyMapContext";

const SurveyQuestionBarChart = () => {
  const { selectedSurveyQuestion, selectedPolygonProperty } = useContext(SurveyMapContext);
  const data = selectedSurveyQuestion?.data?.find(
    (item) => item.id === (selectedPolygonProperty.id || selectedPolygonProperty.id_prov),
  );

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        top: 20,
        bottom: 20,
        left: 120,
        right: 20,
      },
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: "category",
        data: selectedSurveyQuestion?.options?.map((option) => option.option_name),
      },
      series: [
        {
          type: "bar",
          data: data?.counts?.map((value, index) => ({
            value,
            itemStyle: {
              color: selectedSurveyQuestion?.colors?.[index],
            },
          })),
        },
      ],
    }),
    [selectedSurveyQuestion?.options, selectedSurveyQuestion?.colors, data?.counts],
  );

  return (
    <SurveyQuestionChartCard title={selectedSurveyQuestion?.question_name}>
      <EChartsReact option={option} />
    </SurveyQuestionChartCard>
  );
};

export default SurveyQuestionBarChart;
