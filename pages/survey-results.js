import { Col, Row, Space, Switch, Tabs, Typography } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import SurveyPieChart from '../components/pagecomponents/surveyResults/SurveyPieChart';
import SurveySelector from '../components/pagecomponents/surveyResults/SurveySelector';
const SurveyLineChart = dynamic(() =>
  import('../components/pagecomponents/surveyResults/SurveyLineChart')
);

export default function SurveyResults({ surveys }) {
  const [selectedSurvey, setSelectedSurvey] = useState(surveys[0]);

  const tabItems = [
    {
      key: '1',
      label: `Rangkuman`,
      children: (
        <>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <SurveyLineChart title="Jumlah Responden" />
            <SurveyPieChart title="Chart Pertanyaan 1" />
            <SurveyPieChart title="Chart Pertanyaan 2" />
            <SurveyPieChart title="Chart Pertanyaan 3" />
          </Space>
        </>
      ),
    },
    {
      key: '2',
      label: `Jawaban responden`,
      children: `Under development`,
    },
  ];

  return (
    <div>
      <Row gutter={48}>
        <Col
          span={8}
          style={{
            height: 'calc(100vh - 120px)',
            overflow: 'auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: '0px',
              background: 'white',
              paddingBottom: '10px',
              width: 'calc(100% + 32px)',
              margin: '0 -16px',
              padding: '16px',
            }}
          >
            <h1>Analitik Survei</h1>
          </div>

          <SurveySelector
            surveys={surveys}
            selectedSurvey={selectedSurvey}
            setSelectedSurvey={setSelectedSurvey}
          />
        </Col>
        <Col
          span={16}
          style={{
            height: 'calc(100vh - 120px)',
            borderLeft: '1px solid #EEEEEE',
            padding: '0 24px',
            overflow: 'auto',
            position: 'relative',
            background: '#FAFAFB',
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            {/* row header */}
            <Row
              style={{
                padding: '24px',
                margin: '0 -24px',
                background: 'white',
              }}
            >
              <Col span={24}>
                <Typography.Title level={3} style={{ marginBottom: '16px' }}>
                  {selectedSurvey?.survey_name}
                </Typography.Title>
              </Col>
              <Col span={15}>
                <Space direction="vertical" size="0px">
                  <Typography.Title level={5}>312 responden</Typography.Title>
                  <Typography.Text style={{ color: '#7287A5' }}>
                    23 Desember 2022, 10:21
                  </Typography.Text>
                </Space>
              </Col>
              <Col span={1}></Col>
              <Col span={8}>
                <Typography.Title level={5}>Status</Typography.Title>
                <Space>
                  <Typography.Text>Tidak Aktif</Typography.Text>
                  <Switch />
                  <Typography.Text>Aktif</Typography.Text>
                </Space>
              </Col>
            </Row>
            {/* row tabs -> charts and results */}
            <Row>
              <Col span={24}>
                <Tabs defaultActiveKey="1" items={tabItems} centered />
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  let { token } = parseCookies(ctx);
  let surveys = [];
  await axios
    .get(`${process.env.APP_BASEURL}api/survey`, {
      withCredentials: true,
      headers: { Cookie: `token=${token}` },
    })
    .then((res) => {
      surveys = res.data.data || [];
    })
    .catch((err) => {});

  return { props: { surveys } };
}
