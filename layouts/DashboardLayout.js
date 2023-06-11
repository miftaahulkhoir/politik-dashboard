import HomeNavbar from "@/components/pagecomponents/home/HomeNavbar";
import Menu from "@/components/pagecomponents/home/Menu";
import { MonitoringContext } from "@/providers/issue-providers";
import Head from "next/head";
import React, { useContext, useState } from "react";

const DashboardLayout = ({
  children,
  profile,
  title,
  topBarConfig = { isShowSearchRegion: true, title: "Pemetaan", hideMapButton: false },
}) => {
  const [selectedContent, setSelectedContent] = useState(1);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="relative h-screen w-screen">
        <HomeNavbar profile={profile} setSelectedContent={setSelectedContent} selectedContent={selectedContent} />
        {children}
        <Menu profile={profile} topBarConfig={topBarConfig} />
      </div>
    </>
  );
};

export default DashboardLayout;
