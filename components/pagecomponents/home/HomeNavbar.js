import { Button } from "antd";
import { useRouter } from "next/router";

import HomeMoreMenuDropdown from "./HomeMoreMenuDropdown";
import styles from "./homeNavbar.module.css";

import MobileNavbarToggler from "../../templates/navbar/MobileNavbarToggler";
import ProfileDropdown from "../dashboardLayout/ProfileDropdown";

export default function HomeNavbar({ smallDevice, setActive }) {
  const router = useRouter();

  const links = [
    { name: "Manajemen Survei", path: "/surveys" },
    { name: "Analisis Survei", path: "/survey-analysis" },
    { name: "Analisis Sosial Media", path: "/social-media-analysis" },
    { name: "Analisis Sentimen", path: "/sentiment-analysis" },
    { name: "Panel Ads", path: "/panel-ads" },
    { name: "WhatsApp Blast", path: "/whatsapp-blast" },
  ];

  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.brand}>
          <img src="/images/logo/icon-logo.png" alt="Patrons" />
          <img src="/images/logo/logo.png" alt="Patrons" />
        </div>
        <div className={styles.items_container}>
          {smallDevice ? (
            <MobileNavbarToggler setActive={setActive} />
          ) : (
            <>
              <div className={styles.links_container}>
                {links.map((link, i) => (
                  // <div role="button" key={i} onClick={() => router.push(link.path)}>
                  //   {link.name}
                  // </div>
                  <Button type="text" key={i} onClick={() => router.push(link.path)}>
                    {link.name}
                  </Button>
                ))}
              </div>
              <HomeMoreMenuDropdown />
              <ProfileDropdown />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
