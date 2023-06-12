import { Card, Checkbox, Collapse, Space } from "antd";
import axios from "axios";
import React, { useMemo } from "react";

import { useFindAllLogisticCategories } from "../../../../../utils/services/logistics";
import { useFindAllReportCategories } from "../../../../../utils/services/reports";

function FilterThematic({
  setThematicSurveyResponses,
  surveyState,
  logisticState,
  reportState,
  kpuState,
  onClickActionMap,
  selectedRegency,
  districtState,
  surveys,
}) {
  const icons = [
    "/images/map/markers/icon-1.svg",
    "/images/map/markers/icon-2.svg",
    "/images/map/markers/icon-3.svg",
    "/images/map/markers/icon-4.svg",
    "/images/map/markers/icon-5.svg",
    "/images/map/markers/icon-6.svg",
    "/images/map/markers/icon-7.svg",
    "/images/map/markers/icon-8.svg",
    "/images/map/markers/icon-9.svg",
    "/images/map/markers/icon-10.svg",
  ];

  // report
  const reportImages = ["/images/map/markers/report-1.svg", "/images/map/markers/report-2.svg"];

  const { categories: reportCategories } = useFindAllReportCategories();
  const reportCategoryChangeHandler = (value) => {
    reportState.setSelectedReportCategories(value);
  };

  // logistics
  const { categories: logisticCategories } = useFindAllLogisticCategories();
  const logisticCategoryChangeHandler = (value) => {
    logisticState.setSelectedLogisticCategories(value);
  };

  // survey
  // const { surveys } = useFindAllSurveys();

  const filteredSurveys = useMemo(() => {
    return surveys
      ?.filter((survey) => {
        return survey?.questions?.some((question) =>
          ["yes_no_question", "radio_button", "dropdown"].includes(question?.input_type),
        );
      })
      .sort((a, b) => new Date(b?.created_at)?.getTime() - new Date(a?.created_at)?.getTime());
  }, [surveys]);

  const clickHandler = async () => {
    const responses = [];
    await axios
      .all(
        surveyState?.selectedQuestions?.map(async (question) => {
          const questionID = question?.split(",")[1];

          const regencies = [
            3204, 3217, 3526, 3279, 3304, 3402, 3302, 3510, 3325, 3579, 3216, 3505, 3316, 3201, 3522, 3511, 3309, 3329,
            3207, 3203, 3301, 3672, 3277, 3209, 3321, 3276, 3205, 3525, 3315, 3403, 3212, 3174, 3173, 3171, 3172, 3175,
            3509, 3320, 3517, 3313, 3215, 3305, 3506, 3324, 3101, 3310, 3273, 3275, 3572, 3271, 3274, 3571, 3577, 3371,
            3573, 3576, 3575, 3375, 3574, 3374, 3673, 3272, 3671, 3278, 3376, 3471, 3319, 3401, 3208, 3524, 3602, 3508,
            3519, 3308, 3520, 3210, 3507, 3516, 3518, 3521, 3501, 3528, 3601, 3514, 3318, 3326, 3327, 3502, 3513, 3303,
            3214, 3306, 3317, 3373, 3527, 3322, 3604, 3515, 3512, 3404, 3314, 3213, 3202, 3311, 3211, 3529, 3578, 3372,
            3603, 3674, 3206, 3328, 3323, 3503, 3523, 3504, 3288, 3388, 3312, 3307,
          ]; // seluruh regency di pulau jawa
          // const regencies = [3204, 3217, 3277, 3273]; // bandung, bandung barat, kota bandung, kota cimahi
          const res = await axios
            // .all(regencies.map((regency) => axios.get(`/api/response/summary/${questionID}/nasional`)))
            // .catch((err) => console.error(err));
            .get(`/api/internal/survey/summary?questionId=${questionID}`)
            .catch((err) => console.error(err));
          const dataArr = [res.data.data];
          const data = dataArr[0];

          // eslint-disable-next-line no-unsafe-optional-chaining
          data.responses = [].concat(...dataArr?.map((d) => d?.responses));
          return data;
        }),
      )
      .then((res) => {
        responses.push(...res);
      });

    onClickActionMap();
    setThematicSurveyResponses(responses);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px", minWidth: "380px" }}>
      <Card
        style={{ background: "#151922" }}
        bodyStyle={{ maxHeight: "calc(100vh - 150px)", background: "#151922" }}
        title="Tematik"
        size="small"
      >
        <Space direction="vertical" size={12} style={{ overflowY: "auto", maxHeight: "60vh" }}>
          <Collapse key="survei">
            <Collapse.Panel header={<span className="text-white">Survei</span>}>
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={(value) => surveyState?.setSelectedQuestions(value)}
                value={surveyState?.selectedQuestions}
              >
                <Space
                  direction="vertical"
                  size={12}
                  style={{ padding: "0px 16px 0px 0px", overflowY: "auto", maxHeight: "300px" }}
                >
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
            </Collapse.Panel>
          </Collapse>
        </Space>
      </Card>
      <div
        className="h-full cursor-pointer px-8 py-1 text-white rounded-md text-sm font-bold flex items-center justify-center bg-primary"
        onClick={clickHandler}
      >
        Petakan
      </div>
    </div>
  );
}

export default FilterThematic;
