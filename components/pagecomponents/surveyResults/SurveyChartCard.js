import { Card, Col, Row } from 'antd';

export default function SurveyChartCard({ title, children }) {
  return (
    <Row>
      <Col span={24}>
        <Card title={title}>{children}</Card>
      </Col>
    </Row>
  );
}
