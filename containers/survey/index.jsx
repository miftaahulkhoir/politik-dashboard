import dynamic from "next/dynamic";

import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useContext } from "react";

import { useRouter } from "next/router";

import { SurveyMapContext, SurveyMapProvider } from "./SurveyMapContext";
import SidebarFilter from "./components/SidebarFilter/SidebarFilter";
import SidebarInformation from "./components/SidebarInformation/SidebarInformation";
import { isEmpty } from "lodash";

const SurveyMap = dynamic(() => import("./components/SurveyMap"), {
  ssr: false,
});

const DrawerChartData = dynamic(() => import("./components/SidebarInformation/DrawerChartData"), { ssr: false });

const SurveyContainerWithProvider = (props) => {
  const { isShowSidebarFilter, isShowDrawer, countFilter } = useContext(SurveyMapContext);
  const router = useRouter();

  return (
    <DashboardLayout
      title="Survey · Patrons"
      topBarConfig={{
        isShowSearchRegion: true,
        title: "Survey",
        onClickAnalysis: () => router.push("/survey/analysis"),
      }}
    >
      <div className="map">
        <SurveyMap />
      </div>
      <SidebarFilter />

      {(isShowSidebarFilter || Boolean(countFilter?.tematik) || Boolean(countFilter?.persebaran)) && (
        <SidebarInformation />
      )}

      {isShowDrawer && <DrawerChartData open={isShowDrawer} />}
    </DashboardLayout>
  );
};

const SurveyContainer = () => {
  return (
    <SurveyMapProvider>
      <SurveyContainerWithProvider />
    </SurveyMapProvider>
  );
};

export default SurveyContainer;
