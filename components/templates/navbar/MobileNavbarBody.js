import { Button, Divider, Space } from "antd";
import clsx from "clsx";
import { useRouter } from "next/router";
import { TbX } from "react-icons/tb";

import styles from "./MobileNavbar.module.css";

import { logoutUser } from "../../../utils/services/auth";

export default function MobileNavbarBody({ active, setActive, xs }) {
  const router = useRouter();

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Manajemen Survei", path: "/surveys" },
    { name: "Analisis Survei", path: "/survey-analysis" },
    { name: "Analisis Sosial Media", path: "/social-media-analysis" },
    { name: "Analisis Sentimen", path: "/sentiment-analysis" },
    { name: "Panel Ads", path: "/panel-ads" },
    { name: "WhatsApp Blast", path: "/whatsapp-blast" },
    { name: "Logistik", path: "/logistics" },
    { name: "Manajemen Kegiatan", path: "/events" },
    { name: "Pengaduan", path: "/reports" },
    { name: "Manajemen Pengguna", path: "/users" },
    { name: "Divider 1" },
    { name: "Keluar", path: "/logout", onClick: () => logoutUser(), danger: true },
  ];

  return (
    <div className={clsx(styles.container, !active ? styles.hidden : "")}>
      <Space direction="vertical" size={40}>
        <Space style={{ justifyContent: "center", alignItems: "center" }}>
          <img src="/images/logo/icon-logo.png" alt="patrons" style={{ height: "48px" }} />
          <img src="/images/logo/logo.png" alt="patrons" style={{ height: "32px" }} />
        </Space>
        <Space direction="vertical">
          {links.map((link, i) =>
            link.path ? (
              <Button
                block
                size="large"
                key={i}
                type={link.danger ? "primary" : "text"}
                danger={link.danger}
                onClick={() => {
                  link.onClick ? link.onClick() : router.push(link.path);
                  setActive(false);
                }}
              >
                {link.name}
              </Button>
            ) : (
              <Divider key={link.name} />
            ),
          )}
        </Space>
      </Space>
      <Button
        type="text"
        shape="circle"
        size="large"
        icon={<TbX size={24} />}
        className={clsx(styles.close_button, xs ? styles.close_button_device_xs : "")}
        onClick={() => setActive(false)}
      />
    </div>
  );
}
