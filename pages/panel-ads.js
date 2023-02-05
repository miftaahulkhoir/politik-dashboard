import { Col, DatePicker, Input, Row, Select, Space, Typography, notification } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useMemo, useState } from "react";

import Card from "../components/elements/card/Card";
import AdsBarChart from "../components/pagecomponents/panelAds/AdsBarChart";
import AdsCard from "../components/pagecomponents/panelAds/AdsCard";
import AdsTimeChart from "../components/pagecomponents/panelAds/AdsTimeChart";
import AdsSearchBar from "../components/pagecomponents/panelAds/AdsSearchBar";
import AdsDataTable from "../components/pagecomponents/panelAds/AdsDataTable";
import { useGetCampaignsById } from "../utils/services/panelAds";
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
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const [filterSearch, setFilterSearch] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [selectedGroupData, setSelectedGroup] = useState("");
  const [selectedTopicData, setSelectedTopic] = useState("");
  const [filterDate, setFilterDate] = useState([]);

  const [campaigns, setCampaigns] = useState([]);
  const { campaigns: fetchCampaigns } = useGetCampaignsById("4812357154");

  useEffect(() => {
    console.log("br1");
    if (!fetchCampaigns?.length) return;
    setCampaigns(fetchCampaigns);
    console.log("campaigns:", fetchCampaigns);
  }, [fetchCampaigns]);

  const filteredCampaigns = useMemo(() => {
    return campaigns
      .map((campaigns, i) => ({ ...campaigns, no: i + 1 }));
  }, [campaigns]);

  return (
    <>
      <Head>
        <title>Panel Ads · Patrons</title>
      </Head>

      <div className="col-12 pdv-3 mb-12">
        <h1>Panel Ads</h1>
      </div>

      <Space direction="vertical" size="middle">
        <h4>Profil: 481-235-7154</h4>
        <AdsDataTable
          data={filteredCampaigns}
        />
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
