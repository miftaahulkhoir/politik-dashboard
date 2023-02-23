import { Drawer, Grid, Space } from "antd";
import React, { useMemo } from "react";

import SurveyPieChart from "../../surveyAnalitics/charts/SurveyPieChart";

export default function RegionQuestionDetailDrawer({ open, setOpen, selectedRegion }) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const onClose = () => {
    setOpen(false);
  };

  const getPieData = (options, counts) => {
    const result = counts?.map((count, index) => ({
      name: options[index],
      value: count ?? 0,
    }));
    return result;
  };

  return (
    <Drawer
      title={`${selectedRegion?.village}, ${selectedRegion?.district}, ${selectedRegion?.regency}`}
      placement="right"
      onClose={onClose}
      open={open}
      closable={true}
      width={isSM ? "100%" : "500px"}
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Space direction="vertical" size="small" key={selectedRegion?.village_id}>
        {selectedRegion?.question_responses?.length == 0 ? <div>Tidak ada data yang tersedia di daerah ini</div> : null}
        {selectedRegion?.question_responses?.map((response) => {
          return (
            <SurveyPieChart
              key={response?.question + selectedRegion?.village_id}
              title={response?.question}
              data={getPieData(response?.options, response?.counts)}
            />
          );
        })}
      </Space>
    </Drawer>
  );
}
