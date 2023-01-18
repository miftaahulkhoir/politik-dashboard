import { Col, Row, Space, Tabs } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import SurveyDropdownSelector from '../components/pagecomponents/surveyResults/SurveyDropdownSelector';
import SurveyResultHeader from '../components/pagecomponents/surveyResults/SurveyResultHeader';

const SurveyCharts = dynamic(() =>
  import('../components/pagecomponents/surveyResults/SurveyCharts')
);

export default function SurveyResults({ surveys }) {
  const [selectedSurveyID, setSelectedSurveyID] = useState();
  const [survey, setSurvey] = useState();

  useEffect(() => {
    if (!selectedSurveyID) return;
    axios
      .get(`/api/survey-result/${selectedSurveyID}`)
      .then((res) => setSurvey(res.data.data))
      .catch((err) => {});
  }, [selectedSurveyID]);

  const tabItems = [
    {
      key: '1',
      label: `Rangkuman`,
      children: <SurveyCharts survey={survey} />,
    },
    {
      key: '2',
      label: `Jawaban responden`,
      children: `Under development`,
    },
  ];

  return (
    <>
      <div className="col-12 pdv-3">
        <h1>Analitik Survei</h1>
      </div>

      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* row select survey */}
        <SurveyDropdownSelector
          surveys={surveys}
          setSelectedSurveyID={setSelectedSurveyID}
        />

        {survey ? (
          <>
            {/* row header */}
            <SurveyResultHeader survey={survey} />
            {/* row tabs -> charts and results */}
            <Row>
              <Col span={24}>
                <Tabs defaultActiveKey="1" items={tabItems} centered />
              </Col>
            </Row>
          </>
        ) : null}
      </Space>
    </>
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
