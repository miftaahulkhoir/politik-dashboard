import { Drawer, Grid } from "antd";
import moment from "moment";
import React, { useMemo } from "react";
import DataTable from "react-data-table-component";

function LogCoordinateDrawer({ open, setOpen, data }) {
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
    </Drawer>
  );
}

export default LogCoordinateDrawer;
