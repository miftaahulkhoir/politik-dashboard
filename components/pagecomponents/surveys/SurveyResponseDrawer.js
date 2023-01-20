import { Drawer } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import SurveyResponseDrawer2 from './SurveyResponseDrawer2';

export default function SurveyResponseDrawer({
  open,
  setOpen,
  selectedSurvey,
}) {
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState({});

  const [isDrawer2Open, setIsDrawer2Open] = useState(false);

  useEffect(() => {
    if (!selectedSurvey?.id) return;
    axios
      .get('/api/response', {
        params: {
          surveyid: selectedSurvey.id,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setResponses([...res.data.data]);
      })
      .catch((err) => {});
  }, [selectedSurvey?.id]);

  const columns = [
    {
      name: 'Nama',
      selector: (row) => row.respondent_id,
    },
  ];

  const onRowClicked = (row, e) => {
    console.log('selected response', row);
    setSelectedResponse(row);
    setIsDrawer2Open(true);
  };

  return (
    <Drawer
      title={selectedSurvey?.survey_name}
      placement="right"
      closable={false}
      width="50%"
      open={open}
      onClose={() => setOpen(false)}
    >
      <SurveyResponseDrawer2
        open={isDrawer2Open}
        setOpen={setIsDrawer2Open}
        selectedResponse={selectedResponse}
      />
      <DataTable
        highlightOnHover
        noTableHead
        dense
        striped
        pointerOnHover
        columns={columns}
        data={responses}
        onRowClicked={onRowClicked}
        customStyles={{
          rows: {
            style: {
              padding: '8px 0',
              fontSize: '14px',
            },
          },
        }}
      />
    </Drawer>
  );
}
