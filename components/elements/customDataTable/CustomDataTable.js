import DataTable from "react-data-table-component";

export default function CustomDataTable(props) {
  return (
    <DataTable
      pagination
      highlightOnHover
      customStyles={{
        rows: {
          style: {
            padding: "8px 0",
            fontSize: "14px",
          },
        },
        headCells: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            color: "#7287A5",
          },
        },
      }}
      {...props}
    />
  );
}
