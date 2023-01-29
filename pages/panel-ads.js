import { Col, DatePicker, Input, Row, Select, Space, Typography, notification } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useState } from "react";

import Card from "../components/elements/card/Card";
import AdsBarChart from "../components/pagecomponents/panelAds/AdsBarChart";
import AdsCard from "../components/pagecomponents/panelAds/AdsCard";
import AdsTimeChart from "../components/pagecomponents/panelAds/AdsTimeChart";
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

  useEffect(() => {
    if (!pageProps?.reports) return;
    setGroupData(pageProps.reports.data.groups);
    setMtkToken(pageProps.mediatoolkit.token);
    setMtkUrl(pageProps.mediatoolkit.url);
    setMtkOrgId(pageProps.mediatoolkit.orgid);
    console.log("process:", pageProps);
  }, []);

  useEffect(() => {
    if (isGroupAssigned && isTopicAssigned && isDateAssigned) {
      setIsLoading(true);
      fetchSocialData();
    }
  }, [selectedGroupData, selectedTopicData, filterDate]);

  const selectGroupHandler = useCallback(
    debounce((value) => {
      setSelectedGroup(Number(value));
      setIsGroupAssigned(true);
    }, 300),
  );

  const selectTopicHandler = useCallback(
    debounce((value) => {
      setSelectedTopic(Number(value));
      setIsTopicAssigned(true);
    }, 300),
  );

  const selectDateHandler = useCallback(
    debounce((_, valueString) => {
      const res = [];
      valueString.forEach((value, index) => {
        res[index] =
          new Date(
            parseInt(value.slice(0, 4)),
            parseInt(value.slice(5, 7)) - 1,
            parseInt(value.slice(8, 10)),
          ).getTime() / 1000;
      });
      setFilterDate(res);
      setIsDateAssigned(true);
    }, 300),
  );

  const fetchSocialData = async () => {
    try {
      // call api
      const request = {
        keyword_id: selectedTopicData.toString(),
        from_time: filterDate[0].toString(),
        to_time: filterDate[1].toString(),
      };
      await axios.post(`${pageProps.baseURL}api/social/${mtkOrgId}/reports`, request).then((res) => {
        setMentionData(res.data.data.mentions_over_time.data.entries);
        setMentionSum(res.data.data.sum_of_mentions.data.total_value);
        setTotalImpression(res.data.data.sum_of_impressions.data.total_value);
        setAllSource(res.data.data.sum_of_all_source.data.entries);
        setSentiment(res.data.data.effective_sentiment.data.entries);
        setMentionBySource(res.data.data.mentions_over_time_by_source.data.entries);
        setSentimentOverTime(res.data.data.sentiment_over_time.data.entries);
        setShowCharts(true);
        setIsLoading(false);
        if (!res?.data?.status) throw new Error("unknown error");
      });
    } catch (error) {
      console.error(error);
      apiNotification.error({
        message: "Gagal",
        description: "Terjadi kesalahan dalam pengambilan data reports",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Panel Ads · Patrons</title>
      </Head>

      <div className="col-12 pdv-3 mb-12">
        <h1>Panel Ads</h1>
      </div>

      <Space direction="vertical" size="middle">
        <SearchBar
          groupData={groupData}
          selectGroupHandler={selectGroupHandler}
          selectTopicHandler={selectTopicHandler}
          selectDateHandler={selectDateHandler}
          selectedGroupData={selectedGroupData}
          addSurveyHandler={() => setIsFormOpen(true)}
        />

        {/* <div className="col-12">
          <Card noPadding>
            <AdsSummaryCard
              title={"Ads Performance Summary"}
              subtitle={"View your ads performance metrics from the reporting period."}
              mentionSum={mentionSum}
              totalImpression={totalImpression}
              engagementRate={summaryEngagementRate}
              postLinkClicks={summaryPostLinkClicks}
            />
          </Card>
        </div> */}
        <Row gutter={18}>
          <Col span={12}>
            <Card noPadding>
              <AdsTimeChart title={"View-Through Conv."} data={mentionData} chartType={"common"} />
            </Card>
          </Col>
          <Col span={12}>
            <Card noPadding>
              <AdsBarChart title={"View-Through Conv."} data={sentimentOverTime} chartType={"detail"} />
            </Card>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={6}>
            <Card noPadding>
              <AdsCard title={"View-Through Conv."} data={752} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding>
              <AdsCard title={"Avg CPC"} data={"$194.86"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding>
              <AdsCard title={"Clicks"} data={194} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding>
              <AdsCard title={"Conversion Rate"} data={"19.02%"} />
            </Card>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={6}>
            <Card noPadding>
              <AdsCard title={"Conversions"} data={262} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding>
              <AdsCard title={"Cost"} data={"$1,341.00"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding>
              <AdsCard title={"Cost/Conversion"} data={"$214.14"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding>
              <AdsCard title={"Impressions"} data={128} />
            </Card>
          </Col>
        </Row>
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

  let reports;
  let mediatoolkit;

  // get groups
  await axios
    .get(`${baseURL}api/social/157456`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      reports = res.data.data;
      mediatoolkit = {
        orgid: `157456`,
      };
    })
    .catch((err) => {
      console.log(err);
    });
  return { props: { reports, mediatoolkit } };
}

function SearchBar({
  groupData,
  selectGroupHandler,
  selectTopicHandler,
  selectDateHandler,
  selectedGroupData,
  addSurveyHandler,
}) {
  const groupList = [{}];
  console.log("group data", groupData);
  groupData.forEach((value, index) => {
    groupList[index] = {
      value: value.id,
      label: value.name,
    };
  });

  const topicList = [{}];
  if (selectedGroupData != "") {
    const temp = groupData.find((value) => value.id == selectedGroupData);
    temp.keywords.forEach((value, index) => {
      topicList[index] = {
        value: value.id,
        label: value.name,
      };
    });
  }

  // console.log("yes", selectedGroup.keywords);
  // selectedGroup.keywords.forEach((value, index) => {
  //   console.log(value.id, value.name);
  //   topicList[index].value = value.id
  //   topicList[index].label = value.name
  // })

  return (
    <Row justify="space-between">
      <Col span={18}>
        <Row gutter={16}>
          <Col span={8}>
            <Select
              placeholder={"Pilih Group..."}
              style={{ width: "100%" }}
              onChange={selectGroupHandler}
              options={groupList}
            />
          </Col>
          <Col span={8}>
            <Select
              placeholder={"Pilih Topik..."}
              style={{ width: "100%" }}
              onChange={selectTopicHandler}
              options={topicList}
            />
          </Col>
          <Col span={8}>
            <RangePicker
              style={{ width: "100%" }}
              placeholder={["Tanggal Awal", "Tanggal Akhir"]}
              onChange={selectDateHandler}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
