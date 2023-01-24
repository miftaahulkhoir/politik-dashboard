import { Collapse, Drawer, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import styles from "./surveyResponse.module.css";
import SurveyResponseDrawer2 from "./SurveyResponseDrawer2";

export default function SurveyResponseDrawer({ open, setOpen, selectedSurvey }) {
  const [responsesByRecruiters, setResponsesByRecruiters] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState({});

  const [isDrawer2Open, setIsDrawer2Open] = useState(false);

  useEffect(() => {
    if (!selectedSurvey?.id) return;
    axios
      .get("/api/response", {
        params: {
          surveyid: selectedSurvey.id,
        },
      })
      .then((res) => {
        const responses = res.data.data;
        const result = groupResponsesByRecruiters(responses);
        setResponsesByRecruiters([...result]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedSurvey?.id]);

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.respondent || row.id,
    },
  ];

  const onRowClicked = (row, e) => {
    console.log("selected response", row);
    setSelectedResponse(row);
    setIsDrawer2Open(true);
  };

  return (
    <Drawer title={selectedSurvey?.survey_name} placement="right" closable={false} width="50%" open={open} onClose={() => setOpen(false)}>
      <SurveyResponseDrawer2 open={isDrawer2Open} setOpen={setIsDrawer2Open} selectedResponse={selectedResponse} />

      <Space direction="vertical" style={{ width: "100%" }}>
        {responsesByRecruiters.map((rbr) => (
          <Collapse key={rbr.recruiter_id}>
            <Collapse.Panel header={`${rbr.recruiter} (${rbr.responses.length} responden)`} className={styles.custom_ant}>
              <DataTable
                style={{ padding: "0" }}
                highlightOnHover
                noTableHead
                dense
                striped
                pointerOnHover
                columns={columns}
                data={rbr.responses}
                onRowClicked={onRowClicked}
                customStyles={{
                  rows: {
                    style: {
                      padding: "12px 0",
                      fontSize: "14px",
                    },
                  },
                }}
              />
            </Collapse.Panel>
          </Collapse>
        ))}
      </Space>
    </Drawer>
  );
}

function groupResponsesByRecruiters(arr) {
  const groupedArr = {};

  // Group objects by postal code
  arr.forEach((item) => {
    if (!groupedArr[item.recruiter_id]) {
      groupedArr[item.recruiter_id] = [];
    }
    groupedArr[item.recruiter_id].push(item);
  });

  const result = Object.values(groupedArr).map((resp) => {
    return {
      recruiter_id: resp[0].recruiter_id,
      recruiter: resp[0].recruiter,
      responses: resp,
    };
  });

  return result;
}
