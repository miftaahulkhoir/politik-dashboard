import { useGetSurveyDateCount } from "@/utils/services/survey";
import SurveyAnalyticLineChart from "./SurveyAnalyticLineChart";
import SurveyAnalyticPieChart from "./SurveyAnalyticPieChart";
import SurveyAnalyticTableChart from "./SurveyAnalyticTableChart";
import SurveyAnalyticTextChart from "./SurveyAnalyticTextChart";
// import surveyCount from "../../data/survey-count";

function locationToTableChartOptions(locations) {
  return locations.map((v) => {
    return {
      option_name: v.regions.join(", "),
      total_answer: v.number,
    };
  });
}

function getFormattedDate(date) {
  const objectDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
  }).format(objectDate);

  return formattedDate;
}

export default function SurveyAnalyticChart({ survey }) {
  const { data, isLoading } = useGetSurveyDateCount(survey?.id, { enabled: Boolean(survey?.id) });
  const dateCount = data?.data?.data;

  const dates = dateCount?.map((item) => getFormattedDate(item.date));
  const counts = dateCount?.map((item) => item.count);

  const chartElements = () => {
    const getPieData = (options) => {
      const data = options?.map((option) => ({
        name: option.option_name,
        value: option.total_answer,
      }));
      return data ? data : [];
    };

    const elements = survey?.questions?.map((question) => {
      if (["text", "long_text"].includes(question.input_type)) {
        return <SurveyAnalyticTextChart key={question.id} title={question.question_name} data={question.answer_text} />;
      }

      if (question?.input_type.includes("location") && question?.location?.length > 0) {
        return (
          <SurveyAnalyticTableChart
            key={question.id}
            title={question.question_name}
            options={locationToTableChartOptions(question.location)}
          />
        );
      }

      if (question?.options?.length > 8 || question?.options?.some((option) => option?.option_name?.length > 30)) {
        return <SurveyAnalyticTableChart key={question.id} title={question.question_name} options={question.options} />;
      }

      return (
        <SurveyAnalyticPieChart key={question.id} title={question.question_name} data={getPieData(question.options)} />
      );
    });
    return elements;
  };

  if (isLoading) return null;

  return (
    <div className="grid grid-cols-2 gap-4 mt-8">
      <SurveyAnalyticLineChart title="Jumlah Responden" dataX={dates} dataY={counts} />
      {chartElements()}
    </div>
  );
}
