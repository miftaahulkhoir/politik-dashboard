import { Button, Card, Col, Row, Tooltip } from "antd";
import { useMemo } from "react";
import { TbEye } from "react-icons/tb";

import ReportStatusPill from "./ReportStatusPill";

import capitalizeWords from "../../../utils/helpers/capitalizeWords";
import formateDateTime from "../../../utils/helpers/formatDateTime";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";
import LimitedText from "../../elements/typography/LimitedText";

export default function ReportDataTable({ data, setSelectedReport, setIsDrawerOpen, apiNotification }) {
  const openDetailDrawerHandler = (row) => {
    setSelectedReport(row);
    setIsDrawerOpen(true);
  };

  const formattedData = useMemo(() => {
    return data.map((d, index) => {
      d.no = index + 1;
      return d;
    });
  }, [data]);

  const columns = [
    {
      name: "No",
      selector: (row) => row?.no,
      width: "80px",
      sortable: true,
      center: true,
    },
    {
      name: "Judul",
      selector: (row) => (row?.title ? <LimitedText text={row.title} /> : "-"),
      grow: 1000,
      maxWidth: "600px",
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => capitalizeWords(row?.category?.category_name),
      minWidth: "200px",
      maxWidth: "300px",
      sortable: true,
    },
    {
      name: "Waktu",
      selector: (row) =>
        formateDateTime(row?.created_at, {
          hour: "2-digit",
          minute: "2-digit",
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      sortable: true,
      sortFunction: (a, b) => {
        return new Date(a?.created_at).getTime() - new Date(b?.created_at).getTime();
      },
      width: "160px",
      center: true,
    },
    {
      name: "Status",
      selector: (row) => <ReportStatusPill id={row?.complaint_status?.id} />,
      sortable: true,
      sortFunction: (a, b) => {
        return Number(a?.complaint_status?.id || "100") - Number(b?.complaint_status?.id || "100");
      },
      center: true,
      minWidth: "250px",
      maxWidth: "300px",
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
      width: "80px",
      center: true,
    },
  ];

  return (
    <Row justify="end">
      <Col span={24}>
        <Card bodyStyle={{ padding: "0px" }} style={{ overflow: "hidden" }}>
          <CustomDataTable columns={columns} data={formattedData} pagination />
        </Card>
      </Col>
    </Row>
  );
}
