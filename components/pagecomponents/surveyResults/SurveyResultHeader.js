import { Col, Row, Space, Switch, Typography } from 'antd';
import { useMemo } from 'react';

export default function SurveyResultHeader({ survey }) {
  const date = useMemo(() => {
    const createdAt = new Date(survey.created_at);
    const formatted = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(createdAt);

    console.log('survey', survey);
    return formatted;
  }, [survey]);

  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={3} style={{ marginBottom: '16px' }}>
          {survey?.survey_name}
        </Typography.Title>
      </Col>
      <Col span={15}>
        <Space direction="vertical" size="0px">
          <Typography.Title level={5}>
            {survey?.total_respondent} responden
          </Typography.Title>
          <Typography.Text style={{ color: '#7287A5' }}>{date}</Typography.Text>
        </Space>
      </Col>
      <Col span={1}></Col>
      <Col span={8}>
        <Typography.Title level={5}>Status</Typography.Title>
        <Space>
          <Typography.Text>Tidak Aktif</Typography.Text>
          {/* TODO: implement switch */}
          <Switch checked={survey.status} />
          <Typography.Text>Aktif</Typography.Text>
        </Space>
      </Col>
    </Row>
  );
}
