import { Card, Collapse, Radio, Space } from "antd";
import axios from "axios";
import React, { useContext, useMemo, useState } from "react";

import surveys from "../data/surveys";
import { SurveyMapContext } from "../SurveyMapContext";

const Thematic = ({
  setThematicSurveyResponses,
  surveyState,
  logisticState,
  reportState,
  kpuState,
  onClickActionMap,
}) => {
  const { setSelectedSurveyQuestion, selectedSurveyQuestion } = useContext(SurveyMapContext);
  const [tempSelectedSurveyQuestion, setTempSelectedSurveyQuestion] = useState(selectedSurveyQuestion);

  const filteredSurveys = useMemo(() => {
    return surveys
      ?.filter((survey) => {
        return survey?.questions?.some((question) =>
          ["yes_no_question", "radio_button", "dropdown"].includes(question?.input_type),
        );
      })
      .sort((a, b) => new Date(b?.created_at)?.getTime() - new Date(a?.created_at)?.getTime());
  }, [surveys]);

  const onApply = () => {
    setSelectedSurveyQuestion(tempSelectedSurveyQuestion);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px", width: "350px" }}>
      <Card
        style={{ background: "#151922" }}
        bodyStyle={{ overflowY: "scroll", maxHeight: "calc(100vh - 300px)" }}
        title={<div className="text-white">Tematik</div>}
        size="small"
      >
        <Space direction="vertical" size={12}>
          <Collapse key="survei" className="text-white">
            <Collapse.Panel header={<div className="text-white">Survei</div>}>
              <Radio.Group
                style={{ width: "100%" }}
                onChange={(event) => setTempSelectedSurveyQuestion(event.target.value)}
                value={tempSelectedSurveyQuestion}
                // className="bg-new-black"
              >
                <Space direction="vertical" size={12}>
                  {filteredSurveys?.map((survey, index) => (
                    <Collapse key={index}>
                      <Collapse.Panel
                        header={<div className="text-white">{survey?.survey_name}</div>}
                        // className="bg-new-black"
                        // style={{ background: "#151922" }}
                      >
                        <Space direction="vertical" size="small">
                          {survey?.questions
                            ?.filter((question) =>
                              ["yes_no_question", "radio_button", "dropdown"].includes(question?.input_type),
                            )
                            ?.map((question) => {
                              const value = `${survey?.id},${question?.question_id}`;
                              return (
                                <Radio key={value} value={value} className="text-white bg-new-black">
                                  {question?.question_name}
                                </Radio>
                              );
                            })}
                        </Space>
                      </Collapse.Panel>
                    </Collapse>
                  ))}
                </Space>
              </Radio.Group>
            </Collapse.Panel>
          </Collapse>
        </Space>
      </Card>
      <button
        className="h-8 cursor-pointer py-2 text-white rounded-md text-sm font-bold flex items-center justify-center bg-primary"
        onClick={onApply}
      >
        Petakan
      </button>
    </div>
  );
};

export default Thematic;
