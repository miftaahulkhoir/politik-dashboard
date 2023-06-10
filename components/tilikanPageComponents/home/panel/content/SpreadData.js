import { Card } from "antd";
import DataTable from "react-data-table-component";

function SpreadData({ data }) {
  const columns = [
    {
      name: "Nama",
      selector: (row) => row.name,
      width: "130px",
    },
    {
      name: "Total",
      selector: (row) => row.total,
      right: true,
      width: "70px",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
      <Card
        style={{ background: "#151922" }}
        bodyStyle={{ overflow: "scroll", maxHeight: "calc(100vh - 200px)" }}
        title={<span className="text-white">Data Persebaran</span>}
        size="small"
      >
        <Table columns={columns} data={data}></Table>
      </Card>
    </div>
  );
}

export default SpreadData;

function Table({ columns, data }) {
  return (
    <DataTable
      style={{ padding: "0" }}
      noTableHead
      dense
      striped
      columns={columns}
      data={data}
      customStyles={{
        rows: {
          style: {
            color: "white",
            backgroundColor: "#151922",
            padding: "0",
            fontSize: "14px",
          },
          stripedStyle: {
            color: "white",
            backgroundColor: "#222222",
          },
        },
        cells: {
          style: {
            padding: "4px",
          },
        },
      }}
    />
  );
}
