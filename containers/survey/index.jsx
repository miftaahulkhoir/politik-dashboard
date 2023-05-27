import dynamic from "next/dynamic";

import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import SurveyMenu from "./components/SurveyMenu";
import SpreadData from "./components/SpreadData";
import users from "./data/users";
import Occupation from "./components/Occupation";
import Thematic from "./components/Thematic";
import Region from "./components/Region";
import { SurveyMapContext, SurveyMapProvider } from "./SurveyMapContext";
import SidebarFilter from "./components/SidebarFilter/SidebarFilter";
import SidebarInformation from "./components/SidebarInformation/SidebarInformation";

const SurveyMap = dynamic(() => import("./components/SurveyMap"), {
  ssr: false,
});

const SurveyContainerWithProvider = (props) => {
  const { selectedSurveyMenu, isShowSidebarFilter } = useContext(SurveyMapContext);
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <DashboardLayout
      title="Survey · Patrons"
      topBarConfig={{
        isShowSearchRegion: false,
        title: "Survey",
        onClickAnalysis: () => router.push("/survey/analysis"),
      }}
    >
      {isMounted && (
        <div className="map">
          <SurveyMap />
        </div>
      )}
      <div className="absolute flex gap-2 top-40 left-20">
        <SurveyMenu />
        {selectedSurveyMenu?.id === 1 && <SpreadData data={users} />}
        {selectedSurveyMenu?.id === 2 && <Occupation />}
        {selectedSurveyMenu?.id === 3 && (
          <Thematic
            reportState={{
              setSelectedQuestions: setSelectedQuestions,
              selectedQuestions: selectedQuestions,
            }}
          />
        )}
        {selectedSurveyMenu?.id === 4 && <Region />}
      </div>
      <SidebarFilter />
      {isShowSidebarFilter && <SidebarInformation />}
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
