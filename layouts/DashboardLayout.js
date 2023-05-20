import HomeNavbar from "@/components/pagecomponents/home/HomeNavbar";
import Menu from "@/components/pagecomponents/home/Menu";
import Head from "next/head";
import React, { useState } from "react";

const DashboardLayout = ({
  children,
  profile,
  title,
  topBarConfig = { isShowSearchRegion: true, title: "Pemetaan" },
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
        <Menu topBarConfig={topBarConfig} />
      </div>
    </>
  );
};

export default DashboardLayout;
