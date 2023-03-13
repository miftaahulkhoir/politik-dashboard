import { Col, Row, Space, Spin, notification } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useState } from "react";

import Card from "../components/elements/card/Card";
import SentimentGroupDrawer from "../components/pagecomponents/sentiment/SentimentGroupDrawer";
import SocialOrganizationDrawer from "../components/pagecomponents/sentiment/SentimentOrganizationDrawer";
import SocialPieChart from "../components/pagecomponents/sentimentAnalytics/SocialPieChart";
import SocialSearchBar from "../components/pagecomponents/sentimentAnalytics/SocialSearchBar";
import SocialSummaryCard from "../components/pagecomponents/sentimentAnalytics/SocialSummaryCard";
import SocialTimeChart from "../components/pagecomponents/sentimentAnalytics/SocialTimeChart";
import SocialTopicDrawer from "../components/pagecomponents/sentiment/SentimentTopicDrawer";
import SocialWordCloud from "../components/pagecomponents/sentimentAnalytics/SocialWordCloud";

export default function SocialReports(pageProps) {
  const [apiNotification, contextHolderNotification] = notification.useNotification();
  const [summaryEngagementRate, setSummaryEngagementRate] = useState(null);
  const [summaryPostLinkClicks, setSummaryPostLinkClicks] = useState(null);

  const [showCharts, setShowCharts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isGroupDrawerActive, setIsGroupDrawerActive] = useState(false);
  const [isTopicDrawerActive, setIsTopicDrawerActive] = useState(false);
  const [isOrganizationDrawerActive, setIsOrganizationDrawerActive] = useState(false);

  const [mentionData, setMentionData] = useState([]);
  const [mentionSum, setMentionSum] = useState(null);
  const [totalImpression, setTotalImpression] = useState(null);
  const [allSource, setAllSource] = useState([]);
  const [sentiment, setSentiment] = useState([]);
  const [mentionBySource, setMentionBySource] = useState([]);
  const [sentimentOverTime, setSentimentOverTime] = useState([]);
  const [wordcloud, setWordcloud] = useState([]);

  const [mtkUrl, setMtkUrl] = useState("");
  const [mtkToken, setMtkToken] = useState("");
  const [mtkOrgId, setMtkOrgId] = useState("");

  const [isGroupAssigned, setIsGroupAssigned] = useState(false);
  const [isTopicAssigned, setIsTopicAssigned] = useState(false);
  const [isDateAssigned, setIsDateAssigned] = useState(false);

  const [groupData, setGroupData] = useState([]);
  const [selectedGroupData, setSelectedGroup] = useState(null);
  const [selectedTopicData, setSelectedTopic] = useState(null);
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
      await axios.post(`${pageProps.baseURL}api/sentiment/reports`, request).then((res) => {
        setMentionData(res.data.data.mentions_over_time.data.entries);
        setMentionSum(res.data.data.sum_of_mentions.data.total_value);
        setTotalImpression(res.data.data.sum_of_impressions.data.total_value);
        setAllSource(res.data.data.sum_of_all_source.data.entries);
        setSentiment(res.data.data.effective_sentiment.data.entries);
        setMentionBySource(res.data.data.mentions_over_time_by_source.data.entries);
        setSentimentOverTime(res.data.data.sentiment_over_time.data.entries);
        setWordcloud(res.data.data.wordcloud);
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
      {contextHolderNotification}

      <SentimentGroupDrawer
        open={isGroupDrawerActive}
        setOpen={setIsGroupDrawerActive}
        apiNotification={apiNotification}
        setGroupData={setGroupData}
        // setEmail={setAyrshareName}
        // setDropdown={setSocmedsList}
        // setUserAnalytics={setUserAnalytics}
        // setShowResult={setShowResult}
        // setSelectedSocmedID={setSelectedSocmedID}
      />
      <SocialTopicDrawer
        open={isTopicDrawerActive}
        setOpen={setIsTopicDrawerActive}
        apiNotification={apiNotification}
        // setEmail={setAyrshareName}
        // setDropdown={setSocmedsList}
        // setUserAnalytics={setUserAnalytics}
        // setShowResult={setShowResult}
        // setSelectedSocmedID={setSelectedSocmedID}
      />
      <SocialOrganizationDrawer
        open={isOrganizationDrawerActive}
        setOpen={setIsOrganizationDrawerActive}
        apiNotification={apiNotification}
        // setEmail={setAyrshareName}
        // setDropdown={setSocmedsList}
        // setUserAnalytics={setUserAnalytics}
        // setShowResult={setShowResult}
        // setSelectedSocmedID={setSelectedSocmedID}
      />

      <Head>
        <title>Analisis Sentimen · Patrons</title>
      </Head>

      <div className="col-12 pdv-3 mb-12">
        <h1>Analisis Sentimen</h1>
      </div>

      <Space direction="vertical" size="middle">
        <SocialSearchBar
          groupData={groupData}
          selectedGroup={selectedGroupData}
          selectGroupHandler={selectGroupHandler}
          selectedTopic={selectedTopicData}
          selectTopicHandler={selectTopicHandler}
          selectDateHandler={selectDateHandler}
          selectedGroupData={selectedGroupData}
          editOrganizationHandler={() => setIsOrganizationDrawerActive(true)}
        />

        {showCharts ? (
          <>
            <div className="col-12">
              <Card noPadding>
                <SocialSummaryCard
                  title={"Performance Summary"}
                  subtitle={"View your key profile performance metrics from the reporting period."}
                  mentionSum={mentionSum}
                  totalImpression={totalImpression}
                  engagementRate={summaryEngagementRate}
                  postLinkClicks={summaryPostLinkClicks}
                />
              </Card>
            </div>
            <div className="col-12">
              <Card noPadding>
                <SocialTimeChart title={"Mentions Over Time"} data={mentionData} chartType={"common"} />
              </Card>
            </div>
            <div className="col-12">
              <Card noPadding>
                <SocialTimeChart title={"Mentions Over Time by Source"} data={mentionBySource} chartType={"detail"} />
              </Card>
            </div>
            <div className="col-12">
              <Card noPadding>
                <SocialPieChart title={"All Sources"} data={allSource} />
              </Card>
            </div>
            <div className="col-12">
              <Card noPadding>
                <SocialTimeChart title={"Sentiment Over Time"} data={sentimentOverTime} chartType={"detail"} />
              </Card>
            </div>
            <Row gutter={18}>
              <Col span={12}>
                <Card noPadding>
                  <SocialPieChart title={"Sentiment Ratio"} data={sentiment} />
                </Card>
              </Col>
              <Col span={12}>
                <Card noPadding>
                  <SocialPieChart title={"Positive-Negative Sentiment Ratio"} data={sentiment} chartType={"posneg"} />
                </Card>
              </Col>
            </Row>
            <div className="col-12">
              <Card noPadding>
                <SocialWordCloud title={"Word Cloud"} data={wordcloud} chartType={"detail"} />
              </Card>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 0",
            }}
          >
            {isLoading ? (
              <Spin size="large" style={{ margin: "50px 0" }}>
                <div className="content" />
              </Spin>
            ) : (
              <>
                <img style={{ width: "30%", maxHeight: "280px" }} src="/images/people_with_up.svg" alt="select" />
                <div style={{ fontSize: "16px", marginTop: "16px" }}>Tolong pilih topik terlebih dahulu</div>
              </>
            )}
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

  let reports;
  let mediatoolkit;

  // get groups
  await axios
    .get(`${baseURL}api/sentiment`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      reports = res.data.data;
      mediatoolkit = {
        orgid: reports.organization,
      };
    })
    .catch((err) => {
      console.log(err);
    });
  return { props: { reports, mediatoolkit } };
}
