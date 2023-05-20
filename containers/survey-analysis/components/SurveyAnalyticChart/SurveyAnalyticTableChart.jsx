import DataTable from "react-data-table-component";

import SurveyAnalyticChartCard from "./SurveyAnalyticChartCard";

export default function SurveyAnalyticTableChart({ title, options }) {
  const columns = [
    {
      name: "Opsi",
      selector: (row) => row.option_name,
    },
    {
      name: "Jumlah",
      selector: (row) => row.total_answer,
      width: "80px",
      right: true,
    },
  ];

  return (
    <SurveyAnalyticChartCard title={title} fitTitleHeight>
      <DataTable
        highlightOnHover
        noTableHead
        dense
        striped
        columns={columns}
        data={options}
        customStyles={{
          table: {
            style: {
              maxHeight: "350px",
              overflowY: "auto",
              overflowX: "hidden",
            },
          },
          rows: {
            style: {
              color: "white",
              backgroundColor: "#484848",
              padding: "8px 0",
              fontSize: "14px",
            },
            stripedStyle: {
              color: "white",
              backgroundColor: "#222222",
            },
          },
        }}
      />
    </SurveyAnalyticChartCard>
  );
}
