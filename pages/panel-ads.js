import { Space, notification } from "antd";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

import AdsDropdownSelector from "../components/pagecomponents/panelAds/AdsDropdownSelector";
import AdsFormDrawer from "../components/pagecomponents/panelAds/AdsFormDrawer";
import AdsProfileBar from "../components/pagecomponents/panelAds/AdsProfileBar";
import AdsSummary from "../components/pagecomponents/panelAds/AdsSummary";
import { useGetCampaignsById, useGetGoogleCustomerName } from "../utils/services/panelAds";

export default function SocialReports(pageProps) {
  const [apiNotification, contextHolderNotification] = notification.useNotification();

  const [isDrawerActive, setIsDrawerActive] = useState(false);

  const [isFetched, setIsFetched] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { campaigns: fetchCampaigns } = useGetCampaignsById(pageProps.profile.google_ads_id);
  const [gProfile, setGProfile] = useState("");
  const [gProfileName, setGProfileName] = useState("");
  const { gProfileName: fetchGProfileName } = useGetGoogleCustomerName(pageProps.profile.google_ads_id);
  const [selectedAdsID, setSelectedAdsID] = useState();
  const [selectedCampaign, setSelectedCampaign] = useState();

  useEffect(() => {
    if (!fetchCampaigns?.length) return;
    if (!isFetched) {
      setIsFetched(true);
      setCampaigns(fetchCampaigns);
    }
  }, [fetchCampaigns]);

  useEffect(() => {
    if (fetchGProfileName == "") return;
    setGProfile(pageProps.profile.google_ads_id);
    setGProfileName(fetchGProfileName);
  }, [fetchGProfileName]);

  useEffect(() => {
    for (let i = 0; i < filteredCampaigns.length; i++) {
      console.log(filteredCampaigns[i]);
      if (filteredCampaigns[i].campaign.id == selectedAdsID) {
        setSelectedCampaign(filteredCampaigns[i]);
        break;
      }
    }
  }, [selectedAdsID]);

  useEffect(() => {
    setSelectedAdsID();
    setSelectedCampaign();
  }, [campaigns]);

  const filteredCampaigns = useMemo(() => {
    if (campaigns == null) {
      const empty = [];
      return empty;
    }
    return campaigns.map((campaigns, i) => ({ ...campaigns, no: i + 1 }));
  }, [campaigns]);

  return (
    <>
      {contextHolderNotification}

      <AdsFormDrawer
        open={isDrawerActive}
        setOpen={setIsDrawerActive}
        apiNotification={apiNotification}
        setUserName={setGProfileName}
        setUserId={setGProfile}
        setTable={setCampaigns}
      />
      <Head>
        <title>Panel Ads · Patrons</title>
      </Head>

      <div className="col-12 pdv-3 mb-12">
        <h1>Panel Ads</h1>
      </div>

      <Space direction="vertical" size="middle">
        <AdsProfileBar
          name={gProfileName || "-"}
          id={gProfile || ""}
          editProfileHandler={() => setIsDrawerActive(true)}
        />
        <AdsDropdownSelector
          datas={filteredCampaigns}
          setSelectedAdsID={setSelectedAdsID}
          gProfile={gProfile}
          value={selectedAdsID}
        />
        {/* <AdsDataTable
          data={selectedCampaign}
        /> */}
        {selectedCampaign ? <AdsSummary data={selectedCampaign} /> : <div />}
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
