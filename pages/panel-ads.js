import { Button, Col, DatePicker, Input, Row, Select, Space, Typography, notification } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useMemo, useState } from "react";

import Card from "../components/elements/card/Card";
import AdsBarChart from "../components/pagecomponents/panelAds/AdsBarChart";
import AdsCard from "../components/pagecomponents/panelAds/AdsCard";
import AdsDataTable from "../components/pagecomponents/panelAds/AdsDataTable";
import AdsFormDrawer from "../components/pagecomponents/panelAds/AdsFormDrawer";
import AdsDropdownSelector from "../components/pagecomponents/panelAds/AdsDropdownSelector";
import AdsProfileBar from "../components/pagecomponents/panelAds/AdsProfileBar";
import AdsSummary from "../components/pagecomponents/panelAds/AdsSummary";
import { useGetCampaignsById, useGetGoogleCustomerName } from "../utils/services/panelAds";
const { RangePicker } = DatePicker;

const { TextArea } = Input;
const { Text, Title } = Typography;

export default function SocialReports(pageProps) {
  const [summaryImpressions, setSummaryImpressions] = useState(null);
  const [summaryEngagements, setSummaryEngagements] = useState(null);
  const [summaryEngagementRate, setSummaryEngagementRate] = useState(null);
  const [summaryPostLinkClicks, setSummaryPostLinkClicks] = useState(null);

  const [showCharts, setShowCharts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [mentionData, setMentionData] = useState([]);
  const [mentionSum, setMentionSum] = useState(null);
  const [totalImpression, setTotalImpression] = useState(null);
  const [allSource, setAllSource] = useState([]);
  const [sentiment, setSentiment] = useState([]);
  const [mentionBySource, setMentionBySource] = useState([]);
  const [sentimentOverTime, setSentimentOverTime] = useState([]);

  const [engagementData, setEngagementData] = useState([]);
  const [engagementRateData, setEngagementRateData] = useState([]);
  const [videoViewsData, setVideoViewsData] = useState([]);
  const [apiNotification, contextHolderNotification] = notification.useNotification();

  const [mtkUrl, setMtkUrl] = useState("");
  const [mtkToken, setMtkToken] = useState("");
  const [mtkOrgId, setMtkOrgId] = useState("");

  const [isGroupAssigned, setIsGroupAssigned] = useState(false);
  const [isTopicAssigned, setIsTopicAssigned] = useState(false);
  const [isDateAssigned, setIsDateAssigned] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(true);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const [filterSearch, setFilterSearch] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [selectedGroupData, setSelectedGroup] = useState("");
  const [selectedTopicData, setSelectedTopic] = useState("");
  const [filterDate, setFilterDate] = useState([]);

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
        />
        {/* <AdsDataTable
          data={selectedCampaign}
        /> */}
        {selectedCampaign ?
          <AdsSummary
            data={selectedCampaign}
          /> : 
            <div/>
        }
        
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
