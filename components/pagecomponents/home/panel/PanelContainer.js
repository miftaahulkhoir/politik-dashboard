import { Grid, Space } from "antd";
import clsx from "clsx";
import React, { useMemo, useState } from "react";

import FilterPopup from "./content/FilterPopup";
import FilterThematic from "./content/FilterThematic";
import SelectRegionLevel from "./content/SelectRegionLevel";
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
  logisticState,
  surveyState,
  kpuState,
  regionState,
}) {
  const [activeMenus, setActiveMenus] = useState([]);

  const screen = Grid.useBreakpoint();

  const isMD = useMemo(() => {
    return !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  return (
    <div className={clsx(styles.container, isMD ? styles.container_small : "")}>
      <PanelMenu activeMenus={activeMenus} setActiveMenus={setActiveMenus} isMD={isMD} />
      <Space className={styles.contents_container} style={{ alignItems: "flex-start", padding: "0" }}>
        {activeMenus?.includes(1) ? <SpreadData data={spreadData} /> : null}
        {activeMenus?.includes(2) ? <FilterPopup showUsers={showUsers} occupationState={occupationState} /> : null}
        {activeMenus?.includes(3) ? (
          <FilterThematic
            reportState={reportState}
            logisticState={logisticState}
            surveyState={surveyState}
            kpuState={kpuState}
            thematicSurveyResponses={thematicSurveyResponses}
            setThematicSurveyResponses={setThematicSurveyResponses}
          />
        ) : null}
        {activeMenus?.includes(4) ? <SelectRegionLevel regionState={regionState} /> : null}
      </Space>
    </div>
  );
}

export default PanelContainer;
