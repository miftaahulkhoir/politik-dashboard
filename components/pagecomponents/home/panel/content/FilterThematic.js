import { Button, Card, Checkbox, Collapse, Space } from "antd";
import axios from "axios";
import React, { useMemo, useState } from "react";

import { useFindAllSurveys } from "../../../../../utils/services/surveys";

function FilterThematic({ thematicSurveyResponse, setThematicSurveyResponse }) {
  // survey
  const { surveys } = useFindAllSurveys();
  const [questions, setQuestions] = useState([]); // string -> surveyid,questionid

  const filteredSurveys = useMemo(() => {
    return surveys
      ?.filter((survey) => {
        return survey?.questions?.some((question) =>
          ["yes_no_question", "radio_button", "dropdown"].includes(question?.input_type),
        );
      })
      .sort((a, b) => new Date(b?.created_at)?.getTime() - new Date(a?.created_at)?.getTime());
  }, [surveys]);

  // responses
  const [response, setResponse] = useState({});

  const clickHandler = () => {
    console.log(questions[0]);
    const questionID = questions[0]?.split(",")[1];
    axios
      .get(`/api/response/summary/${questionID}?regencyid=3204`)
      .then((res) => {
        console.log("res", res?.data?.data);
        setThematicSurveyResponse(res?.data?.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px", width: "350px" }}>
      <Card
        style={{ background: "white" }}
        bodyStyle={{ overflow: "scroll", maxHeight: "calc(100vh - 200px)" }}
        title="Tematik"
        size="small"
      >
        <Checkbox.Group style={{ width: "100%" }} onChange={(value) => setQuestions(value)} value={questions}>
          <Space direction="vertical" size={12}>
            {filteredSurveys?.map((survey, index) => (
              <Collapse key={index}>
                <Collapse.Panel header={survey?.survey_name}>
                  <Space direction="vertical" size="small">
                    {survey?.questions
                      ?.filter((question) =>
                        ["yes_no_question", "radio_button", "dropdown"].includes(question?.input_type),
                      )
                      ?.map((question) => {
                        const value = `${survey?.id},${question?.question_id}`;
                        return (
                          <Checkbox key={value} value={value}>
                            {question?.question_name}
                          </Checkbox>
                        );
                      })}
                  </Space>
                </Collapse.Panel>
              </Collapse>
            ))}
          </Space>
        </Checkbox.Group>
      </Card>
      <Button type="primary" block disabled={!questions?.length} onClick={clickHandler}>
        Petakan
      </Button>
    </div>
  );
}

export default FilterThematic;
