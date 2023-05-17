import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect, useRef, useState } from "react";

const SurveyContainer = (props) => {
  return (
    <DashboardLayout title="Survey · Patrons" topBarConfig={{ isShowSearchRegion: false }}>
      <div className="mt-14 ml-[62px]">Survey</div>
    </DashboardLayout>
  );
};

export default SurveyContainer;
