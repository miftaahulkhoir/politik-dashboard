import { useMemo } from "react";

export default function SurveyAnalyticHeader({ survey }) {
  const date = useMemo(() => {
    try {
      const createdAt = new Date(survey.created_at);
      const formatted = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(createdAt);

      return formatted;
    } catch (error) {
      return "";
    }
  }, [survey]);

  return (
    <>
      <div className="mt-6">
        <span className="text-2xl font-semibold">{survey?.survey_name}</span>
      </div>
      <div className="mt-4">
        <span className="font-semibold">{survey?.total_respondent} Responden</span>
      </div>
      <div className="mt-1">
        <span className="text-sm text-[#9E9E9E]">{date}</span>
      </div>
    </>
  );
}
