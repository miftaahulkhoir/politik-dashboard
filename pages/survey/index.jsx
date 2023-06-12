import { Grid, Space, notification } from "antd";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useEffect, useMemo, useState } from "react";
import { handleAccess } from "@/utils/helpers/handle-access-serverside";

import Card from "../../components/tilikanElements/card/Card";
import NameAvatar from "../../components/tilikanElements/nameAvatar/NameAvatar";
import HomeNavbar from "../../components/tilikanPageComponents/home/HomeNavbar";
import LegendContainer from "../../components/tilikanPageComponents/home/legend/LegendContainer";
import ResetContainer from "../../components/tilikanPageComponents/home/reset/ResetContainer";
import PanelContainer from "../../components/tilikanPageComponents/home/panel/PanelContainer";
import KoorData from "../../components/tilikanPageComponents/home/koor/KoorData";
import { getRandomColorByKey } from "../../utils/helpers/getRandomColor";
import { useFindAllSubordinateUsers, useUserRankings } from "../../utils/services/users";
import { TbDotsVertical } from "react-icons/tb";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useRouter } from "next/router";
import { ACCESS_LIST } from "@/constants/access-list";

const Centrifuge = require("centrifuge");

const CustomDataTable = dynamic(() => import("../../components/tilikanElements/customDataTable/CustomDataTable"), {
  ssr: false,
});
const LogCoordinateDrawer = dynamic(
  () => import("../../components/tilikanPageComponents/home/drawer/LogCoordinateDrawer"),
  {
    ssr: false,
  },
);
const HomeMap = dynamic(() => import("../../components/tilikanPageComponents/home/map/HomeMap"), {
  ssr: false,
});

const RegionQuestionDetailDrawer = dynamic(
  () => import("../../components/tilikanPageComponents/home/drawer/RegionQuestionDetailDrawer"),
  {
    ssr: false,
  },
);

