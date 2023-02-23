import { Button, Card, Col, Row, Tooltip } from "antd";
import { useMemo } from "react";
import { TbEye } from "react-icons/tb";

import capitalizeWords from "../../../utils/helpers/capitalizeWords";
import formateDateTime from "../../../utils/helpers/formatDateTime";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";

export default function LogisticDataTable({ data, setSelectedLogistic, setIsDetailDrawerOpen, apiNotification }) {
  const openDetailDrawerHandler = (row) => {
    setSelectedLogistic(row);
    setIsDetailDrawerOpen(true);
  };

  const formattedData = useMemo(() => {
    return data?.map((d, index) => {
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
      name: "ID Peralatan",
      selector: (row) => row?.id,
      width: "140px",
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => capitalizeWords(row?.category?.name),
      grow: 1000,
      maxWidth: "140px",
      sortable: true,
    },
    {
      name: "Nama",
      selector: (row) => capitalizeWords(row?.name),
      minWidth: "200px",
      maxWidth: "300px",
      sortable: true,
    },
    // {
    //   name: "Lokasi",
    //   selector: (row) => row?.location,
    //   minWidth: "200px",
    //   maxWidth: "300px",
    //   sortable: true,
    // },
    {
      name: "Terakhir Update",
      selector: (row) =>
        formateDateTime(row?.updated_at, {
          // hour: "2-digit",
          // minute: "2-digit",
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      sortable: true,
      sortFunction: (a, b) => {
        return new Date(a?.updated_at).getTime() - new Date(b?.updated_at).getTime();
      },
      width: "160px",
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
            <Tooltip title="Lihat detail logistik">
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
