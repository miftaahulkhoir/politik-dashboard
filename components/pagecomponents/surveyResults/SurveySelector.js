import { Divider, Space } from 'antd';

export default function SurveySelector({
  surveys,
  selectedSurvey,
  setSelectedSurvey,
}) {
  console.log(surveys);
  return (
    <Space
      direction="vertical"
      size={0}
      style={{
        minWidth: 'calc(100% + 32px)',
        margin: '0 -16px',
      }}
    >
      {surveys.map((survey, index) => (
        <div key={index}>
          <div
            style={{
              padding: '16px',
              userSelect: 'none',
              background: selectedSurvey.id === survey.id ? '#E4F3FF' : '',
            }}
            role="button"
            onClick={() => setSelectedSurvey(survey)}
          >
            {survey.survey_name}
          </div>
          {index !== surveys.length - 1 ? (
            <div style={{ padding: '0 16px' }}>
              <Divider style={{ margin: '0' }} />
            </div>
          ) : null}
        </div>
      ))}
    </Space>
  );
}
