import { Row, Col, Input, Select, Space, Button, DatePicker, notification } from "antd";
import useSWR from 'swr';
import axios from "axios";
import debounce from "lodash.debounce";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Card from "../components/elements/card/Card";
import SocialChartCard from "../components/pagecomponents/home/SocialChartCard";
import SocialSummaryCard from "../components/pagecomponents/home/SocialSummaryCard";
export default function Users(pageProps) {
  const [cookie, setCookie] = useState("");
  const [reports, setReports] = useState(null);
  const [summaryImpressions, setSummaryImpressions] = useState(null);
  const [summaryEngagements, setSummaryEngagements] = useState(null);
  const [summaryEngagementRate, setSummaryEngagementRate] = useState(null);
  const [summaryPostLinkClicks, setSummaryPostLinkClicks] = useState(null);
  const [audienceGrowthData, setAudienceGrowthData] = useState([]);
  const [impressionData, setImpressionData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [engagementRateData, setEngagementRateData] = useState([]);
  const [videoViewsData, setVideoViewsData] = useState([]);
  const [filterDate, setFilterDate] = useState([]);
  const [apiNotification, contextHolderNotification] = notification.useNotification();
  const { RangePicker } = DatePicker;
  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  useEffect(() => {
    if (!pageProps?.reports) return;

    setCookie(pageProps.cookie);
    setReports(pageProps.reports);
    setSummaryImpressions(pageProps.reports.summary.impressions);
    setSummaryEngagements(pageProps.reports.summary.engagements);
    setSummaryEngagementRate(pageProps.reports.summary.engagement_rate);
    setSummaryPostLinkClicks(pageProps.reports.summary.post_link_clicks);

    setAudienceGrowthData(pageProps.reports.data.audience_growth);
    setImpressionData(pageProps.reports.data.impression);
    setEngagementData(pageProps.reports.data.engagement);
    setEngagementRateData(pageProps.reports.data.engagement_rate);
    setVideoViewsData(pageProps.reports.data.video_views);
  }, []);

  const filterDateHandler = async (_, dateValue) => {
    // try {
    console.log(reports);
    console.log(dateValue[0].replace(' ', 'T')+'Z');
    console.log(dateValue[1].replace(' ', 'T')+'Z');

    let fromData = dateValue[0].replace(' ', 'T')+'Z';
    fromData = fromData.split('T');
    fromData = fromData[0]
    let untilData = dateValue[1].replace(' ', 'T')+'Z';
    untilData = untilData.split('T');
    untilData = untilData[0]

    console.log(reports.data.impression);
    console.log(reports.data.impression[1].timestamp);

    let fromIndex = reports.data.impression.findIndex(data => data.timestamp.split('T')[0] == fromData);
    let untilIndex = reports.data.impression.findIndex(data => data.timestamp.split('T')[0] == untilData);

    if (fromIndex === -1) {
      fromIndex = 0;
    }
    if (untilIndex === -1) {
      untilIndex = 10000;
    } else {
      untilIndex++;
    }
    console.log(fromIndex);
    console.log(untilIndex);

    setAudienceGrowthData(reports.data.audience_growth.slice(fromIndex, untilIndex));
    setImpressionData(reports.data.impression.slice(fromIndex, untilIndex));
    setEngagementData(reports.data.engagement.slice(fromIndex, untilIndex));
    setEngagementRateData(reports.data.engagement_rate.slice(fromIndex, untilIndex));
    setVideoViewsData(reports.data.video_views.slice(fromIndex, untilIndex));

    // const res = await axios.get(
    //   `https://api.patronpolitik.id/v1/social/9ywyaizkbc?from=${dateValue[0]}&until=${dateValue[1]}`, {
    //     withCredentials: true,
    //     mode: 'cors',
    //     cache: 'no-cache',
    //     credentials: 'same-origin',
    //   }
    // );
    // if (!res?.data?.status) throw new Error("unknown error");
    // } catch (error) {
    //   console.error(error);
    //   apiNotification.error({
    //     message: "Gagal",
    //     description: "Terjadi kesalahan dalam mengubah status aktif",
    //   });
    // }
  }

  // function filterDateHandler() {
  //   console.log("clicked");
  //   debounce( async (_, valueString) => {
  //     try {
  //       console.log("try");
  //       setFilterDate(valueString);
  //       console.log(valueString);
  
  //       const { pageProps, error } = useCallback(useSWR(
  //         `https://api.patronpolitik.id/v1/social/9ywyaizkbc?from=${valueString[0]}&until=${valueString[1]}`,
  //         fetcher
  //       ));

  //       if (error) return;
  
  //       setSummaryImpressions(pageProps.reports.summary.impressions);
  //       setSummaryEngagements(pageProps.reports.summary.engagements);
  //       setSummaryEngagementRate(pageProps.reports.summary.engagement_rate);
  //       setSummaryPostLinkClicks(pageProps.reports.summary.post_link_clicks);
  
  //       setAudienceGrowthData(pageProps.reports.data.audience_growth);
  //       setImpressionData(pageProps.reports.data.impression);
  //       setEngagementData(pageProps.reports.data.engagement);
  //       setEngagementRateData(pageProps.reports.data.engagement_rate);
  //       setVideoViewsData(pageProps.reports.data.video_views);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, 300)
  // }

  return (
    <>
      <Head>
        <title>Sentimen Analisis · Patrons</title>
      </Head>

      <div className='col-12 pb-5 mb-24'>
        <h1>Sentimen Analisis</h1>
      </div>
      <Space direction='vertical' size='middle'>
        <Row justify='space-between'>
          <Col span={18}>
            <Row gutter={16}>
              <Col span={8}>
                <RangePicker
                  showTime 
                  style={{ width: "100%" }}
                  placeholder={['Tanggal Awal', 'Tanggal Akhir']}
                  onChange={filterDateHandler}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <div className='col-12'>
          <Card noPadding>
            <SocialSummaryCard
              title={"Performance Summary"}
              subtitle={
                "View your key profile performance metrics from the reporting period."
              }
              impressions={summaryImpressions}
              engagements={summaryEngagements}
              engagementRate={summaryEngagementRate}
              postLinkClicks={summaryPostLinkClicks}
            />
          </Card>
        </div>
        <div className='col-12'>
          <Card noPadding>
            <SocialChartCard
              title={"Audience Growth"}
              data={audienceGrowthData}
            />
          </Card>
        </div>
        <div className='col-12'>
          <Card noPadding>
            <SocialChartCard title={"Impressions"} data={impressionData} />
          </Card>
        </div>
        <div className='col-12'>
          <Card noPadding>
            <SocialChartCard title={"Engagement"} data={engagementData} />
          </Card>
        </div>
        <div className='col-12'>
          <Card noPadding>
            <SocialChartCard
              title={"Engagement Rate"}
              data={engagementRateData}
            />
          </Card>
        </div>
        <div className='col-12'>
          <Card noPadding>
            <SocialChartCard title={"Video Views"} data={videoViewsData} />
          </Card>
        </div>
      
      </Space>
    </>
  );
}

export async function getServerSideProps(ctx) {
  let { token } = parseCookies(ctx);
  let reports;

  // from = filterDate[0]
  // until = filterDate[1]
  await axios
    .get(`https://api.patronpolitik.id/v1/social/9ywyaizkbc`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      reports = res.data.data;
      reports.cookies = token;
    })
    .catch((err) => {});
  return { props: { reports } };
}
