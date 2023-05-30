import DataTable from "react-data-table-component";
import { useContext } from "react";
import SurveyQuestionChartCard from "./SurveyQuestionChartCard";
import { SurveyMapContext } from "../../SurveyMapContext";

const SurveyQuestionTableChart = () => {
  const { selectedSurveyQuestion, selectedPolygonProperty } = useContext(SurveyMapContext);
  const data = selectedSurveyQuestion?.data?.find(
    (item) => item.id === (selectedPolygonProperty.id || selectedPolygonProperty.id_prov),
  );

  const dataSource = selectedSurveyQuestion?.options.map((option, index) => ({
    name: option.option_name,
    count: data?.counts?.[index],
  }));

  const columns = [
    {
      name: "Opsi",
      selector: (row) => row.name,
    },
    {
      name: "Jumlah",
      selector: (row) => row.count,
      width: "80px",
      right: true,
    },
  ];

  return (
    <SurveyQuestionChartCard title={selectedSurveyQuestion?.question_name} fitTitleHeight>
      <DataTable
        highlightOnHover
        noTableHead
        dense
        striped
        columns={columns}
        data={dataSource}
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
    </SurveyQuestionChartCard>
  );
};

export default SurveyQuestionTableChart;
