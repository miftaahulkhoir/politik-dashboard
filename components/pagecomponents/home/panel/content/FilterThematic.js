import { Button, Card, Checkbox, Collapse, Space } from "antd";
import axios from "axios";
import React, { useMemo } from "react";

import capitalizeWords from "../../../../../utils/helpers/capitalizeWords";
import { useFindAllLogisticCategories } from "../../../../../utils/services/logistics";
import { useFindAllReportCategories } from "../../../../../utils/services/reports";
import { useFindAllSurveys } from "../../../../../utils/services/surveys";

function FilterThematic({
  setThematicSurveyResponses,
  surveyState,
  logisticState,
  reportState,
  kpuState,
  onClickActionMap,
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
  const { surveys } = useFindAllSurveys();

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
          const regencies = [3204, 3217, 3277, 3273]; // bandung, bandung barat, kota bandung, kota cimahi
          const res = await axios
            .all(regencies.map((regency) => axios.get(`/api/response/summary/${questionID}?regencyid=${regency}`)))
            .catch((err) => console.error(err));
          const dataArr = res?.map((r) => r?.data?.data);
          const data = dataArr[0];
          // eslint-disable-next-line no-unsafe-optional-chaining
          data.responses = [].concat(...dataArr?.map((d) => d?.responses));
          return data;
        }),
      )
      .then((res) => {
        responses.push(...res);
      });

    await axios
      .all(
        kpuState?.selectedKPUYears.map(async (year) => {
          const regencies = [3204, 3217, 3277, 3273]; // bandung, bandung barat, kota bandung, kota cimahi
          const res = await axios
            .all(regencies.map((regency) => axios.get(`/api/data-kpu?regencyid=${regency}`)))
            .catch((err) => console.error(err));
          const dataArr = res?.map((r) => r?.data?.data);
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
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px", width: "350px" }}>
      <Card
        style={{ background: "white" }}
        bodyStyle={{ overflowY: "scroll", maxHeight: "calc(100vh - 200px)" }}
        title="Tematik"
        size="small"
      >
        <Space direction="vertical" size={12}>
          <Collapse key="pengaduan">
            <Collapse.Panel header="Pengaduan">
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={reportCategoryChangeHandler}
                value={reportState?.selectedReportCategories}
              >
                <Space direction="vertical" size="small">
                  {reportCategories?.map((category, i) => (
                    <Checkbox value={category?.id} key={category?.id}>
                      <Space size={4}>
                        <img src={reportImages[i]} alt="" style={{ width: "20px" }} />
                        {capitalizeWords(category?.category_name ?? "")}
                      </Space>
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            </Collapse.Panel>
          </Collapse>

          <Collapse key="logistik">
            <Collapse.Panel header="Logistik">
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={logisticCategoryChangeHandler}
                value={logisticState?.selectedLogisticCategories}
              >
                <Space direction="vertical" size="small">
                  {logisticCategories?.map((category, i) => (
                    <Checkbox value={category?.id} key={category?.id}>
                      <Space size={4}>
                        <img src={icons[i]} alt="" style={{ width: "20px" }} />
                        {capitalizeWords(category?.name ?? "")}
                      </Space>
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            </Collapse.Panel>
          </Collapse>

          <Collapse key="survei">
            <Collapse.Panel header="Survei">
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={(value) => surveyState?.setSelectedQuestions(value)}
                value={surveyState?.selectedQuestions}
              >
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
            </Collapse.Panel>
          </Collapse>

          <Collapse key="kpu">
            <Collapse.Panel header="Data KPU">
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={(value) => kpuState?.setSelectedKPUYears(value)}
                value={kpuState?.selectedKPUYears}
              >
                <Space direction="vertical" size="small">
                  {[2019].map((year) => {
                    const value = year + "";
                    return (
                      <Checkbox key={value} value={value}>
                        Tahun {year}
                      </Checkbox>
                    );
                  })}
                </Space>
              </Checkbox.Group>
            </Collapse.Panel>
          </Collapse>
        </Space>
      </Card>
      {/* <Button type="primary" block disabled={!surveyState?.selectedQuestions?.length} onClick={clickHandler}> */}
      <Button type="primary" block onClick={clickHandler}>
        Petakan
      </Button>
    </div>
  );
}

export default FilterThematic;
