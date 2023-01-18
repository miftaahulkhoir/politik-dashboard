import { Card, Typography } from 'antd';

export default function SurveyChartCard({ title, children }) {
  return (
    <Card size="small" style={{ padding: '0' }}>
      <div>
        <Typography.Title level={5} style={{ fontWeight: 600, height: '5em' }}>
          {title}
        </Typography.Title>
        <div>{children}</div>
      </div>
    </Card>
  );
}
