import { useRouter } from 'next/router';
import ProfileDropdown from '../components/pagecomponents/dashboardLayout/ProfileDropdown';

export default function DashboardLayout({ profile, children }) {
  const router = useRouter();
  const { asPath } = router;

  return (
    <>
      <div className="codex-loader d-none">
        <div className="loader-item one"></div>
        <div className="loader-item two"></div>
        <div className="loader-item three"> </div>
      </div>
      <header className="codex-header">
        <div className="custom-container">
          <div className="row">
            <div className="col-12">
              <div className="header-contian">
                <div className="header-left">
                  <div className="logo-gridwrap">
                    <a className="codexbrand-logo">
                      <img
                        className="img-fluid"
                        src={`${process.env.APP_BASEURL}images/logo/logo.png`}
                        alt="theeme-logo"
                      />
                    </a>
                    <a className="codexdark-logo">
                      <img
                        className="img-fluid"
                        src={`${process.env.APP_BASEURL}images/logo/dark-logo.png`}
                        alt="theeme-logo"
                      />
                    </a>
                  </div>
                  <div className="search-bar p-0">
                    <p className="m-0">
                      Selamat datang kembali, {profile?.occupation?.name}
                    </p>
                  </div>
                </div>
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="codex-sidebar">
        <div className="logo-gridwrap">
          <a className="codexbrand-logo">
            <img
              style={{ width: '40px' }}
              src={`${process.env.APP_BASEURL}images/logo/icon-logo.png`}
              alt="theeme-logo"
            />
            <img
              className="img-fluid"
              src={`${process.env.APP_BASEURL}images/logo/logo.png`}
              alt="theeme-logo"
            />
          </a>
          <a className="sidebar-action">
            <i className="fa fa-bars"></i>
          </a>
        </div>
        <div className="codex-menuwrapper">
          <ul className="codex-menu custom-scroll" data-simplebar>
            <li
              className={asPath === '/' ? 'meu-item active' : 'menu-item'}
              onClick={() => router.replace('/')}
            >
              <a>
                <div className="icon-item">
                  <i className="fa fa-dashboard"></i>
                </div>
                <span>Dashboard</span>
              </a>
            </li>
            {profile?.occupation?.level < 3 && (
              <li
                className={
                  asPath === '/surveys' ? 'meu-item active' : 'menu-item'
                }
                onClick={() => router.replace('/surveys')}
              >
                <a>
                  <div className="icon-item">
                    <i className="fa fa-list"></i>
                  </div>
                  <span>Manajemen Survei</span>
                </a>
              </li>
            )}
            {profile?.occupation?.level < 3 && (
              <li
                // className={
                //   asPath === "/ongoing" ? "meu-item active" : "menu-item"
                // }
                onClick={() => router.replace('/ongoing')}
              >
                <a>
                  <div className="icon-item">
                    <i className="fa fa-desktop"></i>
                  </div>
                  <span>Analitik Survei</span>
                </a>
              </li>
            )}
            {profile?.occupation?.level < 3 && (
              <li
                className={
                  asPath === '/social-reports' ? 'meu-item active' : 'menu-item'
                }
                onClick={() => router.replace('/social-reports')}
              >
                <a>
                  <div className="icon-item">
                    <i className="fa fa-pie-chart"></i>
                  </div>
                  <span>Sentimen Analisis</span>
                </a>
              </li>
            )}
            {profile?.occupation?.level < 3 && (
              <li
                className={
                  asPath === '/blast' ? 'meu-item active' : 'menu-item'
                }
                onClick={() => router.replace('/blast')}
              >
                <a>
                  <div className="icon-item">
                    <i className="fa fa-whatsapp"></i>
                  </div>
                  <span>WhatsApp Blast</span>
                </a>
              </li>
            )}
            <li
              // className={asPath === "" ? "meu-item active" : "menu-item"}
              onClick={() => router.replace('/ongoing')}
            >
              <a>
                <div className="icon-item">
                  <i className="fa fa-file"></i>
                </div>
                <span>Report Kegiatan</span>
              </a>
            </li>
            {profile?.occupation?.level < 3 && (
              <li
                // className={asPath === "" ? "meu-item active" : "menu-item"}
                onClick={() => router.replace('/ongoing')}
              >
                <a>
                  <div className="icon-item">
                    <i className="fa fa-calendar"></i>
                  </div>
                  <span>Manajemen Event</span>
                </a>
              </li>
            )}
            <li
              // className={asPath === "" ? "meu-item active" : "menu-item"}
              onClick={() => router.replace('/ongoing')}
            >
              <a>
                <div className="icon-item">
                  <i className="fa fa-comment"></i>
                </div>
                <span>Pengaduan</span>
              </a>
            </li>
            {profile?.occupation?.level < 3 && (
              <li
                className={
                  asPath === '/users' ? 'meu-item active' : 'menu-item'
                }
                onClick={() => router.replace('/users')}
              >
                <a>
                  <div className="icon-item">
                    <i className="fa fa-user"></i>
                  </div>
                  <span>Manajemen User</span>
                </a>
              </li>
            )}
            {profile?.occupation?.level === 1 && (
              <li
                // className={asPath === "" ? "meu-item active" : "menu-item"}
                onClick={() => router.replace('/ongoing')}
              >
                <a>
                  <div className="icon-item">
                    <i className="fa fa-users"></i>
                  </div>
                  <span>Manajemen Akses Admin</span>
                </a>
              </li>
            )}
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
        <p>Copyright 2022-23 © All rights reserved.</p>
      </footer>
    </>
  );
}
