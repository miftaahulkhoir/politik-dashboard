import { Col, Row, Card } from "antd";
import { useMemo } from "react";

export default function KoorData({ totalLogistics, totalRelawan, pemilih }) {
  const pemilihBaru = useMemo(() => {
    // Get the current date
    const currentDate = new Date();

    let latestVotersCount = 0;

    pemilih?.forEach((p) => {
      const createdDate = new Date(p?.created_at);

      // Calculate the difference in days between the current date and user's creation date
      const timeDiff = currentDate.getTime() - createdDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      // Check if the user was created within the last 3 days
      if (daysDiff <= 3 && daysDiff >= 0) {
        latestVotersCount++;
      }
    });
    return latestVotersCount;
  }, [pemilih]);

  return (
    <Row gutter={30}>
      <Col span={6}>
        <Card size="small" style={{ boxShadow: "0px 0px 31px 0px rgba(0,0,0,0.1)" }}>
          <Row justify="space-between">
            <span style={{ color: "#A57272", fontSize: "0.8rem", marginBottom: "5px" }}>Total Relawan</span>
          </Row>
          <Row align="middle" justify="space-between">
            <Col>
              <span style={{ fontSize: "1.75rem", fontWeight: "600" }}>{totalRelawan}</span>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card size="small" style={{ boxShadow: "0px 0px 31px 0px rgba(0,0,0,0.1)" }}>
          <Row justify="space-between">
            <span style={{ color: "#A57272", fontSize: "0.8rem", marginBottom: "5px" }}>Total Pemilih</span>
          </Row>
          <Row align="middle" justify="space-between">
            <Col>
              <span style={{ fontSize: "1.75rem", fontWeight: "600" }}>{pemilih.length}</span>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card size="small" style={{ boxShadow: "0px 0px 31px 0px rgba(0,0,0,0.1)" }}>
          <Row justify="space-between" style={{ marginBottom: "5px" }}>
            <Col>
              <span style={{ color: "#A57272", fontSize: "0.8rem" }}>Total Logistik</span>
            </Col>
          </Row>
          <Row align="middle" justify="space-between">
            <Col>
              <span style={{ fontSize: "1.75rem", fontWeight: "600" }}>{totalLogistics}</span>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
        <Card size="small" style={{ boxShadow: "0px 0px 31px 0px rgba(0,0,0,0.1)" }}>
          <Row style={{ marginBottom: "5px" }} justify="space-between">
            <Col>
              <span style={{ color: "#A57272", fontSize: "0.8rem" }}>Pemilih Baru</span>
            </Col>
          </Row>
          <Row align="middle" justify="space-between">
            <Col>
              <span style={{ fontSize: "1.75rem", fontWeight: "600" }}>{pemilihBaru}</span>
            </Col>
            <Col>
              <span style={{ color: "#A57272", fontSize: "0.75rem" }}>(3 hari)</span>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
