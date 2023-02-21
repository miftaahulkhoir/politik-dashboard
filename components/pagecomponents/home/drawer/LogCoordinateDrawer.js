import { Drawer, Grid, Space } from "antd";
import moment from "moment";
import React, { useMemo } from "react";
import DataTable from "react-data-table-component";

function LogCoordinateDrawer({ open, setOpen, data, selectedUser }) {
  const screen = Grid.useBreakpoint();

  const columns = [
    {
      name: "Lokasi",
      selector: (row) => row.locationName,
    },
    {
      name: "Tanggal",
      selector: (row) => moment.utc(row?.timestamp)?.local()?.format("H:mm D/M/Y"),
    },
  ];

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
        <Section title="Nama">{selectedUser?.name ?? "-"}</Section>
        <Section title="Jabatan">{selectedUser?.occupation?.name ?? "-"}</Section>
        <DataTable
          style={{ padding: "0" }}
          persistTableHead
          dense
          striped
          paginationPerPage={20}
          columns={columns}
          data={data}
          customStyles={{
            rows: {
              style: {
                padding: "0px 0",
                fontSize: "14px",
              },
            },
          }}
        />
      </Space>
    </Drawer>
  );
}

export default LogCoordinateDrawer;

function Section({ children, title, horizontal = false }) {
  return (
    <Space direction={horizontal ? "horizontal" : "vertical"} style={{ width: "100%", alignItems: "baseline" }}>
      <div style={{ fontSize: "12px", fontWeight: 600, color: "#7287A5" }}>{title}</div>
      <div>{children}</div>
    </Space>
  );
}
