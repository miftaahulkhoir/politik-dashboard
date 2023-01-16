import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect, useMemo, useState } from 'react';
import { TbDotsVertical } from 'react-icons/tb';
import Card from '../components/elements/card/Card';
import styles from '../components/elements/map/Home.module.css';
import NameAvatar from '../components/elements/nameAvatar/NameAvatar';
import SummaryCard from '../components/elements/summaryCard/SummaryCard';
import BlueCard from '../components/pagecomponents/home/BlueCard';
import ChartCard from '../components/pagecomponents/home/ChartCard';
import { logoutUser } from '../utils/auth';

const Map = dynamic(() => import('../components/elements/map/Map'), {
  ssr: false,
});

const CustomDataTable = dynamic(
  () => import('../components/elements/customDataTable/CustomDataTable'),
  { ssr: false }
);

export default function Index({
  profile,
  users,
  kordinator,
  relawan,
  pemilih,
  daftarhitam,
  kecamatan,
}) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [zoom, setZoom] = useState(12.3);
  const [cordinate, setCordinate] = useState([-7.0335559, 107.6589375]);
  const [position, setPosition] = useState('data');
  const [showKoordinator, setShowKoordinator] = useState(false);
  const [showRelawan, setShowRelawan] = useState(false);
  const [showPemilih, setShowPemilih] = useState(false);
  const [showBlackList, setShowBlackList] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    if (window.screen.width === 1366) {
      setZoom(11.8);
    }
  }, []);

  const ranks = useMemo(() => {
    return users.map((user, i) => {
      user.no = i + 1;
      return user;
    });
  }, [users]);

  const columns = [
    {
      name: 'No',
      selector: (row) => row.no,
      width: '80px',
      center: true,
      sortable: true,
    },
    {
      name: 'Nama Koordinator',
      grow: 3,
      selector: (row) => (
        <div className="d-flex align-items-center">
          <NameAvatar longName={row.name} />
          <div className="ml-12">{row.name}</div>
        </div>
      ),
    },
    {
      name: 'Relawan',
      selector: (row) => row.relawan || 0 + ' relawan',
    },
    {
      name: 'Pemilih',
      selector: (row) => row.pemilih || 0 + ' pemilih',
    },
    {
      name: '',
      selector: (row) => (
        <span style={{ color: '#016CEE' }}>{row.occupation.name}</span>
      ),
    },
    {
      name: '',
      selector: (row) => <TbDotsVertical />,
      width: '45px',
    },
  ];

  const handleColor = (col) => {
    let color = '';
    switch (col) {
      case 'Koordinator':
        color = '#e74c3c';
        break;
      case 'Relawan':
        color = '#3498db';
        break;
      case 'General User':
        color = '#2ecc71';
        break;
      case 'Daftar Hitam':
        color = '#34495e';
        break;
    }
    return color;
  };

  return (
    <>
      <Head>
        <title>Dashboard · Patrons</title>
      </Head>
      {profile.occupation.level === 1 ? (
        <>
          <header className="codex-header-admin">
            <div className="custom-container">
              <div className="row">
                <div className="col-12">
                  <div className="header-contian d-flex justify-content-between">
                    <div className="logo-gridwrap">
                      <a className="codexbrand-logo">
                        <img
                          style={{ width: '40px' }}
                          src={`${process.env.APP_BASEURL}images/logo/icon-logo.png`}
                          alt="theeme-logo"
                        />
                        <img
                          className="img-fluid"
                          style={{ width: '100px' }}
                          src={`${process.env.APP_BASEURL}images/logo/logo.png`}
                          alt="theeme-logo"
                        />
                      </a>
                    </div>
                    <div>
                      <ul className="nav menu-admin">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            onClick={() => router.replace('/surveys')}
                          >
                            Manajemen Survei
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            onClick={() => router.replace('/ongoing')}
                          >
                            Analitik Survei
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            onClick={() => router.replace('/social-reports')}
                          >
                            Sentimen Analisis
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            onClick={() => router.replace('/blast')}
                          >
                            WhatsApp Blast
                          </a>
                        </li>
                        <li>
                          <a className="nav-link">More Menu</a>
                          <div className="hover-dropdown navprofile-drop">
                            <ul>
                              <li>
                                <a onClick={() => router.replace('/ongoing')}>
                                  Report Kegiatan
                                </a>
                              </li>
                              <li>
                                <a onClick={() => router.replace('/ongoing')}>
                                  Manajemen Event
                                </a>
                              </li>
                              <li>
                                <a onClick={() => router.replace('/ongoing')}>
                                  Pengaduan
                                </a>
                              </li>
                              <li>
                                <a onClick={() => router.replace('/users')}>
                                  Manajemen User
                                </a>
                              </li>
                              <li>
                                <a onClick={() => router.replace('/ongoing')}>
                                  Manajemen Akses Admin
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>

                        <li className="nav-profile mx-5">
                          <a>
                            <div className="media">
                              <div className="user-icon">
                                <img
                                  className="img-fluid rounded-50"
                                  style={{ width: '40px' }}
                                  src={`${process.env.APP_BASEURL}images/avtar/3.jpg`}
                                  alt="logo"
                                />
                              </div>
                            </div>
                          </a>
                          <div className="hover-dropdown navprofile-drop">
                            <ul>
                              <li>
                                <a>
                                  <i className="ti-user"></i>profile
                                </a>
                              </li>
                              <li>
                                <a>
                                  <i className="ti-email"></i>inbox
                                </a>
                              </li>
                              <li>
                                <a>
                                  {' '}
                                  <i className="ti-settings"></i>setting{' '}
                                </a>
                              </li>
                              <li onClick={() => logoutUser()}>
                                {' '}
                                <a>
                                  <i className="fa fa-sign-out"></i>log out
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="left-content">
            <div className="card">
              <div className="card-body p-0">
                <ul className="nav">
                  <li
                    className={
                      position === 'data' ? 'nav-item actives' : 'nav-item'
                    }
                  >
                    <a className="nav-link" onClick={() => setPosition('data')}>
                      <i className="fa fa-list"></i>
                    </a>
                  </li>
                  <li
                    className={
                      position === 'persebaran'
                        ? 'nav-item actives'
                        : 'nav-item'
                    }
                    onClick={() => setPosition('persebaran')}
                  >
                    <a className="nav-link">Persebaran</a>
                  </li>
                </ul>
              </div>
              <div className="col-12 search-list">
                {position === 'data' && (
                  <>
                    <h4>Data Kordinator</h4>
                    <hr />
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Total Kordinator</th>
                          <th>Total Relawan</th>
                          <th>Total Kecamatan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{kordinator.length} Kordinator</td>
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
                          <td>{pemilih.length - 10}</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
                {position === 'persebaran' && (
                  <>
                    <div className="form-group d-flex justify-content-left">
                      <input
                        type="checkbox"
                        defaultChecked={showKoordinator}
                        onClick={() => setShowKoordinator(!showKoordinator)}
                      ></input>
                      <div className="circle-cordinator"></div>
                      <label>Kordinator</label>
                    </div>
                    <div className="form-group d-flex justify-content-left">
                      <input
                        type="checkbox"
                        defaultChecked={showRelawan}
                        onClick={() => setShowRelawan(!showRelawan)}
                      ></input>
                      <div className="circle-relawan"></div>
                      <label>Relawan</label>
                    </div>
                    <div className="form-group d-flex justify-content-left">
                      <input
                        type="checkbox"
                        defaultChecked={showPemilih}
                        onClick={() => setShowPemilih(!showPemilih)}
                      ></input>
                      <div className="circle-pemilih"></div>
                      <label>Pemilih</label>
                    </div>
                    <div className="form-group d-flex justify-content-left">
                      <input
                        type="checkbox"
                        defaultChecked={showBlackList}
                        onClick={() => setShowBlackList(!showBlackList)}
                      ></input>
                      <div className="circle-hitam"></div>
                      <label>Daftar Hitam</label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {isMounted && (
            <div className="map">
              <Map
                className={styles.homeMap}
                center={cordinate}
                cordinate={cordinate}
                zoom={zoom}
                zoomTo={zoom}
              >
                {({ TileLayer, CircleMarker, Marker, Polygon, Tooltip }) => (
                  <>
                    <TileLayer
                      className="map"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osorg/copyright">OpenStreetMap</a> contributors'
                    />
                    {showKoordinator === true &&
                      kordinator.map((m, index) => (
                        <CircleMarker
                          center={[m?.latitude, m?.longitude]}
                          radius={20}
                          opacity={1.0}
                          pathOptions={{
                            color: 'none',
                            fillOpacity: 0.8,
                            fillColor: handleColor(m?.occupation.name),
                          }}
                        ></CircleMarker>
                      ))}
                    {showRelawan === true &&
                      relawan.map(
                        (m, index) =>
                          m.longitude !== '' && (
                            <CircleMarker
                              center={[m?.latitude, m?.longitude]}
                              radius={20}
                              opacity={1.0}
                              pathOptions={{
                                color: 'none',
                                fillOpacity: 0.8,
                                fillColor: handleColor(m?.occupation.name),
                              }}
                            ></CircleMarker>
                          )
                      )}
                    {showPemilih === true &&
                      pemilih.map(
                        (m, index) =>
                          m.longitude !== '' && (
                            <CircleMarker
                              center={[m?.latitude, m?.longitude]}
                              radius={20}
                              opacity={1.0}
                              pathOptions={{
                                color: 'none',
                                fillOpacity: 0.8,
                                fillColor: handleColor(m?.occupation.name),
                              }}
                            ></CircleMarker>
                          )
                      )}
                    {showBlackList === true &&
                      daftarhitam.map(
                        (m, index) =>
                          m.longitude !== '' && (
                            <CircleMarker
                              center={[m?.latitude, m?.longitude]}
                              radius={20}
                              opacity={1.0}
                              pathOptions={{
                                color: 'none',
                                fillOpacity: 0.8,
                                fillColor: handleColor(m?.occupation.name),
                              }}
                            ></CircleMarker>
                          )
                      )}
                  </>
                )}
              </Map>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="col-12 pb-5 mb-24">
            <h1>Dashboard</h1>
          </div>
          <div className="col-12 mb-24">
            <Card>
              <div className="d-flex justify-content-between mb-12 mt-8">
                <h2 style={{ fontSize: '16px', fontWeight: 600 }}>
                  Peringkat Koordinator
                </h2>
              </div>
              <CustomDataTable columns={columns} data={ranks} />
            </Card>
          </div>
          <div className="col-3 mb-24">
            <SummaryCard title="Total relawan" number={425} stat={-0.051} />
          </div>
          <div className="col-3 mb-24">
            <SummaryCard title="Total pemilih" number={6875} stat={0.128} />
          </div>
          <div className="col-3 mb-24">
            <SummaryCard
              title="Total logistik"
              subtitle="satuan rupiah"
              number={192092251}
              stat={-0.121}
            />
          </div>
          <div className="col-3 mb-24">
            <SummaryCard
              title="Pemilih baru"
              subtitle="2 Des 2022"
              number={6875}
              stat={0.041}
            />
          </div>
          <div className="col-6 mb-24">
            <Card noPadding>
              <ChartCard
                dataX={['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul']}
                dataY={[140, 232, 101, 264, 90, 340]}
              />
            </Card>
          </div>
          <div className="col-6 mb-24">
            <BlueCard />
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  let { token } = parseCookies(ctx);
  let kecamatan = [];
  let kordinator = [];
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
      kordinator = res.data.data.filter((x) => x.occupation.level === 2);
      relawan = res.data.data.filter((x) => x.occupation.level === 3);
      pemilih = res.data.data.filter((x) => x.occupation.level === 4);
      daftarhitam = res.data.data.filter((x) => x.occupation.level === 5);
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
    props: { users, kordinator, relawan, pemilih, daftarhitam, kecamatan },
  };
}
