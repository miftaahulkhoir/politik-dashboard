import DataTable from "react-data-table-component";

export default function CustomDataTable(props) {
  return (
    <DataTable
      theme="dark"
      highlightOnHover
      customStyles={{
        rows: {
          style: {
            padding: "8px 0",
            fontSize: "14px",
            backgroundColor: "#222222",
          },
        },
        headCells: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            color: "#000000",
            backgroundColor: "#FFFFFF",
          },
        },
        pagination: {
          style: {
            backgroundColor: "#222222",
          },
        },
        noData: {
          style: {
            backgroundColor: "#222222",
          },
        },
      }}
      {...props}
    />
  );
}
