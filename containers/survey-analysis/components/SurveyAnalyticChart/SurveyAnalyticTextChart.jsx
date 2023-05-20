import SurveyAnalyticChartCard from "./SurveyAnalyticChartCard";

export default function SurveyAnalyticTextChart({ title, data = [] }) {
  return (
    <SurveyAnalyticChartCard fitTitleHeight title={title}>
      <div className="flex flex-col gap-3 max-h-[350px] overflow-auto">
        {data?.map((text, i) => (
          <div className="rounded bg-[#484848] py-1 px-2" key={i}>
            {text}
          </div>
        ))}
      </div>
    </SurveyAnalyticChartCard>
  );
}
