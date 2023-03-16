import { Grid, notification } from "antd";
import axios from "axios";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useEffect, useMemo, useState } from "react";
import { TbDotsVertical } from "react-icons/tb";

import Card from "../components/elements/card/Card";
import NameAvatar from "../components/elements/nameAvatar/NameAvatar";
import SummaryCard from "../components/elements/summaryCard/SummaryCard";
import BlueCard from "../components/pagecomponents/home/BlueCard";
import ChartCard from "../components/pagecomponents/home/ChartCard";
import HomeNavbar from "../components/pagecomponents/home/HomeNavbar";
import LegendContainer from "../components/pagecomponents/home/legend/LegendContainer";
import PanelContainer from "../components/pagecomponents/home/panel/PanelContainer";
import LogisticDetailDrawer from "../components/pagecomponents/logistics/LogisticDetailDrawer";
import ReportDetailDrawer from "../components/pagecomponents/reports/ReportDetailDrawer";
import MobileNavbarBody from "../components/templates/navbar/MobileNavbarBody";
import { getRandomColorByKey } from "../utils/helpers/getRandomColor";
import { nameToShortName } from "../utils/helpers/nameToShortName";
import { useFindAllLogistics, useTotalLogistics } from "../utils/services/logistics";
import { useFindAllReports } from "../utils/services/reports";
import { useTotalPemilih, useTotalPemilihBaru, useTotalRelawan, useUserRankings } from "../utils/services/users";

const Centrifuge = require("centrifuge");

const CustomDataTable = dynamic(() => import("../components/elements/customDataTable/CustomDataTable"), { ssr: false });
const HomeMap = dynamic(() => import("../components/pagecomponents/home/map/HomeMap"), {
  ssr: false,
});
const LogCoordinateDrawer = dynamic(() => import("../components/pagecomponents/home/drawer/LogCoordinateDrawer"), {
  ssr: false,
});
const RegionQuestionDetailDrawer = dynamic(
  () => import("../components/pagecomponents/home/drawer/RegionQuestionDetailDrawer"),
  {
    ssr: false,
  },
);

