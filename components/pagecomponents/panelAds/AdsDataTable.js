import { Button, Card, Col, Modal, Row } from "antd";
import { useCallback, useMemo } from "react";
import { TbPencil, TbTrashX } from "react-icons/tb";

import { deleteUser } from "../../../utils/services/users";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";

export default function UserDataTable({
  data,
  currentUser,
  setSelectedUser,
  setIsFormEdit,
  setIsDrawerActive,
  apiNotification,
  users,
  setUsers,
}) {
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
        name: "Nama Ads",
        selector: (row) => row?.campaign.name || "-",
        width: "180px",
        maxWidth: "400px",
      },
      {
        name: "Status",
        selector: (row) => row?.campaign.status[0] + row.campaign.status.slice(1).toLowerCase() || "-",
        // maxWidth: "600px",
        width: "100px",
        grow: 1000,
      },
      {
        name: "Tipe Ads",
        selector: (row) =>
          row?.campaign.advertisingChannelType[0] + row?.campaign.advertisingChannelType.slice(1).toLowerCase() || "-",
        width: "160px",
        sortable: true,
      },
      {
        name: "Strategi Ads",
        selector: (row) => row?.campaign.biddingStrategyType || "-",
        minWidth: "210px",
        maxWidth: "400px",
      },
      {
        name: "Budget/Hari",
        selector: (row) =>
          row.customer.currencyCode + " " + row?.campaignBudget.amountMicros.slice(0, -6) + ".00" || "0.00",
        minWidth: "130px",
        maxWidth: "400px",
      },
      {
        name: "Clicks",
        selector: (row) => row?.metrics.clicks || "0",
        minWidth: "110px",
        maxWidth: "400px",
      },
      {
        name: "Impressions",
        selector: (row) => row?.metrics.impressions || "0",
        minWidth: "130px",
        maxWidth: "400px",
      },
      {
        name: "CTR",
        selector: (row) => row?.metrics.ctr || "0.00%",
        minWidth: "110px",
        maxWidth: "400px",
      },
      {
        name: "Avg. CPC",
        selector: (row) => row?.metrics.averageCpc || row.customer.currencyCode + "0.00",
        minWidth: "110px",
        maxWidth: "400px",
      },
      {
        name: "Cost",
        selector: (row) => row?.metrics.costMicros || row.customer.currencyCode + "0.00",
        minWidth: "110px",
        maxWidth: "400px",
      },
      {
        name: "Conversions",
        selector: (row) => row?.metrics.conversions || "0.00",
        minWidth: "130px",
        maxWidth: "400px",
      },
      {
        name: "View Through Conv.",
        selector: (row) => row?.metrics.viewThroughConversions || "0",
        minWidth: "170px",
        maxWidth: "400px",
      },
      {
        name: "Cost/Conv.",
        selector: (row) => row?.metrics.costPerConversions || row.customer.currencyCode + "0.00",
        minWidth: "110px",
        maxWidth: "400px",
      },
      {
        name: "",
        compact: true,
        minWidth: "0px",
        grow: 1,
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
