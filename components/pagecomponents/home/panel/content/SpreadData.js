import { Card, Collapse, Space } from "antd";
import DataTable from "react-data-table-component";

function SpreadData() {
  const data1 = [
    {
      name: "Total koordinator",
      total: 999999,
    },
    {
      name: "Total relawan",
      total: 123,
    },
    {
      name: "Total kecamatan",
      total: 123,
    },
  ];

  const data2 = [
    {
      name: "Total pemilih",
      total: 123,
    },
    {
      name: "Total terjangkau",
      total: 123,
    },
    {
      name: "Daftar hitam",
      total: 123,
    },
  ];

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.name,
      width: "160px",
    },
    {
      name: "Total",
      selector: (row) => row.total,
      right: true,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "8px", minWidth: "320px" }}>
      <Card
        style={{ background: "white" }}
        bodyStyle={{ overflow: "scroll", maxHeight: "calc(100vh - 200px)" }}
        title="Data Persebaran"
        size="small"
      >
        <Space direction="vertical" size={12}>
          <Collapse defaultActiveKey={[1]}>
            <Collapse.Panel header="Data koordinator" key={1}>
              <Table columns={columns} data={data1}></Table>
            </Collapse.Panel>
          </Collapse>
          <Collapse defaultActiveKey={[1]}>
            <Collapse.Panel header="Data relawan" key={1}>
              <Table columns={columns} data={data2}></Table>
            </Collapse.Panel>
          </Collapse>
        </Space>
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
      // highlightOnHover
      // pointerOnHover
      columns={columns}
      data={data}
      customStyles={{
        rows: {
          style: {
            padding: "0px 0",
            fontSize: "14px",
          },
        },
      }}
    />
  );
}
