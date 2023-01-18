import { Select } from 'antd';
import { useMemo } from 'react';

function getLabel(survey) {
  const name = survey.survey_name;
  const createdAt = new Date(survey.created_at);
  const date = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(createdAt);

  // return `${name} · ${date}`;
  return `${name} (${date})`;
}

export default function SurveyDropdownSelector({
  surveys,
  setSelectedSurveyID,
}) {
  const options = useMemo(() =>
    surveys.map(
      (survey) => ({ value: survey.id, label: getLabel(survey) }),
      [surveys]
    )
  );

  return (
    <Select
      style={{ width: '100%' }}
      showSearch
      placeholder="Pilih survei"
      optionFilterProp="children"
      onChange={(value, option) => {
        setSelectedSurveyID(value);
      }}
      // onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={options}
    />
  );
}
