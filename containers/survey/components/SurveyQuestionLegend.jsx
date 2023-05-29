import { getRandomColorByKey } from "@/utils/helpers/getRandomColor";
import { useContext, useState } from "react";
import surveyDetail from "../../survey-analysis/data/survey-detail";
import { SurveyMapContext } from "../SurveyMapContext";

const SurveyQuestionLegend = () => {
  const { selectedSurveyQuestion } = useContext(SurveyMapContext);
  const [surveyId, surveyQuestionId] = selectedSurveyQuestion.split(",");

  const [hoverLegendIndex, setHoverLegendIndex] = useState();
  const options = surveyDetail
    .find((survey) => survey.id === surveyId)
    .questions.find((question) => question.id === surveyQuestionId).options;

  return (
    <div className="absolute top-40 right-4 text-white bg-new-black rounded-xl min-w-60 flex flex-col items-end w-60">
      <div className="p-3">
        <span>Legenda</span>
      </div>
      <div className="w-full h-px bg-[#7287A5]" />
      <div className="flex flex-col gap-4 mt-4 overflow-auto max-h-[calc(100vh-350px)] w-full max-h p-3">
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
      <div className="mt-6 p-3">
        <div className="cursor-pointer border rounded-lg py-2 px-4">Reset</div>
      </div>
    </div>
  );
};

export default SurveyQuestionLegend;
