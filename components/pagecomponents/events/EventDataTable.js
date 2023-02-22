import { Button, Card, Col, Row, Tooltip } from "antd";
import { useMemo } from "react";
import { TbEye, TbPencil, TbTrashX } from "react-icons/tb";

import formateDateTime from "../../../utils/helpers/formatDateTime";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";

export default function EventDataTable({ data, apiNotification, setSelectedEvent, setDetailDrawerOpen }) {
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
        minWidth: "200px",
        maxWidth: "300px",
        sortable: true,
        grow: 1000,
      },
      {
        name: "Narahubung",
        selector: (row) => row?.contact_person || "-",
        width: "200px",
        sortable: true,
      },
      {
        name: "Link",
        selector: (row) =>
          (
            <a href={row?.link} target="_blank" rel="noreferrer">
              {row?.link}
            </a>
          ) || "-",
        width: "300px",
        sortable: true,
      },
      {
        name: "Tanggal Mulai",
        selector: (row) =>
          formateDateTime(row?.date_start, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        sortable: true,
        sortFunction: (a, b) => {
          return new Date(a?.date_start).getTime() - new Date(b?.date_start).getTime();
        },
        width: "160px",
      },
      {
        name: "Tanggal Selesai",
        selector: (row) =>
          formateDateTime(row?.date_end, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        sortable: true,
        sortFunction: (a, b) => {
          return new Date(a?.date_end).getTime() - new Date(b?.date_end).getTime();
        },
        width: "160px",
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
              <Tooltip title="Lihat kegiatan">
                <Button
                  type="text"
                  icon={<TbEye size={20} color="#016CEE" />}
                  shape="circle"
                  onClick={() => {
                    setSelectedEvent(row);
                    setDetailDrawerOpen(true);
                  }}
                />
              </Tooltip>
              <Tooltip title="Edit kegiatan">
                <Button type="text" icon={<TbPencil size={20} color="#7287A5" />} shape="circle" />
              </Tooltip>
              <Tooltip title="Hapus kegiatan">
                <Button type="text" icon={<TbTrashX size={20} color="#B12E2E" />} shape="circle" />
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
