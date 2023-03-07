import { Grid } from "antd";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import {
  TbAd2,
  TbAddressBook,
  TbAlignLeft,
  TbBrandGoogleAnalytics,
  TbBrandTwitter,
  TbBrandWhatsapp,
  TbCalendarEvent,
  TbChevronDown,
  TbChevronUp,
  TbDatabase,
  TbDeviceAnalytics,
  TbLayoutDashboard,
  TbListCheck,
  TbMessageReport,
  TbUser,
} from "react-icons/tb";

import ProfileDropdown from "../components/pagecomponents/dashboardLayout/ProfileDropdown";
import MobileNavbarBody from "../components/templates/navbar/MobileNavbarBody";
import MobileNavbarToggler from "../components/templates/navbar/MobileNavbarToggler";

export default function DashboardLayout({ profile, baseURL, children }) {
  const router = useRouter();
  const { asPath } = router;

  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [socmedMenu, setSocmedMenu] = useState(
    asPath === "/social-media-analysis" ||
      asPath === "/sentiment" ||
      asPath === "/sentiment-analysis" ||
      asPath === "/panel-ads",
  );

  const screens = Grid.useBreakpoint();

  const smallDevice = useMemo(() => {
    const val = !screens.xl && !screens.xxl;
    return val;
  }, [screens]);

  return (
    <>
      <MobileNavbarBody active={isNavbarActive} setActive={setIsNavbarActive} xs={screens.xs} />

      <div className="codex-loader d-none">
        <div className="loader-item one"></div>
        <div className="loader-item two"></div>
        <div className="loader-item three"></div>
      </div>
      <header className="codex-header" style={{ zIndex: 99 }}>
        <div className="custom-container">
          <div className="row">
            <div className="col-12">
              <div className="header-contian">
                <div className="header-left">
                  <div className="logo-gridwrap">
                    <a className="codexbrand-logo">
                      <img className="img-fluid" src={`${baseURL}images/logo/logo.png`} alt="theeme-logo" />
                    </a>
                    <a className="codexdark-logo">
                      <img className="img-fluid" src={`${baseURL}images/logo/dark-logo.png`} alt="theeme-logo" />
                    </a>
                  </div>
                  <div className="search-bar p-0">
                    <p className="m-0">Selamat datang kembali, {profile?.occupation?.name?.toUpperCase()}</p>
                  </div>
                </div>
                {smallDevice ? <MobileNavbarToggler setActive={setIsNavbarActive} /> : <ProfileDropdown />}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="codex-sidebar">
        <div className="logo-gridwrap">
          <a className="codexbrand-logo">
            <img style={{ width: "40px" }} src={`${baseURL}images/logo/icon-logo.png`} alt="theeme-logo" />
            <img className="img-fluid" src={`${baseURL}images/logo/logo.png`} alt="theeme-logo" />
          </a>
          <a className="sidebar-action">
            <i className="fa fa-bars"></i>
          </a>
        </div>
        <div className="codex-menuwrapper">
          <ul className="codex-menu custom-scroll" data-simplebar>
            <li className={asPath === "/" ? "meu-item active" : "menu-item"} onClick={() => router.push("/")}>
              <a>
                <TbLayoutDashboard size={24} />
                <span>Dashboard</span>
              </a>
            </li>
            {profile?.occupation?.level < 3 && (
              <li
                className={asPath === "/surveys" ? "meu-item active" : "menu-item"}
                onClick={() => router.push("/surveys")}
              >
                <a>
                  <TbListCheck size={24} />
                  <span>Manajemen Survei</span>
                </a>
              </li>
            )}
            {profile?.occupation?.level < 3 && (
              <li
                className={asPath === "/survey-analysis" ? "meu-item active" : "menu-item"}
                onClick={() => router.push("/survey-analysis")}
              >
                <a>
                  <TbDeviceAnalytics size={24} />
                  <span>Analisis Survei</span>
                </a>
              </li>
            )}
            {profile?.occupation?.level < 3 && (
              <li className={"menu-item"} onClick={() => setSocmedMenu(!socmedMenu)}>
                <a>
                  <TbAddressBook size={24} />
                  <span>Sosial Media</span>
                  <div style={{ marginLeft: "auto" }}>
                    {socmedMenu ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
                  </div>
                </a>
              </li>
            )}
            {profile?.occupation?.level < 3 && (
              <li style={socmedMenu ? { display: "block" } : { display: "none" }}>
                <a
                  className={asPath === "/social-media-analysis" ? "menu-item active" : "menu-item"}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => router.push("/social-media-analysis")}
                >
                  <ul style={{ paddingLeft: "20px" }}>
                    <li>
                      <a style={{ padding: "0px" }}>
                        <TbBrandTwitter size={24} />
                        <span>Analisis Sosial Media</span>
                      </a>
                    </li>
                  </ul>
                </a>
                <a
                  className={asPath === "/sentiment" ? "menu-item active" : "menu-item"}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => router.push("/sentiment")}
                >
                  <ul style={{ paddingLeft: "20px" }}>
                    <li>
                      <a style={{ padding: "0px" }}>
                        <TbAlignLeft size={24} />
                        <span>Manajemen Sentimen</span>
                      </a>
                    </li>
                  </ul>
                </a>
                <a
                  className={asPath === "/sentiment-analysis" ? "menu-item active" : "menu-item"}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => router.push("/sentiment-analysis")}
                >
                  <ul style={{ paddingLeft: "20px" }}>
                    <li>
                      <a style={{ padding: "0px" }}>
                        <TbBrandGoogleAnalytics size={24} />
                        <span>Analisis Sentimen</span>
                      </a>
                    </li>
                  </ul>
                </a>
                <a
                  className={asPath === "/panel-ads" ? "menu-item active" : "menu-item"}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => router.push("/panel-ads")}
                >
                  <ul style={{ paddingLeft: "20px" }}>
                    <li>
                      <a style={{ padding: "0px" }}>
                        <TbAd2 size={24} />
                        <span>Panel Ads</span>
                      </a>
                    </li>
                  </ul>
                </a>
              </li>
            )}
            {/* {profile?.occupation?.level < 3 && (
              <li
                className={asPath === "/sentiment-analysis" ? "meu-item active" : "menu-item"}
                onClick={() => router.push("/sentiment-analysis")}
              >
                <a>
                  <TbBrandGoogleAnalytics size={24} />
                  <span>Analisis Sentimen</span>
                </a>
              </li>
            )}
            {profile?.occupation?.level < 3 && (
              <li
                className={asPath === "/panel-ads" ? "meu-item active" : "menu-item"}
                onClick={() => router.push("/panel-ads")}
              >
                <a>
                  <TbAd2 size={24} />
                  <span>Panel Ads</span>
                </a>
              </li>
            )} */}
            {profile?.occupation?.level < 3 && (
              <li
                className={asPath === "/whatsapp-blast" ? "meu-item active" : "menu-item"}
                onClick={() => router.push("/whatsapp-blast")}
              >
                <a>
                  <TbBrandWhatsapp size={24} />
                  <span>WhatsApp Blast</span>
                </a>
              </li>
            )}
            {/* <li
              // className={asPath === "" ? "meu-item active" : "menu-item"}
              onClick={() => router.push('/ongoing')}
            >
              <a>
                <TbCalendarEvent size={24} />
                <span>Laporan Kegiatan</span>
              </a>
            </li> */}
            {/* {profile?.occupation?.level < 3 && (
              <li
                // className={asPath === "" ? "meu-item active" : "menu-item"}
                onClick={() => router.push('/ongoing')}
              >
                <a>
                  <TbFileReport size={24} />
                  <span>Manajemen Kegiatan</span>
                </a>
              </li>
            )} */}

            <li
              className={asPath === "/logistics" ? "meu-item active" : "menu-item"}
              onClick={() => router.push("/logistics")}
            >
              <a>
                <TbDatabase size={24} />
                <span>Logistik</span>
              </a>
            </li>
            <li
              className={asPath === "/reports" ? "meu-item active" : "menu-item"}
              onClick={() => router.push("/reports")}
            >
              <a>
                <TbMessageReport size={24} />
                <span>Pengaduan</span>
              </a>
            </li>
            {profile?.occupation?.level < 3 && (
              <li
                className={asPath === "/events" ? "meu-item active" : "menu-item"}
                onClick={() => router.push("/events")}
              >
                <a>
                  <TbCalendarEvent size={24} />
                  <span>Manajemen Kegiatan</span>
                </a>
              </li>
            )}
            {profile?.occupation?.level < 3 && (
              <li
                className={asPath === "/users" ? "meu-item active" : "menu-item"}
                onClick={() => router.push("/users")}
              >
                <a>
                  <TbUser size={24} />
                  <span>Manajemen Pengguna</span>
                </a>
              </li>
            )}
            {/* {profile?.occupation?.level === 1 && (
              <li
                // className={asPath === "" ? "meu-item active" : "menu-item"}
                onClick={() => router.push('/ongoing')}
              >
                <a>
                  <TbUsers size={24} />
                  <span>Manajemen Akses Admin</span>
                </a>
              </li>
            )} */}
          </ul>
        </div>
      </div>
      <div className="themebody-wrap">
        <div className="theme-body common-dash" data-simplebar>
          <div className="custom-container">
            <div className="row">{children}</div>
          </div>
        </div>
      </div>
      <footer className="codex-footer">
        <p className="p-0 m-0">Copyright 2023 © Patrons Analitik. All rights reserved.</p>
      </footer>
    </>
  );
}
