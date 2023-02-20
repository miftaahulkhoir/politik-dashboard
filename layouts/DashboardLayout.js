import { Grid } from "antd";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import {
  TbAd2,
  TbBrandGoogleAnalytics,
  TbBrandWhatsapp,
  TbDeviceAnalytics,
  TbLayoutDashboard,
  TbListCheck,
  TbMessageReport,
  TbBrandTwitter,
  TbUser,
} from "react-icons/tb";

import ProfileDropdown from "../components/pagecomponents/dashboardLayout/ProfileDropdown";
import MobileNavbarBody from "../components/templates/navbar/MobileNavbarBody";
import MobileNavbarToggler from "../components/templates/navbar/MobileNavbarToggler";

export default function DashboardLayout({ profile, baseURL, children }) {
  const router = useRouter();
  const { asPath } = router;

  const [isNavbarActive, setIsNavbarActive] = useState(false);

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
              <li
                className={asPath === "/social-media-analysis" ? "meu-item active" : "menu-item"}
                onClick={() => router.push("/social-media-analysis")}
              >
                <a>
                  <TbBrandTwitter size={24} />
                  <span>Analisis Sosial Media</span>
                </a>
              </li>
            )}
            {profile?.occupation?.level < 3 && (
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
            )}
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
