import { Space } from "antd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";

import SurveyDropdownSelector from "../components/pagecomponents/surveyAnalitics/SurveyDropdownSelector";
import SurveyResultHeader from "../components/pagecomponents/surveyAnalitics/SurveyResultHeader";
import { useFindAllSurveys, useFindOneSurveyResult } from "../utils/services/surveys";

const SurveyCharts = dynamic(() => import("../components/pagecomponents/surveyAnalitics/charts/SurveyCharts"));

export default function SurveyResults() {
  const [selectedSurveyID, setSelectedSurveyID] = useState();
  const { surveys } = useFindAllSurveys();
  const { survey } = useFindOneSurveyResult(selectedSurveyID);

  return (
    <>
      <Head>
        <title>Analisis Survei · Patrons</title>
      </Head>

      <div className="col-12 pdv-3 mb-12">
        <h1>Analisis Survei</h1>
      </div>

      <Space direction="vertical" style={{ width: "100%" }} size="large">
        {/* row select survey */}
        <SurveyDropdownSelector surveys={surveys} setSelectedSurveyID={setSelectedSurveyID} />

        {survey?.id ? (
          <>
            <SurveyResultHeader survey={survey} />

            {/* <Tabs defaultActiveKey="1" items={tabItems} centered /> */}
            <SurveyCharts survey={survey} />
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "32px 0",
            }}
          >
            <img style={{ width: "30%", maxHeight: "280px" }} src="/images/people_with_up.svg" alt="select" />
            <div style={{ fontSize: "16px", marginTop: "16px" }}>Tolong pilih survei terlebih dahulu</div>
          </div>
        )}
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
