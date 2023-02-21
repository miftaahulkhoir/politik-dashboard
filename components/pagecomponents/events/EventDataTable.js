import { Button, Card, Col, Row, Tooltip } from "antd";
import { useMemo } from "react";
import { TbPencil } from "react-icons/tb";

import formateDateTime from "../../../utils/helpers/formatDateTime";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";

export default function EventDataTable({ data, apiNotification }) {
  const columns = useMemo(() => {
    return [
      {
        name: "No",
        selector: (row) => row.no,
        width: "80px",
        center: true,
        sortable: true,
      },
      {
        name: "Judul",
        selector: (row) => row?.event_name || "-",
        width: "180px",
        sortable: true,
      },
      {
        name: "Deskripsi",
        selector: (row) => row?.description || "-",
        width: "180px",
        sortable: true,
      },
      {
        name: "Kategori",
        selector: (row) => row?.category || "-",
        width: "180px",
        sortable: true,
      },
      {
        name: "Link",
        selector: (row) => row?.link || "belum ada field di api-nya",
        maxWidth: "600px",
        grow: 1000,
        sortable: true,
      },
      {
        name: "Jadwal Rilis",
        selector: (row) =>
          formateDateTime(row?.created_at, {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        sortable: true,
        sortFunction: (a, b) => {
          return new Date(a?.created_at).getTime() - new Date(b?.created_at).getTime();
        },
        width: "130px",
        center: true,
      },
      {
        name: "",
        compact: true,
        minWidth: "0px",
        grow: 1,
      },
      {
        name: "Aksi",
        selector: (row) => {
          return (
            <div className="d-flex gap-2">
              <Tooltip title="Edit pengguna">
                <Button type="text" icon={<TbPencil size={20} color="#7287A5" />} shape="circle"></Button>
              </Tooltip>
            </div>
          );
        },
        width: "150px",
        center: true,
      },
    ];
  }, []);

  return (
    <Row justify="end">
      <Col span={24}>
        <Card bodyStyle={{ padding: "0px" }} style={{ overflow: "hidden" }}>
          <CustomDataTable columns={columns} data={data} pagination />
        </Card>
      </Col>
    </Row>
  );
}
