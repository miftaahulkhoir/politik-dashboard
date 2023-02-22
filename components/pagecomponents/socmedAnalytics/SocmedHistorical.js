import { Button, DatePicker, Grid, Row, Col, Select } from "antd";
import dynamic from "next/dynamic";

import styles from "./socmed.module.css";
import SocmedTimeChart from "./SocmedTimeChart";

import Card from "../../elements/card/Card";

const ReactEcharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function SocmedHistorical({ data, socmedType, dataLength }) {
  const colors = ["#08c4b2", "#6f5ed3", "#ce3665", "#ffcd1c", "#3896e3"];

  if (socmedType == "facebook") {
    return (
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Followers"}
                color={colors[0]}
                chartType={dataLength > 13 ? "line" : "bar"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Likes"}
                color={colors[1]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Reactions"}
                color={colors[2]}
                chartType={dataLength > 13 ? "line" : "bar"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Engagement"}
                color={colors[3]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Impressions"}
                color={colors[4]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Paid Impressions"}
                color={colors[0]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Video View Time"}
                color={colors[1]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Video Views"}
                color={colors[2]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Paid Video Views"}
                color={colors[3]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
      </Row>
    );
  } else if (socmedType == "twitter") {
    return (
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Followers"}
                color={colors[4]}
                chartType={dataLength > 13 ? "line" : "bar"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Following"}
                color={colors[3]}
                chartType={dataLength > 13 ? "line" : "bar"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"User Likes"}
                color={colors[2]}
                chartType={dataLength > 13 ? "line" : "bar"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"User Tweet Count"}
                color={colors[1]}
                chartType={dataLength > 13 ? "line" : "bar"}
              />
            </div>
          </Card>
        </Col>
      </Row>
    );
  } else if (socmedType == "instagram") {
    return (
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Followers"}
                color={colors[3]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Following"}
                color={colors[4]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Impressions"}
                color={colors[0]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Likes"}
                color={colors[1]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Comments"}
                color={colors[2]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Post Count"}
                color={colors[3]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Profile Views"}
                color={colors[4]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className={styles.social_chart}>
              <SocmedTimeChart
                data={data}
                socmedType={socmedType}
                title={"Reach"}
                color={colors[0]}
                chartType={"line"}
              />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}
