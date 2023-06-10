import SurveyAnalysisContainer from "@/containers/survey-analysis";
import tilikanClient from "@/utils/helpers/tilikanClient";

const AnalysisPage = (props) => {
  return <SurveyAnalysisContainer {...props} />;
};

export default AnalysisPage;

// export async function getServerSideProps(ctx) {
//   let surveys = [];
//   await tilikanClient
//     .get(`/survey`)
//     .then((res) => {
//       surveys = res.data.data;
//     })
//     .catch((err) => {});
//   console.log(surveys, "hahaha");
//   return {
//     props: { surveys },
//   };
// }
