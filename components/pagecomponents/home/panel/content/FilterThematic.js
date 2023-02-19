import { Button, Card, Checkbox, Collapse, Space } from "antd";
import axios from "axios";
import React, { useMemo, useState } from "react";

import { useFindAllSurveys } from "../../../../../utils/services/surveys";

function FilterThematic({ thematicSurveyResponses, setThematicSurveyResponses }) {
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

  const clickHandler = () => {
    questions.forEach((question) => {
      console.log("questions", question);
    });

    axios
      .all(
        questions.map(async (question) => {
          const questionID = question?.split(",")[1];
          const regencies = [3204, 3217]; // bandung dan bandung barat
          const res = await axios
            .all(regencies.map((regency) => axios.get(`/api/response/summary/${questionID}?regencyid=${regency}`)))
            .catch((err) => console.error(err));
          const dataArr = res?.map((r) => r?.data?.data);
          const data = dataArr[0];
          // eslint-disable-next-line no-unsafe-optional-chaining
          data.responses = [].concat(...dataArr?.map((d) => d?.responses));
          // setThematicSurveyResponse(data);
          return data;
        }),
      )
      .then((res) => {
        console.log("res all", res);
        setThematicSurveyResponses(res);
      });
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
