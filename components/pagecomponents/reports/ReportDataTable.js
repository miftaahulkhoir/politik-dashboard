import { Button, Card, Col, Row, Tooltip } from "antd";
import { TbEye } from "react-icons/tb";

import ReportStatusPill from "./ReportStatusPill";

import capitalizeWords from "../../../utils/helpers/capitalizeWords";
import dayMonthYear from "../../../utils/helpers/date/dayMonthYear";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";

export default function ReportDataTable({ data, setSelectedReport, setIsDrawerOpen, apiNotification }) {
  const openDetailDrawerHandler = (row) => {
    setSelectedReport(row);
    setIsDrawerOpen(true);
  };

  const columns = [
    {
      name: "Judul",
      selector: (row) => row?.title,
    },
    {
      name: "Kategori",
      selector: (row) => capitalizeWords(row?.category?.category_name),
    },
    {
      name: "Waktu",
      selector: (row) => dayMonthYear(row?.created_at),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => <ReportStatusPill id={row?.complaint_status?.id} />,
      sortable: true,
    },
    {
      name: "Aksi",
      selector: (row) => {
        return (
          <div className="d-flex gap-2">
            <Tooltip title="Lihat detail pengaduan">
              <Button
                type="text"
                icon={<TbEye size={20} color="#7287A5" />}
                shape="circle"
                onClick={() => openDetailDrawerHandler(row)}
              ></Button>
            </Tooltip>
          </div>
        );
      },
      // width: "130px",
      center: true,
    },
  ];

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