export default function Index({ profile, users, koordinator, relawan, pemilih, daftarhitam, kecamatan }) {
  const [apiNotification, contextHolderNotification] = notification.useNotification();

  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState("data");
  const [dataKoordinator, setKoordinator] = useState(koordinator);
  const [dataRelawan, setRelawan] = useState(relawan);
  const [dataPemilih, setPemilih] = useState(pemilih);
  const [showKoordinator, setShowKoordinator] = useState(false);
  const [showRelawan, setShowRelawan] = useState(false);
  const [showPemilih, setShowPemilih] = useState(false);
  const [showBlackList, setShowBlackList] = useState(false);
  const [recenter, setRecenter] = useState(false);
  const [logCordinate, setLogCordinate] = useState([]);
  const [center, setCenter] = useState({ lat: -7.0335559, lng: 107.6589375 });
  const [tempCenter, setTempCenter] = useState([]);
  const centrifuge = new Centrifuge(process.env.WEBSOCKET_CREDENTIALS_HOST);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    centrifuge.connect();
    centrifuge.on("connect", function (ctx) {
      console.log("connected", ctx);
    });
    if (showKoordinator === true) {
      koordinator.forEach((element) => {
        centrifuge.subscribe(`ws/data/${element.id}/location`, function (ctx) {
          const newarr = [...koordinator];
          const id = newarr.findIndex((x) => x.id === element.id);
          newarr[id].latitude = ctx.data.latitude;
          newarr[id].longitude = ctx.data.longitude;
          setKoordinator(newarr);
        });
      });
    }
    // if (showKoordinator === true) {
    //   dataKoordinator.forEach((element) => {
    //     centrifuge.subscribe(`ws/data/${element.id}/location`, function (ctx) {
    //       const newarr = [...dataKoordinator];
    //       const id = newarr.findIndex((x) => x.id === element.id);
    //       newarr[id].latitude = ctx.data.latitude;
    //       newarr[id].longitude = ctx.data.longitude;
    //       setKoordinator(newarr);
    //     });
    //   });
    // }
  }, [showKoordinator]);

  useEffect(() => {
    centrifuge.connect();
    centrifuge.on("connect", function (ctx) {
      console.log("connected", ctx);
    });
    if (showRelawan === true) {
      relawan.forEach((element) => {
        centrifuge.subscribe(`ws/data/${element.id}/location`, function (ctx) {
          const newarr = [...relawan];
          const id = newarr.findIndex((x) => x.id === element.id);
          newarr[id].latitude = ctx.data.latitude;
          newarr[id].longitude = ctx.data.longitude;
          setRelawan(newarr);
        });
      });
    }
  }, [showRelawan]);

  const [selectedUser, setSelectedUser] = useState({});

  // LOG LOKASI RELAWAN DRAWER
  const [isLogCoordinateDrawerOpen, setIsLogCoordinateDrawerOpen] = useState(false);
  // END LOG LOKASI RELAWAN DRAWER

  // PENGADUAN
  const { reports: fetchReports } = useFindAllReports();
  const [reports, setReports] = useState([]);
  useEffect(() => {
    if (!fetchReports?.length) return;
    setReports(fetchReports);
  }, [fetchReports]);

  const [selectedReport, setSelectedReport] = useState({});
  const [isReportDetailDrawerOpen, setIsReportDetailDrawerOpen] = useState(false);

  const [indexShownReportCategories, setIndexShownReportCategories] = useState([]); // Array<string> (the id)

  const filteredReports = useMemo(() => {
    return reports?.filter((report) => indexShownReportCategories.includes(report?.category?.id)) || [];
  }, [reports, indexShownReportCategories]);

  // LOGISTIK (seperti pengaduan)
  const { logistics: fetchLogistics } = useFindAllLogistics();
  const [logistics, setLogistics] = useState([]);
  useEffect(() => {
    if (!fetchLogistics?.length) return;
    setLogistics(fetchLogistics);
  }, [fetchLogistics]);

  const [selectedLogistic, setSelectedLogistic] = useState({});
  const [isLogisticDetailDrawerOpen, setIsLogisticDetailDrawerOpen] = useState(false);

  const [indexShownLogisticCategories, setIndexShownLogisticCategories] = useState([]); // Array<string> (the id)

  const filteredLogistics = useMemo(() => {
    return logistics?.filter((logistic) => indexShownLogisticCategories.includes(logistic?.category?.id)) || [];
  }, [logistics, indexShownLogisticCategories]);

  // -- user occupations
  const [selectedOccupations, setSelectedOccupations] = useState([]);

  // END PENGADUAN

  // TEMATIK ===================================
  // survey
  const [selectedQuestions, setSelectedQuestions] = useState([]); // Array<string> -> string: surveyid,questionid

  // data kpu
  const [selectedKPUYears, setSelectedKPUYears] = useState([]);

  // on click
  const [isRegionQuestionDetailDrawerOpen, setIsRegionQuestionDetailDrawerOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

  // multi survey
  const [thematicSurveyResponses, setThematicSurveyResponses] = useState([]);

  const [selectedThematicFromLegend, setSelectedThematicFromLegend] = useState(null);

  // END TEMATIK ===================================

  // PILIH LEVEL REGION ===================================
  const [selectedRegionLevel, setSelectedRegionLevel] = useState(1);
  // END PILIH LEVEL REGION ===================================

  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
      width: "80px",
      center: true,
      sortable: true,
    },
    {
      name: "Nama Koordinator",
      grow: 3,
      selector: (row) => (
        <div className="d-flex align-items-center">
          <NameAvatar longName={row.name} />
          <div className="ml-12">{row.name}</div>
        </div>
      ),
    },
    {
      name: "Relawan",
      selector: (row) => row.relawan || 0 + " relawan",
    },
    {
      name: "Pemilih",
      selector: (row) => row.pemilih || 0 + " pemilih",
    },
    {
      name: "",
      selector: (row) => <span style={{ color: "#016CEE" }}>{row.occupation.name}</span>,
    },
    {
      name: "",
      selector: (row) => <TbDotsVertical />,
      width: "45px",
    },
  ];

  const handleColor = (col) => {
    let color = "";
    switch (col) {
      case "Koordinator":
        color = "#e74c3c";
        break;
      case "Relawan":
        color = "#3498db";
        break;
      case "General User":
        color = "#2ecc71";
        break;
      case "Daftar Hitam":
        color = "#34495e";
        break;
    }
    return color;
  };

  const handleCenter = () => {
    // setUserLogCordinate(false);
    setIsLogCoordinateDrawerOpen(false);
    setLogCordinate([]);
    setRecenter(true);
  };

  // MOBILE NAVBAR
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  const screens = Grid.useBreakpoint();

  const smallDevice = useMemo(() => {
    const val = !screens.xl && !screens.xxl;
    return val;
  }, [screens]);

  const legendData = useMemo(() => {
    const lastQuestionResponse = thematicSurveyResponses?.at(-1);
    const data = lastQuestionResponse?.options?.map((option, i) => ({
      text: option,
      color: lastQuestionResponse?.color[i] || getRandomColorByKey(i),
    }));
    return data;
  }, [thematicSurveyResponses]);

  const { value: totalRelawan } = useTotalRelawan();
  const { value: totalPemilih } = useTotalPemilih();
  const { value: totalLogistics } = useTotalLogistics();
  const { totalPemilihBaru, dateString: pemilihBaruDateString } = useTotalPemilihBaru();
  const { rankings } = useUserRankings({ userLevel: 2 });
  const starCoordinatorShortNameList = rankings.slice(0, 5).map((v) => nameToShortName(v.name));

  const koordinatorRankings = useMemo(() => {
    return rankings?.map((v, i) => {
      v.no = i + 1;
      return v;
    });
  }, [rankings]);

  return (
    <>
      <Head>
        <title>Dashboard · Patrons</title>
      </Head>

      {contextHolderNotification}

      <ReportDetailDrawer
        open={isReportDetailDrawerOpen}
        setOpen={setIsReportDetailDrawerOpen}
        selectedReport={selectedReport}
        setReports={setReports}
        apiNotification={apiNotification}
      />

      <LogisticDetailDrawer
        open={isLogisticDetailDrawerOpen}
        setOpen={setIsLogisticDetailDrawerOpen}
        selectedLogistic={selectedLogistic}
      />

      <LogCoordinateDrawer
        open={isLogCoordinateDrawerOpen}
        setOpen={setIsLogCoordinateDrawerOpen}
        data={logCordinate}
        selectedUser={selectedUser}
      />

      <RegionQuestionDetailDrawer
        open={isRegionQuestionDetailDrawerOpen}
        setOpen={setIsRegionQuestionDetailDrawerOpen}
        selectedRegion={selectedRegion}
        selectedRegionLevel={selectedRegionLevel}
      />

      {profile?.occupation?.level === 1 ? (
        <>
          <MobileNavbarBody active={isNavbarActive} setActive={setIsNavbarActive} xs={screens.xs} />

          <HomeNavbar xs={screens.xs} smallDevice={smallDevice} setActive={setIsNavbarActive} />

          {isMounted && (
            // {/* {false && ( */}
            <div className="map">
              <HomeMap
                showKoordinator={showKoordinator}
                dataKoordinator={dataKoordinator}
                showRelawan={showRelawan}
                dataRelawan={dataRelawan}
                showPemilih={showPemilih}
                dataPemilih={dataPemilih}
                showBlackList={showBlackList}
                dataBlackList={daftarhitam}
                tempCenter={tempCenter}
                setTempCenter={setTempCenter}
                center={center}
                setCenter={setCenter}
                userLogCordinate={isLogCoordinateDrawerOpen}
                setUserLogCordinate={setIsLogCoordinateDrawerOpen}
                recenter={recenter}
                setRecenter={setRecenter}
                logCordinate={logCordinate}
                setLogCordinate={setLogCordinate}
                handleColor={handleColor}
                reports={filteredReports}
                indexShownReportCategories={indexShownReportCategories}
                setSelectedReport={setSelectedReport}
                logistics={filteredLogistics}
                setSelectedLogistic={setSelectedLogistic}
                setIsLogisticDetailDrawerOpen={setIsLogisticDetailDrawerOpen}
                setSelectedUser={setSelectedUser}
                setIsReportDetailDrawerOpen={setIsReportDetailDrawerOpen}
                thematicSurveyResponses={thematicSurveyResponses}
                setIsRegionQuestionDetailDrawerOpen={setIsRegionQuestionDetailDrawerOpen}
                setSelectedRegion={setSelectedRegion}
                selectedRegionLevel={selectedRegionLevel}
                selectedThematicFromLegend={selectedThematicFromLegend}
              />
            </div>
          )}

          <PanelContainer
            spreadData={[
              {
                name: "Total koordinator",
                total: koordinator.length,
              },
              {
                name: "Total relawan",
                total: relawan.length,
              },
              {
                name: "Total kecamatan",
                total: kecamatan.length,
              },
              {
                name: "Total pemilih",
                total: pemilih.length,
              },
              {
                name: "Total daftar hitam",
                total: daftarhitam.length,
              },
            ]}
            thematicSurveyResponses={thematicSurveyResponses}
            setThematicSurveyResponses={setThematicSurveyResponses}
            showUsers={{
              setShowKoordinator: setShowKoordinator,
              setShowRelawan: setShowRelawan,
              setShowPemilih: setShowPemilih,
              setShowBlackList: setShowBlackList,
            }}
            occupationState={{
              selectedOccupations: selectedOccupations,
              setSelectedOccupations: setSelectedOccupations,
            }}
            reportState={{
              selectedReportCategories: indexShownReportCategories,
              setSelectedReportCategories: setIndexShownReportCategories,
            }}
            logisticState={{
              selectedLogisticCategories: indexShownLogisticCategories,
              setSelectedLogisticCategories: setIndexShownLogisticCategories,
            }}
            surveyState={{
              selectedQuestions: selectedQuestions,
              setSelectedQuestions: setSelectedQuestions,
            }}
            kpuState={{
              selectedKPUYears: selectedKPUYears,
              setSelectedKPUYears: setSelectedKPUYears,
            }}
            regionState={{
              selectedRegionLevel: selectedRegionLevel,
              setSelectedRegionLevel: setSelectedRegionLevel,
            }}
          />

          <LegendContainer
            data={legendData}
            selectedItem={selectedThematicFromLegend}
            selectedThematicFromLegend={selectedThematicFromLegend}
            onClickItem={(itemIndex) => setSelectedThematicFromLegend(itemIndex)}
            onClickResetSelectedItem={() => setSelectedThematicFromLegend(null)}
          />
        </>
      ) : (
        <>
          <div className="col-12 pdv-3 mb-12">
            <h1>Dashboard</h1>
          </div>

          <div
            className={clsx({
              "mb-24": true,
              "col-12": screens.xs,
              "col-6": screens.md && screens.lg === false,
              "col-3": screens.lg,
            })}
          >
            <SummaryCard title="Total relawan" number={totalRelawan} />
          </div>
          <div
            className={clsx({
              "mb-24": true,
              "col-12": screens.xs,
              "col-6": screens.md && screens.lg === false,
              "col-3": screens.lg,
            })}
          >
            <SummaryCard title="Total pemilih" number={totalPemilih} />
          </div>
          <div
            className={clsx({
              "mb-24": true,
              "col-12": screens.xs,
              "col-6": screens.md && screens.lg === false,
              "col-3": screens.lg,
            })}
          >
            <SummaryCard title="Total logistik" subtitle="Satuan rupiah" number={totalLogistics} />
          </div>
          <div
            className={clsx({
              "mb-24": true,
              "col-12": screens.xs,
              "col-6": screens.md && screens.lg === false,
              "col-3": screens.lg,
            })}
          >
            <SummaryCard title="Pemilih baru" subtitle={pemilihBaruDateString} number={totalPemilihBaru} />
          </div>
          {/* NOT READY */}
          {/* <div
            className={clsx({
              "mb-24": true,
              "col-12": screens.xs,
              "col-6": screens.md,
            })}
          >
            <Card noPadding>
              <ChartCard dataX={["Jan", "Feb", "Mar", "Apr", "Jun", "Jul"]} dataY={[140, 232, 101, 264, 90, 340]} />
            </Card>
          </div> */}
          <div
            className={clsx({
              "mb-24": true,
              "col-12": true,
            })}
          >
            <BlueCard numberOfVoters={totalPemilih} starCoordinatorShortNameList={starCoordinatorShortNameList} />
          </div>
          <div className="col-12 mb-24">
            <Card>
              <div className="d-flex justify-content-between mb-12 mt-8">
                <h2 style={{ fontSize: "16px", fontWeight: 600 }}>Peringkat Koordinator</h2>
              </div>
              <CustomDataTable columns={columns} data={koordinatorRankings} />
            </Card>
          </div>
        </>
      )}
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

  let kecamatan = [];
  let koordinator = [];
  let relawan = [];
  let pemilih = [];
  let daftarhitam = [];
  let users = [];
  await axios
    .get(`${baseURL}api/users`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      users = res.data.data;
      koordinator = res.data.data.filter((x) => x.occupation?.level === 2);
      relawan = res.data.data.filter((x) => x.occupation?.level === 3);
      pemilih = res.data.data.filter((x) => x.occupation?.level === 4);
      daftarhitam = res.data.data.filter((x) => x.occupation?.level === 5);
    })
    .catch((err) => {});
  await axios
    .get(`${baseURL}api/distric`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      kecamatan = res.data.data;
    })
    .catch((err) => {});
  return {
    props: { users, koordinator, relawan, pemilih, daftarhitam, kecamatan },
  };
}
