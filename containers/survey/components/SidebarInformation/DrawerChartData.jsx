import React, { useContext, useMemo } from "react";
import { Drawer, Grid, Tabs } from "antd";

import { SurveyMapContext } from "../../SurveyMapContext";
import SurveyQuestionBarChart from "./SurveyQuestionBarChart";
import SurveyQuestionTableChart from "./SurveyQuestionTableChart";
import SurveyQuestionPieChart from "./SurveyQuestionPieChart";

const DrawerChartData = ({ open }) => {
  const { setSelectedSurveyPolygon, setIsShowDrawer, selectedPolygonProperty } = useContext(SurveyMapContext);
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const onClose = () => {
    setSelectedSurveyPolygon({});
    setIsShowDrawer(false);
  };

  return (
    <Drawer
      title={selectedPolygonProperty.provinsi}
      placement="right"
      onClose={onClose}
      open={open}
      closable={true}
      width={isSM ? "100%" : "600px"}
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Table Chart",
            children: <SurveyQuestionTableChart />,
          },
          { key: "2", label: "Bar Chart", children: <SurveyQuestionBarChart /> },
          {
            key: "3",
            label: "Pie Chart",
            children: <SurveyQuestionPieChart />,
          },
        ]}
      />
    </Drawer>
  );
};

export default DrawerChartData;
