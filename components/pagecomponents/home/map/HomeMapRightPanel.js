import React from "react";

import HomeMapFilterLocation from "./HomeMapFilterLocation";
import HomeMapFilterThematic from "./HomeMapFilterThematic";
import styles from "./homeMapRightPanel.module.css";

function HomeMapRightPanel({
  regencies,
  districts,
  villages,
  regency,
  district,
  village,
  setRegency,
  setDistrict,
  setVillage,
  thematicType,
  setThematicType,
}) {
  return (
    <div className={styles.container}>
      <HomeMapFilterLocation
        regencies={regencies}
        districts={districts}
        villages={villages}
        regency={regency}
        district={district}
        village={village}
        setRegency={setRegency}
        setDistrict={setDistrict}
        setVillage={setVillage}
      />

      <HomeMapFilterThematic thematicType={thematicType} setThematicType={setThematicType} />
    </div>
  );
}

export default HomeMapRightPanel;
