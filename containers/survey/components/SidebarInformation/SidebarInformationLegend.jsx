import { getRandomColorByKey } from "@/utils/helpers/getRandomColor";
import { useContext, useState } from "react";
import surveyDetail from "../../../survey-analysis/data/survey-detail";
import { SurveyMapContext } from "../../SurveyMapContext";

const SidebarInfromationLegend = () => {
  const { selectedSurveyQuestion, selectedSurvey } = useContext(SurveyMapContext);

  const [hoverLegendIndex, setHoverLegendIndex] = useState();
  const options = surveyDetail
    .find((survey) => survey.id === selectedSurvey.id)
    .questions.find((question) => question.id === selectedSurveyQuestion.question_id)?.options;

  return (
    <div>
      <div className="p-3">
        <span className="font-bold">Legenda</span>
      </div>
      <div className="w-full h-px bg-[#7287A5]" />
      <div className="flex flex-col gap-4 mt-4 overflow-auto max-h-[calc(100vh-550px)] w-full max-h p-3">
        {options?.map((d, i) => {
          const legendColor = getRandomColorByKey(i);
          return (
            <div key={i} className="flex items-center gap-2 justify-between cursor-pointer">
              <span
                className="text-sm"
                style={{ color: hoverLegendIndex === i ? legendColor : undefined }}
                onMouseEnter={() => setHoverLegendIndex(i)}
                onMouseLeave={() => setHoverLegendIndex(undefined)}
              >
                {d.option_name}
              </span>
              <div
                style={{
                  borderRadius: "4px",
                  background: legendColor,
                  minWidth: "30px",
                  width: "30px",
                  height: "20px",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarInfromationLegend;
