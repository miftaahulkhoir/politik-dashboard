import DataTable from "react-data-table-component";

import SurveyChartCard from "./SurveyChartCard";

export default function SurveyTableChart({ title, options }) {
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
    <SurveyChartCard title={title} fitTitleHeight>
      <DataTable
        highlightOnHover
        noTableHead
        dense
        striped
        columns={columns}
        data={options}
        customStyles={{
          rows: {
            style: {
              padding: "8px 0",
              fontSize: "14px",
            },
          },
        }}
      />
    </SurveyChartCard>
  );
}
