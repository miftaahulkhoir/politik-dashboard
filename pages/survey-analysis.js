import { Space } from "antd";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

import SurveyDropdownSelector from "../components/pagecomponents/surveyAnalitics/SurveyDropdownSelector";
import SurveyResultHeader from "../components/pagecomponents/surveyAnalitics/SurveyResultHeader";

const SurveyCharts = dynamic(() => import("../components/pagecomponents/surveyAnalitics/charts/SurveyCharts"));

export default function SurveyResults({ surveys }) {
  const [selectedSurveyID, setSelectedSurveyID] = useState();
  const [survey, setSurvey] = useState();

  useEffect(() => {
    if (!selectedSurveyID) return;
    axios
      .get(`/api/survey-result/${selectedSurveyID}`)
      .then((res) => setSurvey(res.data.data))
      .catch((err) => {});
  }, [selectedSurveyID]);

  // const tabItems = [
  //   {
  //     key: '1',
  //     label: `Rangkuman`,
  //     children: <SurveyCharts survey={survey} />,
  //   },
  //   {
  //     key: '2',
  //     label: `Jawaban responden`,
  //     children: `Under development`,
  //   },
  // ];

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

        {survey ? (
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
  const { token } = parseCookies(ctx);
  const { req } = ctx;
  let baseURL = "";
  if (`https://${req.headers.host}/` === process.env.APP_BASEURL_DEFAULT) {
    baseURL = process.env.APP_BASEURL_DEFAULT;
  } else if (`https://${req.headers.host}/` === process.env.APP_BASEURL_PATRON) {
    baseURL = process.env.APP_BASEURL_PATRON;
  } else {
    baseURL = process.env.APP_BASEURL_LOCAL;
  }

  let surveys = [];
  await axios
    .get(`${baseURL}api/survey`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      surveys = res.data.data || [];
    })
    .catch((err) => {});

  return { props: { surveys } };
}
