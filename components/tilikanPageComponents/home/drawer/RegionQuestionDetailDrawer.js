import { Drawer, Grid, Space, Tabs } from "antd";
import React, { useMemo } from "react";

import SurveyHorizontalBarChart from "../../surveyAnalitics/charts/SurveyHorizontalBarChart";
import SurveyPieChart from "../../surveyAnalitics/charts/SurveyPieChart";
import SurveyTableChart from "../../surveyAnalitics/charts/SurveyTableChart";

function RegionQuestionDetail({ questionResponse: response, selectedRegionLevel, selectedRegion }) {
  const getPieData = (options, counts) => {
    const result = counts?.map((count, index) => ({
      name: options[index],
      value: count ?? 0,
    }));
    return result;
  };

  const getTableData = (options, counts) => {
    const result = counts?.map((count, index) => ({
      option_name: options[index],
      total_answer: count ?? 0,
    }));
    return result;
  };

  const tableData = (response) => {
    if (selectedRegionLevel == 2) {
      return getTableData(response?.options, response?.district_counts);
    }
    return getTableData(response?.options, response?.counts);
  };

  const pieData = (response) => {
    if (selectedRegionLevel == 2) {
      return getPieData(response?.options, response?.district_counts);
    }
    return getPieData(response?.options, response?.counts);
  };

  const tabItems = [
    {
      key: "1",
      label: `Bar Chart`,
      children: (
        <SurveyHorizontalBarChart
          title={response?.question}
          dataX={pieData(response).map((d) => d.value)}
          dataY={pieData(response).map((d) => d.name)}
          colors={response?.colors}
          fitTitleHeight
        />
      ),
    },
    {
      key: "2",
      label: `Table Chart`,
      children: <SurveyTableChart title={response?.question} options={tableData(response)} />,
    },
    {
      key: "3",
      label: `Pie Chart`,
      children: <SurveyPieChart title={response?.question} data={pieData(response)} />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={tabItems} />;
}
export default function RegionQuestionDetailDrawer({ open, setOpen, selectedRegion, selectedRegionLevel }) {
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const onClose = () => {
    setOpen(false);
  };

  const title = useMemo(() => {
    // const regionTitle = `${selectedRegion?.district}, ${selectedRegion?.regency}`;
    // if (selectedRegionLevel == 1) {
    //   return `${selectedRegion?.village}, ${regionTitle}`;
    // }
    const regionTitle = `Provinsi ${selectedRegion?.province}`;
    return regionTitle;
  }, [selectedRegion, selectedRegionLevel]);

  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      open={open}
      closable={true}
      width={isSM ? "100%" : "600px"}
      headerStyle={{ border: "none", fontSize: "32px" }}
      style={{ background: "#151922" }}
    >
      <Space direction="vertical" size="small" key={selectedRegion?.village_id}>
        {selectedRegion?.question_responses?.length == 0 || !selectedRegion?.question_responses ? (
          <div className="text-white">Tidak ada data yang tersedia di daerah ini</div>
        ) : (
          selectedRegion?.question_responses?.map((response) => {
            return (
              <RegionQuestionDetail
                key={response?.question + selectedRegion?.village_id}
                questionResponse={response}
                selectedRegion={selectedRegion}
                selectedRegionLevel={selectedRegionLevel}
              />
            );
          })
        )}
      </Space>
    </Drawer>
  );
}
