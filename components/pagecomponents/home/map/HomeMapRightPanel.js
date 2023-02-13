import clsx from "clsx";
import React, { useState } from "react";

import HomeMapFilterLocation from "./HomeMapFilterLocation";
import HomeMapFilterThematic from "./HomeMapFilterThematic";
import styles from "./homeMapRightPanel.module.css";

function HomeMapRightPanel({
  regencies,
  regency,
  setRegency,
  districts,
  district,
  setDistrict,
  villages,
  village,
  setVillage,
  thematicType,
  setThematicType,
  surveys,
  surveyID,
  setSurveyID,
  questions,
  questionID,
  setQuestionID,
}) {
  const [locationActive, setLocationActive] = useState(true);
  const [thematicActive, setThematicActive] = useState(true);

  return (
    <div className={styles.container}>
      <HomeMapFilterLocation
        className={clsx(locationActive ? "" : styles.card_inactive)}
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

      <HomeMapFilterThematic
        className={clsx(thematicActive ? "" : styles.card_inactive)}
        thematicType={thematicType}
        setThematicType={setThematicType}
        surveys={surveys}
        surveyID={surveyID}
        setSurveyID={setSurveyID}
        questions={questions}
        questionID={questionID}
        setQuestionID={setQuestionID}
      />
    </div>
  );
}

export default HomeMapRightPanel;
