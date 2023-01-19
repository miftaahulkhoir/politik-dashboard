import { Card, Typography } from 'antd';

export default function SurveyChartCard({
  title,
  children,
  fitTitleHeight = false,
}) {
  return (
    <Card
      size="small"
      style={{
        padding: '0',
        maxHeight: '490px',
        overflow: 'auto',
        position: 'relative',
      }}
      bodyStyle={{
        paddingTop: '0',
      }}
    >
      <Typography.Title
        level={5}
        style={{
          fontWeight: 600,
          height: fitTitleHeight ? 'auto' : '5em',
          background: 'white',
          position: 'sticky',
          top: '0px',
          padding: '16px 0',
          zIndex: 999,
        }}
      >
        {title}
      </Typography.Title>
      <div>{children}</div>
    </Card>
  );
}
