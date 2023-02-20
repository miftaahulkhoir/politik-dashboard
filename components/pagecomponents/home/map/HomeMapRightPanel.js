import React, { useState } from "react";

import styles from "./homeMapRightPanel.module.css";

import HomeMapFIlterThematic2 from "../panel/content/FilterThematic";

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
  selectedQuestions,
  setSelectedQuestions,
}) {
  const [locationActive, setLocationActive] = useState(true);
  const [thematicActive, setThematicActive] = useState(true);

  // const submitHandler = () => {
  //   console.log("questions", selectedQuestions);
  //   const questions = selectedQuestions.map((q) => {
  //     const arr = q.split(",");
  //     return {
  //       surveyID: arr[0],
  //       questionID: arr[1],
  //     };
  //   });
  //   findSurveyResultsThematic(questions);
  //   // console.table(questions);
  // };

  return (
    <div className={styles.container}>
      {/* <HomeMapFilterLocation
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
      /> */}

      {/* <HomeMapFilterThematic
        className={clsx(thematicActive ? "" : styles.card_inactive)}
        thematicType={thematicType}
        setThematicType={setThematicType}
        surveys={surveys}
        surveyID={surveyID}
        setSurveyID={setSurveyID}
        questions={questions}
        questionID={questionID}
        setQuestionID={setQuestionID}
      /> */}

      <HomeMapFIlterThematic2
        surveys={surveys}
        selectedQuestions={selectedQuestions}
        setSelectedQuestions={setSelectedQuestions}
      />
    </div>
  );
}

export default HomeMapRightPanel;
