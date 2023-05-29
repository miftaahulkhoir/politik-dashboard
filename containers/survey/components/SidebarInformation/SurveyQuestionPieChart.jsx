import { useContext, useMemo } from "react";
import SurveyQuestionChartCard from "./SurveyQuestionChartCard";

import EChartsReact from "echarts-for-react";
import { SurveyMapContext } from "../../SurveyMapContext";

const SurveyQuestionPieChart = () => {
  const { selectedSurveyQuestion, selectedPolygonProperty } = useContext(SurveyMapContext);
  const data = selectedSurveyQuestion?.data?.find((item) => item.id === selectedPolygonProperty.id);
  const dataSource = selectedSurveyQuestion?.options.map((option, index) => ({
    name: option.option_name,
    value: data?.counts?.[index],
    itemStyle: {
      color: selectedSurveyQuestion?.colors?.[index],
    },
  }));

  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "bottom",
        textStyle: {
          color: "white",
        },
      },
      series: [
        {
          name: selectedSurveyQuestion?.question_name,
          type: "pie",
          radius: "50%",
          center: ["50%", "33%"],
          data: dataSource,

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
    }),
    [selectedSurveyQuestion?.question_name, dataSource],
  );

  return (
    <SurveyQuestionChartCard title={selectedSurveyQuestion?.question_name} fitTitleHeight>
      <EChartsReact option={option} />
    </SurveyQuestionChartCard>
  );
};

export default SurveyQuestionPieChart;
