import { Space, notification } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import Head from "next/head";
import { useCallback, useState, useEffect } from "react";

import SocmedDropdownSelector from "../components/pagecomponents/socmedAnalytics/SocmedDropdownSelector";
import SocmedFormDrawer from "../components/pagecomponents/socmedAnalytics/SocmedFormDrawer";
import SocmedHistorical from "../components/pagecomponents/socmedAnalytics/SocmedHistorical";
import SocmedPostFormDrawer from "../components/pagecomponents/socmedAnalytics/SocmedPostFormDrawer";
import SocmedProfileBar from "../components/pagecomponents/socmedAnalytics/SocmedProfileBar";
import SocmedResultHeader from "../components/pagecomponents/socmedAnalytics/SocmedResultHeader";
import { useFindAllSocmeds, useGetUserAnalytics } from "../utils/services/socmedAnalysis";

export default function SocialMediaAnalysis(pageProps) {
  const [apiNotification, contextHolderNotification] = notification.useNotification();
  const [isDrawerActive, setIsDrawerActive] = useState(false);
  const [isPostDrawerActive, setIsPostDrawerActive] = useState(false);

  const [isDateAssigned, setIsDateAssigned] = useState(false);
  const [filterDate, setFilterDate] = useState([]);

  const [historical, setHistorical] = useState([]);

  const [socmedsList, setSocmedsList] = useState([]);
  const [userAnalytics, setUserAnalytics] = useState({});
  const [ayrshareName, setAyrshareName] = useState("");
  const [selectedSocmedID, setSelectedSocmedID] = useState("");
  const [selectedSocmedValue, setSelectedSocmedValue] = useState({});
  const [showResult, setShowResult] = useState(false);
  // const { socmed } = useFindOneSocmedResult(selectedSurveyID);
  const { socmedsList: fetchSocmeds, ayrshareName: fetchAyrshareName } = useFindAllSocmeds();
  const { userAnalytics: fetchUserAnalytics } = useGetUserAnalytics();

  useEffect(() => {
    if (selectedSocmedID != "" && isDateAssigned) {
      fetchHistoricalData();
      console.log("selected:", selectedSocmedID);
      console.log("fetch", fetchUserAnalytics);
      if (selectedSocmedID == "twitter") {
        console.log("tw", userAnalytics.twitter);
        setShowResult(true);
        setSelectedSocmedValue(userAnalytics.twitter);
      } else if (selectedSocmedID == "facebook") {
        console.log("fb", userAnalytics.facebook);
        setShowResult(true);
        setSelectedSocmedValue(userAnalytics.facebook);
      } else {
        setShowResult(false);
        setSelectedSocmedValue({});
        console.log("error, selected", selectedSocmedID);
      }
    }
  }, [selectedSocmedID, filterDate]);

  useEffect(() => {
    setSocmedsList(fetchSocmeds);
  }, [fetchSocmeds]);

  useEffect(() => {
    setAyrshareName(fetchAyrshareName);
  }, [fetchAyrshareName]);

  useEffect(() => {
    setUserAnalytics(fetchUserAnalytics);
  }, [fetchUserAnalytics]);

  const selectDateHandler = useCallback(
    debounce((_, valueString) => {
      const res = [];
      valueString.forEach((value, index) => {
        res[index] = value;
      });
      setFilterDate(res);
      setIsDateAssigned(true);
    }, 300),
  );

  const redirect = () => {
    window.open("https://app.ayrshare.com/social-accounts", "_blank");
    return null;
  };

  const fetchHistoricalData = async () => {
    try {
      const request = {
        platfrom: selectedSocmedID,
        from: filterDate[0],
        until: filterDate[1],
      };
      // console.log("date", request);
      await axios
        .get(
          `${pageProps.baseURL}api/profile/social-media/analytics/historical?platform=${request.platfrom}&from=${request.from}&until=${request.until}`,
        )
        .then((res) => {
          // console.log("socmed results:", res.data.data);
          setHistorical(res.data.data);
        });
    } catch (error) {
      // console.error(error);
      apiNotification.error({
        message: "Gagal",
        description: "Terjadi kesalahan dalam pengambilan data reports",
      });
    }
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
        setUserAnalytics={setUserAnalytics}
        setShowResult={setShowResult}
        setSelectedSocmedID={setSelectedSocmedID}
      />
      <SocmedPostFormDrawer
        open={isPostDrawerActive}
        setOpen={setIsPostDrawerActive}
        apiNotification={apiNotification}
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
          postSocialMediaHandler={() => setIsPostDrawerActive(true)}
          addSocialmediaHandler={redirect}
        />

        <SocmedDropdownSelector
          socmeds={socmedsList}
          setSelectedSocmedID={setSelectedSocmedID}
          addSocialmediaHandler={redirect}
          selectDateHandler={selectDateHandler}
          value={selectedSocmedID}
        />

        {showResult ? (
          <>
            <SocmedResultHeader data={selectedSocmedValue} socmedType={selectedSocmedID} />

            <SocmedHistorical data={historical} socmedType={selectedSocmedID} dataLength={historical.length} />
            {/* <SocmedSummary data={selectedSocmedValue} socmedType={selectedSocmedID} /> */}
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
