import { Button, Card, Col, Modal, Row, Space, Typography } from "antd";
import { useCallback, useMemo } from "react";
import { TbPencil, TbTrashX } from "react-icons/tb";

import SocmedCard from "./SocmedCard";

import biddingTypeFormatter from "../../../utils/helpers/biddingTypeFormatter";
import { deleteUser } from "../../../utils/services/users";
import CustomDataTable from "../../elements/customDataTable/CustomDataTable";
import styles from "../home/home.module.css";

export default function SocmedSummary({
  data,
  socmedType,
  currentUser,
  setSelectedUser,
  setIsFormEdit,
  setIsDrawerActive,
  apiNotification,
  users,
  setUsers,
}) {
  if (socmedType == "twitter") {
    return (
      <>
        <Row gutter={18}>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Tweet"} data={data?.analytics.tweetCount || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Teman"} data={data?.analytics.friendsCount || 0} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Like"} data={data?.analytics.likedCount || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Listed"} data={data?.analytics.listedCount || "0"} />
            </Card>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Domisili"} data={data?.analytics.location || "-"} />
            </Card>
          </Col>
        </Row>
      </>
    );
  } else if (socmedType == "facebook") {
    return (
      <>
        <Row gutter={18}>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Consumption"} data={data?.analytics.pageConsumptions || 0} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"User Engagement"} data={data?.analytics.pageEngagedUsers || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Engagement"} data={data?.analytics.fanCount || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Impressions"} data={data?.analytics.pageImpressions || "0"} />
            </Card>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Impressions Berbayar"} data={data?.analytics.pageImpressionsPaid || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Post Engagement"} data={data?.analytics.pagePostEngagements || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Post Impression"} data={data?.analytics.pagePostsImpressions || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Post Impression Berbayar"} data={data?.analytics.pagePostsImpressionsPaid || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Waktu Video View"} data={data?.analytics.pageVideoViewTime || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Video View"} data={data?.analytics.pageVideoView || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Video View Berbayar"} data={data?.analytics.pageVideoViewsPaid || "0"} />
            </Card>
          </Col>
        </Row>
        {/* <Row gutter={18}>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Reaksi: Anger"} data={data?.analytics.reactions.anger || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Reaksi: Like"} data={data?.analytics.reactions.like || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Reaksi: Love"} data={data?.analytics.reactions.love || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Reaksi: Wow"} data={data?.analytics.reactions.wow || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Reaksi: Haha"} data={data?.analytics.reactions.haha || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Reaksi: Sorry"} data={data?.analytics.reactions.sorry || "0"} />
            </Card>
          </Col>
          <Col span={6}>
            <Card noPadding style={{ margin: "10px 0px" }}>
              <SocmedCard title={"Reaksi: Total"} data={data?.analytics.reactions.total || "0"} />
            </Card>
          </Col>
        </Row> */}
      </>
    );
  }
}
