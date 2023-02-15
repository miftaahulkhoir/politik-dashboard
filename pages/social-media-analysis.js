import { Space, notification } from "antd";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useMemo, useState, useEffect } from "react";

import SocmedDropdownSelector from "../components/pagecomponents/socmedAnalytics/SocmedDropdownSelector";
import SocmedFormDrawer from "../components/pagecomponents/socmedAnalytics/SocmedFormDrawer";
import SocmedProfileBar from "../components/pagecomponents/socmedAnalytics/SocmedProfileBar";
import SocmedResultHeader from "../components/pagecomponents/socmedAnalytics/SocmedResultHeader";
import { useFindAllSocmeds, useFindOneSocmedResult } from "../utils/services/socmedAnalysis";

const SurveyCharts = dynamic(() => import("../components/pagecomponents/surveyAnalitics/charts/SurveyCharts"));

export default function SocialMediaAnalysis() {
  const [apiNotification, contextHolderNotification] = notification.useNotification();
  const [isDrawerActive, setIsDrawerActive] = useState(false);

  const [socmedsList, setSocmedsList] = useState([]);
  const [ayrshareName, setAyrshareName] = useState("");
  const [selectedSurveyID, setSelectedSurveyID] = useState();
  // const { socmed } = useFindOneSocmedResult(selectedSurveyID);
  const { socmedsList: fetchSocmeds, ayrshareName: fetchAyrshareName } = useFindAllSocmeds();
  const { socmed } = useState();

  useEffect(() => {
    setSocmedsList(fetchSocmeds);
  }, [fetchSocmeds]);

  useEffect(() => {
    setAyrshareName(fetchAyrshareName);
  }, [fetchAyrshareName]);

  const redirect = () => {
    window.open("https://app.ayrshare.com/social-accounts", "_blank");
    return null;
  };

  return (
    <>
      {contextHolderNotification}

      <SocmedFormDrawer
        open={isDrawerActive}
        setOpen={setIsDrawerActive}
        apiNotification={apiNotification}
        setEmail={setAyrshareName}
        setDropdown={setSocmedsList}
      />
      <Head>
        <title>Analisis Sosial Media · Patrons</title>
      </Head>

      <div className="col-12 pdv-3 mb-12">
        <h1>Analisis Sosial Media</h1>
      </div>

      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <SocmedProfileBar
          email={ayrshareName || "-"}
          editProfileHandler={() => setIsDrawerActive(true)}
          addSocialmediaHandler={redirect}
        />

        <SocmedDropdownSelector
          socmeds={socmedsList}
          setSelectedSurveyID={setSelectedSurveyID}
          addSocialmediaHandler={redirect}
        />

        {socmed?.id ? (
          <>
            <SocmedResultHeader socmed={socmed} />

            {/* <Tabs defaultActiveKey="1" items={tabItems} centered /> */}
            <SurveyCharts socmed={socmed} />
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
            <div style={{ fontSize: "16px", marginTop: "16px" }}>Tolong pilih profil sosial media terlebih dahulu</div>
          </div>
        )}
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
