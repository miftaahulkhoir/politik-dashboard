import { Space } from "antd";
import React, { useState } from "react";

import FilterPopup from "./content/FilterPopup";
import FilterThematic from "./content/FilterThematic";
import SpreadData from "./content/SpreadData";
import styles from "./panel.module.css";
import PanelMenu from "./PanelMenu";

function PanelContainer({ spreadData }) {
  const [activeMenus, setActiveMenus] = useState([]);
  return (
    <div className={styles.container}>
      <PanelMenu activeMenus={activeMenus} setActiveMenus={setActiveMenus} />
      <Space style={{ alignItems: "flex-start", padding: "0" }}>
        {activeMenus?.includes(1) ? <SpreadData data={spreadData} /> : null}
        {activeMenus?.includes(2) ? <FilterPopup /> : null}
        {activeMenus?.includes(3) ? <FilterThematic /> : null}
      </Space>
    </div>
  );
}

export default PanelContainer;
