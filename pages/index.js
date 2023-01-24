import axios from "axios";
import moment from "moment/moment";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useMemo, useState } from "react";
import { TbDotsVertical } from "react-icons/tb";

import Card from "../components/elements/card/Card";
import NameAvatar from "../components/elements/nameAvatar/NameAvatar";
import SummaryCard from "../components/elements/summaryCard/SummaryCard";
import BlueCard from "../components/pagecomponents/home/BlueCard";
import ChartCard from "../components/pagecomponents/home/ChartCard";
import HomeNavbar from "../components/pagecomponents/home/HomeNavbar";

const Centrifuge = require("centrifuge");

const HomeMap = dynamic(() => import("../components/pagecomponents/home/HomeMap"), {
  ssr: false,
});

const CustomDataTable = dynamic(() => import("../components/elements/customDataTable/CustomDataTable"), { ssr: false });

export default function Index({ profile, users, koordinator, relawan, pemilih, daftarhitam, kecamatan }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState("data");
  const [dataKoordinator, setKoordinator] = useState([]);
  const [dataRelawan, setRelawan] = useState([]);
  const [dataPemilih, setPemilih] = useState([]);
  const [showKoordinator, setShowKoordinator] = useState(false);
  const [showRelawan, setShowRelawan] = useState(false);
  const [showPemilih, setShowPemilih] = useState(false);
  const [showBlackList, setShowBlackList] = useState(false);
  const [userLogCordinate, setUserLogCordinate] = useState(false);
  const [recenter, setRecenter] = useState(false);
  const [logCordinate, setLogCordinate] = useState([]);
  const [center, setCenter] = useState({ lat: -7.0335559, lng: 107.6589375 });
  const [tempCenter, setTempCenter] = useState([]);
  const centrifuge = new Centrifuge(process.env.WEBSOCKET_CREDENTIALS_HOST);

  useEffect(() => {
    setIsMounted(true);
    koordinator.forEach((element, index) => {
      axios
        .get(`${process.env.APP_BASEURL}api/data-mapping/last?userid=${element.id}`)
        .then((res) => {
          const lastLoc = { ...element };
          lastLoc.latitude = res.data.data?.latitude || lastLoc.latitude;
          lastLoc.longitude = res.data.data?.longitude || lastLoc.longitude;
          setKoordinator((prev) => [...prev, lastLoc]);
        })
        .catch((err) => {
          const lastLoc = { ...element };
          setKoordinator((prev) => [...prev, lastLoc]);
        });
    });
    relawan.forEach((element, index) => {
      axios
        .get(`${process.env.APP_BASEURL}api/data-mapping/last?userid=${element.id}`)
        .then((res) => {
          const lastLoc = { ...element };
          lastLoc.latitude = res.data.data?.latitude || lastLoc.latitude;
          lastLoc.longitude = res.data.data?.longitude || lastLoc.longitude;
          setRelawan((prev) => [...prev, lastLoc]);
        })
        .catch((err) => {
          const lastLoc = { ...element };
          setRelawan((prev) => [...prev, lastLoc]);
        });
    });
    pemilih.forEach((element, index) => {
      axios
        .get(`${process.env.APP_BASEURL}api/response?respondentid=${element.id}`)
        .then((res) => {
          const lastLoc = { ...element };
          lastLoc.latitude = res.data.data[0]?.location?.latitude || lastLoc.latitude;
          lastLoc.longitude = res.data.data[0]?.location?.longitude || lastLoc.longitude;
          setPemilih((prev) => [...prev, lastLoc]);
        })
        .catch((err) => {
          const lastLoc = { ...element };
          setPemilih((prev) => [...prev, lastLoc]);
        });
    });
  }, []);

  useEffect(() => {
    centrifuge.connect();
    centrifuge.on("connect", function (ctx) {
      console.log("connected", ctx);
    });
    if (showKoordinator === true) {
      dataKoordinator.forEach((element) => {
        centrifuge.subscribe(`ws/data/${element.id}/location`, function (ctx) {
          const newarr = [...dataKoordinator];
          const id = newarr.findIndex((x) => x.id === element.id);
          newarr[id].latitude = ctx.data.latitude;
          newarr[id].longitude = ctx.data.longitude;
          setKoordinator(newarr);
        });
      });
    }
  }, [showKoordinator]);

  useEffect(() => {
    centrifuge.connect();
    centrifuge.on("connect", function (ctx) {
      console.log("connected", ctx);
    });
    if (showRelawan === true) {
      dataRelawan.forEach((element) => {
        centrifuge.subscribe(`ws/data/${element.id}/location`, function (ctx) {
          const newarr = [...dataRelawan];
          const id = newarr.findIndex((x) => x.id === element.id);
          newarr[id].latitude = ctx.data.latitude;
          newarr[id].longitude = ctx.data.longitude;
          setRelawan(newarr);
        });
      });
    }
  }, [showRelawan]);

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
    setUserLogCordinate(false);
    setLogCordinate([]);
    setRecenter(true);
  };

  return (
    <>
      <Head>
        <title>Dashboard · Patrons</title>
      </Head>
      {profile?.occupation?.level === 1 ? (
        <>
          <HomeNavbar />
          <div className="left-content">
            <div className="card">
              <div className="card-body p-0">
                <ul className="nav">
                  {userLogCordinate === true && (
                    <li className={userLogCordinate === true ? "nav-item actives" : "nav-item"}>
                      <a className="nav-link" onClick={() => handleCenter()}>
                        <i className="fa fa-close"></i>
                      </a>
                    </li>
                  )}
                  {userLogCordinate === false && (
                    <>
                      <li className={position === "data" ? "nav-item actives" : "nav-item"}>
                        <a className="nav-link" onClick={() => setPosition("data")}>
                          <i className="fa fa-list"></i>
                        </a>
                      </li>
                      <li className={position === "persebaran" ? "nav-item actives" : "nav-item"} onClick={() => setPosition("persebaran")}>
                        <a className="nav-link">Persebaran</a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="col-12 search-list">
                {position === "data" && userLogCordinate === false && (
                  <>
                    <h4>Data Koordinator</h4>
                    <hr />
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Total Koordinator</th>
                          <th>Total Relawan</th>
                          <th>Total Kecamatan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{koordinator.length} Koordinator</td>
                          <td>{relawan.length} Relawan</td>
                          <td>{kecamatan.length} Kecamatan</td>
                        </tr>
                      </tbody>
                    </table>
                    <br />
                    <h4>Data Relawan</h4>
                    <hr />
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Total Pemilih</th>
                          <th>Pemilih Terjangkau</th>
                          <th>Daftar Hitam</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{pemilih.length}</td>
                          <td>{pemilih.length}</td>
                          <td>{daftarhitam.length}</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
                {position === "persebaran" && userLogCordinate === false && (
                  <>
                    <div className="form-group d-flex justify-content-left">
                      <input
                        type="checkbox"
                        defaultChecked={showKoordinator}
                        onClick={() => {
                          setShowKoordinator(!showKoordinator);
                        }}
                      ></input>
                      <div className="circle-cordinator"></div>
                      <label>Koordinator</label>
                    </div>
                    <div className="form-group d-flex justify-content-left">
                      <input
                        type="checkbox"
                        defaultChecked={showRelawan}
                        onClick={() => {
                          setShowRelawan(!showRelawan);
                        }}
                      ></input>
                      <div className="circle-relawan"></div>
                      <label>Relawan</label>
                    </div>
                    <div className="form-group d-flex justify-content-left">
                      <input
                        type="checkbox"
                        defaultChecked={showPemilih}
                        onClick={() => {
                          setShowPemilih(!showPemilih);
                        }}
                      ></input>
                      <div className="circle-pemilih"></div>
                      <label>Pemilih</label>
                    </div>
                    <div className="form-group d-flex justify-content-left">
                      <input
                        type="checkbox"
                        defaultChecked={showBlackList}
                        onClick={() => {
                          setShowBlackList(!showBlackList);
                        }}
                      ></input>
                      <div className="circle-hitam"></div>
                      <label>Daftar Hitam</label>
                    </div>
                  </>
                )}
                {userLogCordinate === true && (
                  <table className="table table-bordered my-2">
                    <thead>
                      <tr>
                        <th>Lokasi</th>
                        <th>Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logCordinate.map((cordinate, index) => (
                        <tr key={index}>
                          <td>{cordinate.locationName}</td>
                          <td>{moment.utc(cordinate.timestamp).local().format("H:mm D/M/Y")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {isMounted && (
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
                userLogCordinate={userLogCordinate}
                setUserLogCordinate={setUserLogCordinate}
                recenter={recenter}
                setRecenter={setRecenter}
                logCordinate={logCordinate}
                setLogCordinate={setLogCordinate}
                handleColor={handleColor}
              />
            </div>
          )}
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
  let kecamatan = [];
  let koordinator = [];
  let relawan = [];
  let pemilih = [];
  let daftarhitam = [];
  let users = [];
  await axios
    .get(`${process.env.APP_BASEURL}api/users`, {
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
    .get(`${process.env.APP_BASEURL}api/distric`, {
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
