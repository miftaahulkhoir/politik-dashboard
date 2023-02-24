import { Grid, Space } from "antd";
import clsx from "clsx";
import React, { useMemo, useState } from "react";

import FilterPopup from "./content/FilterPopup";
import FilterThematic from "./content/FilterThematic";
import SpreadData from "./content/SpreadData";
import styles from "./panel.module.css";
import PanelMenu from "./PanelMenu";

function PanelContainer({
  spreadData,
  thematicSurveyResponses,
  setThematicSurveyResponses,
  showUsers,
  occupationState,
  reportState,
  surveyState,
  kpuState,
}) {
  const [activeMenus, setActiveMenus] = useState([]);

  const screen = Grid.useBreakpoint();

  const isMD = useMemo(() => {
    return !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  return (
    <div className={clsx(styles.container, isMD ? styles.container_small : "")}>
      <PanelMenu activeMenus={activeMenus} setActiveMenus={setActiveMenus} isMD={isMD} />
      <Space style={{ alignItems: "flex-start", padding: "0" }}>
        {activeMenus?.includes(1) ? <SpreadData data={spreadData} /> : null}
        {activeMenus?.includes(2) ? <FilterPopup showUsers={showUsers} occupationState={occupationState} /> : null}
        {activeMenus?.includes(3) ? (
          <FilterThematic
            reportState={reportState}
            surveyState={surveyState}
            kpuState={kpuState}
            thematicSurveyResponses={thematicSurveyResponses}
            setThematicSurveyResponses={setThematicSurveyResponses}
          />
        ) : null}
      </Space>
    </div>
  );
}

export default PanelContainer;
