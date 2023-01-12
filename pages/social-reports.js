import { notification } from 'antd'
import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Head from 'next/head'
import DataTable from "react-data-table-component";
import Card from '../components/elements/card/Card';
import SummaryCard from '../components/elements/summaryCard/SummaryCard';
import BlueCard from '../components/pagecomponents/home/BlueCard';
import SocialChartCard from '../components/pagecomponents/home/SocialChartCard';
import SocialSummaryCard from '../components/pagecomponents/home/SocialSummaryCard';
export default function Users(pageProps) {
  const [summaryImpressions, setSummaryImpressions] = useState(null);
  const [summaryEngagements, setSummaryEngagements] = useState(null);
  const [summaryEngagementRate, setSummaryEngagementRate] = useState(null);
  const [summaryPostLinkClicks, setSummaryPostLinkClicks] = useState(null);
  const [audienceGrowthData, setAudienceGrowthData] = useState([]);
  const [impressionData, setImpressionData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [engagementRateData, setEngagementRateData] = useState([]);
  const [videoViewsData, setVideoViewsData] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");

  const [apiNotification, contextHolderNotification] = notification.useNotification();

  useEffect(() => {
    console.log(pageProps.reports);
    if (!pageProps?.reports) return;
    
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

  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "80px",
      center: true,
      sortable: true,
    },
    {
      name: "NIK",
      width: "80px",
      selector: (row) => row.NIK,
    },
    {
      name: "Nama",
      selector: (row) => row?.name,
    },
    {
      name: "Jenis Kelamin",
      selector: (row) => row?.gender,
      width: "150px",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Aksi",
      selector: (row) => "",
      width: "220px",
      sortable: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#fafafa",
      },
    },
  };

  const handleSearch = (search) => {
    setSearch(search);
    let getlist = usersList.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );
    getlist.forEach((element, index) => {
      getlist[index].no = index + 1;
    });
    setSearchList(getlist);
  };

  return (
    <>
      <Head>
        <title>Sentimen Analisis · Patrons</title>
      </Head>

      {contextHolderNotification}

      <div className="col-12 mb-24">
        <SocialSummaryCard
          title={"Performance Summary"}
          subtitle={"View your key profile performance metrics from the reporting period."}
          impressions={summaryImpressions}
          engagements={summaryEngagements}
          engagementRate={summaryEngagementRate}
          postLinkClicks={summaryPostLinkClicks}
        />
      </div>
      <div className="col-12 mb-24">
        <Card noPadding>
          <SocialChartCard
            title={'Audience Growth'}
            data={audienceGrowthData}
          />
        </Card>
      </div>
      <div className="col-12 mb-24">
        <Card noPadding>
          <SocialChartCard
            title={'Impressions'}
            data={impressionData}
          />
        </Card>
      </div>
      <div className="col-12 mb-24">
        <Card noPadding>
          <SocialChartCard
            title={'Engagement'}
            data={engagementData}
          />
        </Card>
      </div>
      <div className="col-12 mb-24">
        <Card noPadding>
          <SocialChartCard
            title={'Engagement Rate'}
            data={engagementRateData}
          />
        </Card>
      </div>
      <div className="col-12 mb-24">
        <Card noPadding>
          <SocialChartCard
            title={'Video Views'}
            data={videoViewsData}
          />
        </Card>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  let { token } = parseCookies(ctx);
  let reports;
  await axios
    .get(`https://api.patronpolitik.id/v1/social/9ywyaizkbc`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      console.log(res)
      reports = res.data.data;
    })
    .catch((err) => {});
  return { props: { reports } };
}
