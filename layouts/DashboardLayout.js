import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { asPath } = router;

  return (
    <>
      <div className='codex-loader d-none'>
        <div className='loader-item one'></div>
        <div className='loader-item two'></div>
        <div className='loader-item three'> </div>
      </div>
      <header className='codex-header'>
        <div className='custom-container'>
          <div className='row'>
            <div className='col-12'>
              <div className='header-contian'>
                <div className='header-left'>
                  <div className='logo-gridwrap'>
                    <a className='codexbrand-logo'>
                      <img
                        className='img-fluid'
                        src={`${process.env.APP_BASEURL}images/logo/logo.png`}
                        alt='theeme-logo'
                      />
                    </a>
                    <a className='codexdark-logo'>
                      <img
                        className='img-fluid'
                        src={`${process.env.APP_BASEURL}images/logo/dark-logo.png`}
                        alt='theeme-logo'
                      />
                    </a>
                  </div>
                  <div className='search-bar'>
                    <p>Selamat datang kembali, NERDY</p>
                  </div>
                </div>
                <div className='header-right'>
                  <ul className='nav-iconlist'>
                    <li className='nav-profile'>
                      {" "}
                      <a>
                        <div className='media'>
                          <div className='user-icon'>
                            <img
                              className='img-fluid rounded-50'
                              src={`${process.env.APP_BASEURL}images/avtar/3.jpg`}
                              alt='logo'
                            />
                          </div>
                        </div>
                      </a>
                      {/* <div className='hover-dropdown navprofile-drop'>
                        <ul>
                          <li>
                            <a href='profile.html'>
                              <i className='ti-user'></i>profile
                            </a>
                          </li>
                          <li>
                            <a href='email-inbox.html'>
                              <i className='ti-email'></i>inbox
                            </a>
                          </li>
                          <li>
                            <a href='user-edit.html'>
                              {" "}
                              <i className='ti-settings'></i>setting{" "}
                            </a>
                          </li>
                          <li>
                            {" "}
                            <a href='login.html'>
                              {" "}
                              <i className='fa fa-sign-out'></i>log out
                            </a>
                          </li>
                        </ul>
                      </div> */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='codex-sidebar'>
        <div className='logo-gridwrap'>
          <a className='codexbrand-logo'>
            <img
              style={{ width: "40px" }}
              src={`${process.env.APP_BASEURL}images/logo/icon-logo.png`}
              alt='theeme-logo'
            />
            <img
              className='img-fluid'
              src={`${process.env.APP_BASEURL}images/logo/logo.png`}
              alt='theeme-logo'
            />
          </a>
          <a className='sidebar-action'>
            <i className='fa fa-bars'></i>
          </a>
        </div>
        <div className='codex-menuwrapper'>
          <ul className='codex-menu custom-scroll' data-simplebar>
            <li className={asPath === "/" ? "meu-item active" : "menu-item"}>
              <a onClick={() => router.push("/")}>
                <div className='icon-item'>
                  <i className='fa fa-dashboard'></i>
                </div>
                <span>Dashboard</span>
              </a>
            </li>
            <li
              className={
                asPath === "/surveys" ? "meu-item active" : "menu-item"
              }>
              <a onClick={() => router.push("/surveys")}>
                <div className='icon-item'>
                  <i className='fa fa-list'></i>
                </div>
                <span>Manajemen Survei</span>
              </a>
            </li>
            <li
              className={
                asPath === "/analytics" ? "meu-item active" : "menu-item"
              }>
              <a>
                <div className='icon-item'>
                  <i className='fa fa-desktop'></i>
                </div>
                <span>Analitik Survei</span>
              </a>
            </li>
            <li className={asPath === "" ? "meu-item active" : "menu-item"}>
              <a>
                <div className='icon-item'>
                  <i className='fa fa-pie-chart'></i>
                </div>
                <span>Sentimen Analisis</span>
              </a>
            </li>
            <li className={asPath === "" ? "meu-item active" : "menu-item"}>
              <a>
                <div className='icon-item'>
                  <i className='fa fa-whatsapp'></i>
                </div>
                <span>WhatsApp Blast</span>
              </a>
            </li>
            <li className={asPath === "" ? "meu-item active" : "menu-item"}>
              <a>
                <div className='icon-item'>
                  <i className='fa fa-map'></i>
                </div>
                <span>Pemetaan</span>
              </a>
            </li>
            <li className={asPath === "" ? "meu-item active" : "menu-item"}>
              <a>
                <div className='icon-item'>
                  <i className='fa fa-file'></i>
                </div>
                <span>Report Kegiatan</span>
              </a>
            </li>
            <li className={asPath === "" ? "meu-item active" : "menu-item"}>
              <a>
                <div className='icon-item'>
                  <i className='fa fa-calendar'></i>
                </div>
                <span>Manajemen Event</span>
              </a>
            </li>
            <li className={asPath === "" ? "meu-item active" : "menu-item"}>
              <a>
                <div className='icon-item'>
                  <i className='fa fa-comment'></i>
                </div>
                <span>Pengaduan</span>
              </a>
            </li>
            <li
              className={asPath === "/users" ? "meu-item active" : "menu-item"}>
              <a onClick={() => router.push("/users")}>
                <div className='icon-item'>
                  <i className='fa fa-user'></i>
                </div>
                <span>Manajemen User</span>
              </a>
            </li>
            <li className={asPath === "" ? "meu-item active" : "menu-item"}>
              <a>
                <div className='icon-item'>
                  <i className='fa fa-users'></i>
                </div>
                <span>Manajemen Akses Admin</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='themebody-wrap'>
        <div className='theme-body common-dash' data-simplebar>
          <div className='custom-container'>
            <div className='row'>{children}</div>
          </div>
        </div>
      </div>
      <footer className='codex-footer'>
        <p>Copyright 2022-23 © All rights reserved.</p>
      </footer>
    </>
  );
}