export default function Index({
  profile,
  users,
  koordinator,
  relawan,
  pemilih,
  daftarhitam,
  kecamatan,
  occupations,
  surveys,
}) {
  const router = useRouter();

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
  const [center, setCenter] = useState({ lat: -2.6017, lng: 118.2578 });
  const [tempCenter, setTempCenter] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [data, setData] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const [isDetailed, setIsDetailed] = useState(false);
  const [selectedRegency, setSelectedRegency] = useState();
  const [includedDistricts, setIncludedDistricts] = useState([]);
  const centrifuge = new Centrifuge(process.env.WEBSOCKET_CREDENTIALS_HOST_TILIKAN);

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
  const [reports, setReports] = useState([]);

  const [selectedReport, setSelectedReport] = useState({});
  const [isReportDetailDrawerOpen, setIsReportDetailDrawerOpen] = useState(false);

  const [indexShownReportCategories, setIndexShownReportCategories] = useState([]); // Array<string> (the id)

  const filteredReports = useMemo(() => {
    return reports?.filter((report) => indexShownReportCategories.includes(report?.category?.id)) || [];
  }, [reports, indexShownReportCategories]);

  // LOGISTIK (seperti pengaduan)
  const [logistics, setLogistics] = useState([]);

  useEffect(() => {
    console.log(selectedRegency);
  }, [selectedRegency]);

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

  const handleResetData = () => {
    setData(originalData);
    setCenter({ lat: -7.2017, lng: 110.2578 });
  };

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

  const { users: koordinatorSubordinateUsers } = useFindAllSubordinateUsers();
  const { rankings } = useUserRankings({ userLevel: 2 });

  const totalRelawan = koordinatorSubordinateUsers.filter((v) => v?.occupation?.level === 3).length;
  const pemilihKoor = koordinatorSubordinateUsers.filter((v) => v?.occupation?.level === 4);

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
      grow: 2,
      selector: (row) => (
        <div className="d-flex align-items-center">
          <NameAvatar longName={row.name} />
          <div className="ml-12">{row.name}</div>
        </div>
      ),
    },
    {
      name: "Relawan",
      selector: (row) => row?.recruitment?.progess || 0,
    },
    {
      name: "Pemilih",
      selector: (row) => 0,
    },
    {
      name: "",
      selector: (row) => <span style={{ color: "#E80909" }}>{row?.occupation?.name || "NA"}</span>,
    },
    {
      name: "",
      width: "80px",
      selector: (row) => <TbDotsVertical style={{ cursor: "pointer" }} />,
    },
  ];

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
      <DashboardLayout
        title="Survey · Chakra"
        topBarConfig={{
          isShowSearchRegion: false,
          title: "Survey",
          onClickAnalysis: () => window.open("/survey/analysis", "_self"),
        }}
        profile={profile}
      >
        <div className="relative ml-[60px] h-[calc(100vh-78px)]">
          {contextHolderNotification}
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
              {isMounted && (
                // {/* {false && ( */}
                <div className="map" data-testid="index-admin-map">
                  <HomeMap
                    occupations={occupations}
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
                    originalDataState={{
                      originalData: originalData,
                      setOriginalData: setOriginalData,
                    }}
                    dataState={{
                      data: data,
                      setData: setData,
                    }}
                    resetState={{
                      isReset: isReset,
                      setIsReset: setIsReset,
                    }}
                    detailedState={{
                      isDetailed: isDetailed,
                      setIsDetailed: setIsDetailed,
                    }}
                    regencyState={{
                      selectedRegency: selectedRegency,
                      setSelectedRegency: setSelectedRegency,
                    }}
                    districtState={{
                      includedDistricts: includedDistricts,
                      setIncludedDistricts: setIncludedDistricts,
                    }}
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
                regencyState={{
                  selectedRegency: selectedRegency,
                  setSelectedRegency: setSelectedRegency,
                }}
                districtState={{
                  includedDistricts: includedDistricts,
                  setIncludedDistricts: setIncludedDistricts,
                }}
                occupations={occupations}
                surveys={surveys}
              />

              <LegendContainer
                data={legendData}
                selectedItem={selectedThematicFromLegend}
                selectedThematicFromLegend={selectedThematicFromLegend}
                onClickItem={(itemIndex) => setSelectedThematicFromLegend(itemIndex)}
                onClickResetSelectedItem={() => setSelectedThematicFromLegend(null)}
              />

              <ResetContainer
                selectedItem={selectedThematicFromLegend}
                selectedThematicFromLegend={selectedThematicFromLegend}
                onClickItem={(itemIndex) => setSelectedThematicFromLegend(itemIndex)}
                originalDataState={{
                  originalData: originalData,
                  setOriginalData: setOriginalData,
                }}
                dataState={{
                  data: data,
                  setData: setData,
                }}
                resetState={{
                  isReset: isReset,
                  setIsReset: setIsReset,
                }}
                setThematicSurveyResponses={setThematicSurveyResponses}
                setSelectedKPUYears={setSelectedKPUYears}
                setSelectedRegency={setSelectedRegency}
              />
            </>
          ) : (
            <>
              <div className="col-12 pdv-3 mb-12">
                <h1>Dashboard</h1>
              </div>

              <div className="col-12 mb-24">
                <Space direction="vertical" size="large">
                  <KoorData pemilih={pemilihKoor} totalRelawan={totalRelawan} />
                  <Card>
                    <div className="d-flex justify-content-between mb-12 mt-8">
                      <h2 style={{ fontSize: "16px", fontWeight: 600 }}>Peringkat Koordinator</h2>
                    </div>
                    <CustomDataTable columns={columns} data={koordinatorRankings} />
                  </Card>
                </Space>
              </div>
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  const { req } = ctx;
  // let baseURL = "";
  // if (`https://${req.headers.host}/` === process.env.APP_BASEURL_TILIKAN) {
  //   baseURL = process.env.APP_BASEURL_TILIKAN;
  // } else {
  //   baseURL = process.env.APP_BASEURL_LOCAL;
  // }

  await handleAccess(ctx, ACCESS_LIST.SURVEY);

  let kecamatan = [];
  let koordinator = [];
  let relawan = [];
  let pemilih = [];
  let daftarhitam = [];
  let users = [];
  let occupations = [];
  let surveys = [];
  await axios
    .get(`${process.env.API_BASEURL_TILIKAN_V1}/users`, {
      withCredentials: true,
      headers: { Cookie: `token=${process.env.API_SECRET_KEY_TILIKAN}` },
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
    .get(`${process.env.API_BASEURL_TILIKAN_V1}/distric`, {
      withCredentials: true,
      headers: { Cookie: `token=${process.env.API_SECRET_KEY_TILIKAN}` },
    })
    .then((res) => {
      kecamatan = res.data.data;
    })
    .catch((err) => {});

  await axios
    .get(`${process.env.API_BASEURL_TILIKAN_V1}/occupations`, {
      withCredentials: true,
      headers: { Cookie: `token=${process.env.API_SECRET_KEY_TILIKAN}` },
    })
    .then((res) => {
      occupations = res.data.data;
    })
    .catch((err) => {});
  await axios
    .get(`${process.env.API_BASEURL_TILIKAN_V1}/survey`, {
      withCredentials: true,
      headers: { Cookie: `token=${process.env.API_SECRET_KEY_TILIKAN}` },
    })
    .then((res) => {
      surveys = res.data.data;
    })
    .catch((err) => {});
  return {
    props: { users, koordinator, relawan, pemilih, daftarhitam, kecamatan, occupations, surveys },
  };
}
