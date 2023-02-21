import { Grid, notification } from "antd";
import axios from "axios";
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
import PanelContainer from "../components/pagecomponents/home/panel/PanelContainer";
import ReportDetailDrawer from "../components/pagecomponents/reports/ReportDetailDrawer";
import MobileNavbarBody from "../components/templates/navbar/MobileNavbarBody";
import { useFindAllReports } from "../utils/services/reports";

const Centrifuge = require("centrifuge");

const CustomDataTable = dynamic(() => import("../components/elements/customDataTable/CustomDataTable"), { ssr: false });
const HomeMap = dynamic(() => import("../components/pagecomponents/home/map/HomeMap"), {
  ssr: false,
});
const LogCoordinateDrawer = dynamic(() => import("../components/pagecomponents/home/drawer/LogCoordinateDrawer"), {
  ssr: false,
});

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

  // -- user occupations
  const [selectedOccupations, setSelectedOccupations] = useState([]);

  // END PENGADUAN

  // TEMATIK ===================================
  // survey
  const [selectedQuestions, setSelectedQuestions] = useState([]); // string -> surveyid,questionid

  // multi survey
  const [thematicSurveyResponses, setThematicSurveyResponses] = useState([]);

  // END TEMATIK ===================================

  const ranks = useMemo(() => {
    return users?.map((user, i) => {
      user.no = i + 1;
      return user;
    });
  }, [users]);

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

      <LogCoordinateDrawer
        open={isLogCoordinateDrawerOpen}
        setOpen={setIsLogCoordinateDrawerOpen}
        data={logCordinate}
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
                setIsReportDetailDrawerOpen={setIsReportDetailDrawerOpen}
                thematicSurveyResponses={thematicSurveyResponses}
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
            stateSelected={{
              selectedReportCategories: indexShownReportCategories,
              setSelectedReportCategories: setIndexShownReportCategories,
              selectedOccupations: selectedOccupations,
              setSelectedOccupations: setSelectedOccupations,
            }}
            surveyState={{
              selectedQuestions: selectedQuestions,
              setSelectedQuestions: setSelectedQuestions,
            }}
          />
        </>
      ) : (
        <>
          <div className="col-12 pdv-3 mb-12">
            <h1>Dashboard</h1>
          </div>

          <div className="col-3 mb-24">
            <SummaryCard title="Total relawan" number={425} stat={-0.051} />
          </div>
          <div className="col-3 mb-24">
            <SummaryCard title="Total pemilih" number={6875} stat={0.128} />
          </div>
          <div className="col-3 mb-24">
            <SummaryCard title="Total logistik" subtitle="satuan rupiah" number={192092251} stat={-0.121} />
          </div>
          <div className="col-3 mb-24">
            <SummaryCard title="Pemilih baru" subtitle="2 Des 2022" number={6875} stat={0.041} />
          </div>
          <div className="col-6 mb-24">
            <Card noPadding>
              <ChartCard dataX={["Jan", "Feb", "Mar", "Apr", "Jun", "Jul"]} dataY={[140, 232, 101, 264, 90, 340]} />
            </Card>
          </div>
          <div className="col-6 mb-24">
            <BlueCard />
          </div>
          <div className="col-12 mb-24">
            <Card>
              <div className="d-flex justify-content-between mb-12 mt-8">
                <h2 style={{ fontSize: "16px", fontWeight: 600 }}>Peringkat Koordinator</h2>
              </div>
              <CustomDataTable columns={columns} data={ranks} />
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
