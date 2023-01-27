import { Button, Card, Col, Row } from "antd";
import { TbEye } from "react-icons/tb";

import dayMonthYear from "../../../utils/helpers/date/dayMonthYear";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";

export default function ReportDataTable({ data, setSelectedReport, setIsDrawerOpen, apiNotification }) {
  const openDetailDrawerHandler = (row) => {
    setSelectedReport(row);
    setIsDrawerOpen(true);
  };

  console.log("data", data);

  const columns = [
    // {
    //   name: "No",
    //   selector: (row) => row.no,
    //   width: "80px",
    //   center: true,
    //   sortable: true,
    // },
    {
      name: "Kategori",
      selector: (row) => "kategori",
    },
    {
      name: "Judul",
      selector: (row) => row?.title,
    },
    {
      name: "Waktu",
      selector: (row) => dayMonthYear(row?.created_at),
    },
    {
      name: "Status",
      selector: (row) => row?.complaint_status?.status_name,
      sortable: true,
    },
    {
      name: "Aksi",
      selector: (row) => {
        return (
          <div className="d-flex gap-2">
            <Button
              type="text"
              icon={<TbEye size={20} color="#7287A5" />}
              shape="circle"
              onClick={() => openDetailDrawerHandler(row)}
            ></Button>
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
