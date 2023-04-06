import { Button, Card, Col, Modal, Row, Space, Typography } from "antd";
import { useCallback, useMemo } from "react";
import { TbPencil, TbTrashX } from "react-icons/tb";

import AdsCard from "./AdsCard";

import biddingTypeFormatter from "../../../utils/helpers/biddingTypeFormatter";
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
  return (
    <>
      <Row>
        <Col span={15}>
          <Space direction="horizontal" size="0px">
            <Typography.Title level={3} style={{ marginBottom: "16px", paddingRight: "10px" }}>
              {data?.campaign?.name || "-"}
            </Typography.Title>
            <Typography.Title level={5} style={{ color: "#7287A5" }}>
              ({data?.campaign.status[0] + data.campaign.status.slice(1).toLowerCase() || "-"})
            </Typography.Title>
          </Space>
        </Col>
      </Row>

      <Row gutter={18}>
        <Col span={6}>
          <Card noPadding style={{ margin: "10px 0px" }}>
            <AdsCard
              title={"Tipe Ads"}
              data={
                data?.campaign.advertisingChannelType[0] +
                  data?.campaign.advertisingChannelType.slice(1).toLowerCase() || "-"
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card noPadding style={{ margin: "10px 0px" }}>
            <AdsCard title={"Strategi Ads"} data={biddingTypeFormatter(data?.campaign.biddingStrategyType || "-")} />
          </Card>
        </Col>
        <Col span={6}>
          <Card noPadding style={{ margin: "10px 0px" }}>
            <AdsCard
              title={"Budget/Hari"}
              data={
                data?.customer.currencyCode + " " + data?.campaignBudget.amountMicros.slice(0, -6) + ".00" || "0.00"
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card noPadding style={{ margin: "10px 0px" }}>
            <AdsCard title={"Clicks"} data={data?.metrics.clicks || "0"} />
          </Card>
        </Col>
      </Row>
      <Row gutter={18}>
        <Col span={6}>
          <Card noPadding style={{ margin: "10px 0px" }}>
            <AdsCard title={"Impressions"} data={data?.metrics.impressions || "0"} />
          </Card>
        </Col>
        <Col span={6}>
          <Card noPadding style={{ margin: "10px 0px" }}>
            <AdsCard title={"CTR"} data={data?.metrics.ctr || "0.00%"} />
          </Card>
        </Col>
        <Col span={6}>
          <Card noPadding style={{ margin: "10px 0px" }}>
            <AdsCard title={"Avg. CPC"} data={data?.metrics.averageCpc || data?.customer.currencyCode + "0.00"} />
          </Card>
        </Col>
        <Col span={6}>
          <Card noPadding style={{ margin: "10px 0px" }}>
            <AdsCard title={"Cost"} data={data?.metrics.costMicros || data?.customer.currencyCode + "0.00"} />
          </Card>
        </Col>
        <Col span={6}>
          <Card noPadding style={{ margin: "10px 0px" }}>
            <AdsCard title={"Conversion"} data={data?.metrics.conversions || "0.00"} />
          </Card>
        </Col>
        <Col span={6}>
          <Card noPadding style={{ margin: "10px 0px" }}>
            <AdsCard title={"View Through Conv."} data={data?.metrics.viewThroughConversions || "0"} />
          </Card>
        </Col>
        <Col span={6}>
          <Card noPadding style={{ margin: "10px 0px" }}>
            <AdsCard
              title={"Cost/Conv."}
              data={data?.metrics.costPerConversions || data.customer.currencyCode + "0.00"}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
