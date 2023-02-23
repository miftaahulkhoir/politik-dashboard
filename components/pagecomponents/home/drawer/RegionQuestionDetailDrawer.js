import { Drawer, Grid, Space } from "antd";
import React, { useMemo } from "react";

export default function RegionQuestionDetailDrawer({ open, setOpen, selectedRegion }) {
  console.log("region", selectedRegion);
  const screen = Grid.useBreakpoint();

  const isSM = useMemo(() => {
    return !screen.md && !screen.lg && !screen.xl && !screen.xxl;
  }, [screen]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title="Data Koordinat"
      placement="right"
      onClose={onClose}
      open={open}
      closable={true}
      width={isSM ? "100%" : "500px"}
      headerStyle={{ border: "none", fontSize: "32px" }}
    >
      <Space direction="vertical" size="large">
        halo bang
      </Space>
    </Drawer>
  );
}
