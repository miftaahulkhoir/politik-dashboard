import { Button, Dropdown } from "antd";
import Router from "next/router";
import {
  TbAd2,
  TbBrandGoogleAnalytics,
  TbBrandTwitter,
  TbCalendarEvent,
  TbChevronDown,
  TbMessageReport,
  TbUser,
} from "react-icons/tb";

export default function HomeSocmedMenuDropdown() {
  const items = [
    // {
    //   key: '1',
    //   label: 'Laporan Kegiatan',
    //   icon: <TbFileReport size={16} />,
    //   onClick: () => Router.push('/ongoing'),
    // },
    {
      key: "2",
      label: "Analisis Sosial Media",
      icon: <TbBrandTwitter size={16} />,
      onClick: () => Router.push("/social-media-analysis"),
    },

    {
      key: "3",
      label: "Analisis Sentimen",
      icon: <TbBrandGoogleAnalytics size={16} />,
      onClick: () => Router.push("/sentiment-analysis"),
    },
    {
      key: "4",
      label: "Panel Ads",
      icon: <TbAd2 size={16} />,
      onClick: () => Router.push("/panel-ads"),
    },
    // {
    //   key: '5',
    //   label: 'Manajemen Akses Admin',
    //   icon: <TbUsers size={16} />,
    //   onClick: () => Router.push('/ongoing'),
    // },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
    >
      <Button type="text">
        Sosial Media
        <TbChevronDown />
      </Button>
    </Dropdown>
  );
}
